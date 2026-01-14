import { config } from 'dotenv';
config();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;

const TEST_TOPIC = "Lion's Mane Mushroom for Mental Clarity and Focus";

const SOP_GUIDELINES = [
    "Mission: You write for Synervion (a Functional Mushroom Brand). Every post MUST relate to Mushrooms, Mycelium, or Natural Wellness.",
    "Voice: Professional but grounded. Avoid 'LinkedIn Cliches' (e.g. 'Unlock', 'Game-changer', 'Delve').",
    "Truthfulness: NEVER invent 'lab results', 'experiments', or 'in our lab' stories. If you don't have specific data, speak to general industry knowledge.",
    "Format: Short paragraphs (1-2 sentences). Generous whitespace. Bullet points for dense info. NO MARKDOWN (**bold** is okay, but no # Headers).",
    "Structure: Strong Hook -> Evidence/Science -> Application -> Soft CTA.",
    "Visuals: Images must be realistic, high-contrast, professional. No abstract AI art.",
    "Human Connection: Use 'We believe...' for opinions only. Do not imply you are standing in a lab unless you are."
];

// === LLM Callers ===

async function callPerplexity(messages: any[], useWebSearch = true) {
    const model = useWebSearch ? "sonar-pro" : "sonar-pro"; // sonar-pro always has web access
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
        },
        body: JSON.stringify({
            model,
            messages,
            // Enable web search capability
            return_citations: true,
            return_related_questions: false
        })
    });

    if (!response.ok) {
        throw new Error(`Perplexity API failed: ${response.status}`);
    }

    const json = await response.json();
    return json.choices[0].message.content;
}

async function callGemini(messages: any[]) {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

    const systemMessage = messages.find(m => m.role === 'system');
    const userMessages = messages.filter(m => m.role === 'user');

    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
        },
        systemInstruction: systemMessage ? {
            role: 'user',
            parts: [{ text: systemMessage.content }]
        } : undefined
    });

    const contents = userMessages.map(m => m.content).join('\n\n');
    const result = await model.generateContent(contents);
    return result.response.text();
}

async function braveSearch(query: string) {
    const url = new URL('https://api.search.brave.com/res/v1/web/search');
    url.searchParams.append('q', query);
    url.searchParams.append('count', '5');

    const response = await fetch(url.toString(), {
        headers: {
            'Accept': 'application/json',
            'X-Subscription-Token': BRAVE_API_KEY!
        }
    });

    if (!response.ok) throw new Error(`Brave Search failed: ${response.status}`);
    const json = await response.json();
    return json.web?.results?.map((r: any) => `- ${r.title}: ${r.description}`).join('\n') || "No results.";
}

// === Draft Generation ===

async function generatePerplexityDraft(angle: string) {
    const rulesText = SOP_GUIDELINES.map(r => `- ${r}`).join('\n');

    return await callPerplexity([
        {
            role: "system",
            content: `You are the Lead Content Strategist for Synervion. Draft a LinkedIn post about "${TEST_TOPIC}".

APPROACH: ${angle}

CRITICAL RULES:
1. Do NOT use markdown syntax like **bold** or [links](url). Use plain text only.
2. For citations, use format: "Source (url.com)" NOT [Source](url)
3. NO academic phrases: "promote", "well-being", "bioactive compounds", "enhance", "stimulate"
4. Ultra-specific examples with TIME + DOSAGE + CONTEXT (e.g. "500mg at 7:15 AM before standup")
5. Conversational tone - write like talking to a friend, not a thesis

Use your web search to find REAL recent research and cite specific studies.

GUIDELINES:
${rulesText}

Output ONLY the final post text. NO meta-commentary.`
        },
        {
            role: "user",
            content: `Topic: ${TEST_TOPIC}\n\nGenerate a LinkedIn post using your web search for current research.`
        }
    ], true);
}

async function generateGeminiDraft(angle: string, context: string) {
    const rulesText = SOP_GUIDELINES.map(r => `- ${r}`).join('\n');

    return await callGemini([
        {
            role: "system",
            content: `You are the Lead Content Strategist for Synervion. Draft a LinkedIn post about "${TEST_TOPIC}".

APPROACH: ${angle}

CRITICAL RULES:
1. Do NOT use markdown syntax like **bold** or [links](url). Use plain text only.
2. For citations, use format: "Source (url.com)" NOT [Source](url)
3. NO academic phrases: "promote", "well-being", "bioactive compounds", "enhance", "stimulate"  
4. Ultra-specific examples with TIME + DOSAGE + CONTEXT (e.g. "500mg at 7:15 AM before standup")
5. Conversational tone - write like talking to a friend, not a thesis

GUIDELINES:
${rulesText}

Output ONLY the final post text. NO meta-commentary.`
        },
        {
            role: "user",
            content: `Topic: ${TEST_TOPIC}\n\nContext:\n${context}\n\nGenerate a LinkedIn post.`
        }
    ]);
}

// === Critique ===

async function critiquePost(draft: string, llmName: string) {
    const rulesText = SOP_GUIDELINES.map(r => `- ${r}`).join('\n');

    const critique = await callGemini([
        {
            role: "system",
            content: `You are a Harsh Social Media Editor. Critique this LinkedIn draft using the 12-ITEM CHECKLIST below.

CHECKLIST (ALL 12 MUST BE EVALUATED):
1. ✅/❌ Clean URL citations (plain "Source (url.com)" format, NO [brackets])
2. ✅/❌ No separate "Sources" section 
3. ✅/❌ Hashtags correctly formatted (#Word)
4. ✅/❌ Paragraphs flexible (1-5 sentences)
5. ✅/❌ NO markdown visible (**bold**, [links], # headers)
6. ✅/❌ Generous whitespace between paragraphs
7. ✅/❌ No citation markers [1][2][3]
8. ✅/❌ Conversational tone (no academic language)
9. ✅/❌ No unsourced claims
10. ✅/❌ Ultra-specific examples (time + dosage + context)
11. ✅/❌ 3-5 hashtags present at end
12. ✅/❌ Hook grabs attention

OUTPUT FORMAT:
Line 1: SCORE: X/100
Line 2: LLM: ${llmName}
Line 3+: REPORT:
[List ALL 12 items with ✅ or ❌ and brief explanation for failures]

Deduct points as follows:
- Markdown visible: -15 points
- Wrong citation format: -10 points
- Academic language: -10 points
- Generic examples: -10 points
- Missing hashtags: -5 points
- Weak hook: -5 points

GUIDELINES:
${rulesText}`
        },
        {
            role: "user",
            content: `Draft:\n${draft}`
        }
    ]);

    const scoreMatch = critique.match(/SCORE:\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

    return { score, report: critique };
}

// === Main Test ===

async function runTest() {
    console.log("=".repeat(80));
    console.log("A/B TEST: Perplexity (with web search) vs Gemini (with context)");
    console.log("=".repeat(80));
    console.log(`\nTopic: "${TEST_TOPIC}"\n`);

    // Get research context for Gemini
    console.log("[1/4] Getting research context via Brave Search...");
    const braveContext = await braveSearch(TEST_TOPIC);
    console.log(`✓ Context length: ${braveContext.length} chars\n`);

    // Generate 3 drafts from each LLM
    const angles = [
        "Data-Driven Analyst (Focus on stats, biochemistry, and papers)",
        "Master Storyteller (Focus on narrative, suspense, and human element)",
        "Contrarian/Myth-Buster (Focus on challenging common assumptions)"
    ];

    const results: any[] = [];

    console.log("[2/4] Generating drafts...\n");

    for (let i = 0; i < 3; i++) {
        console.log(`  Draft ${i + 1}/6 - Perplexity (${angles[i]})...`);
        const perplexityDraft = await generatePerplexityDraft(angles[i]);
        results.push({
            llm: "Perplexity",
            angle: angles[i],
            draft: perplexityDraft
        });
        console.log(`  ✓ ${perplexityDraft.length} chars\n`);

        // Small delay to avoid rate limits
        await new Promise(r => setTimeout(r, 2000));
    }

    for (let i = 0; i < 3; i++) {
        console.log(`  Draft ${i + 4}/6 - Gemini (${angles[i]})...`);
        const geminiDraft = await generateGeminiDraft(angles[i], braveContext);
        results.push({
            llm: "Gemini",
            angle: angles[i],
            draft: geminiDraft
        });
        console.log(`  ✓ ${geminiDraft.length} chars\n`);

        await new Promise(r => setTimeout(r, 2000));
    }

    // Critique all 6 drafts
    console.log("[3/4] Critiquing all drafts with QA checklist...\n");

    for (let i = 0; i < results.length; i++) {
        console.log(`  Critiquing ${results[i].llm} draft ${(i % 3) + 1}...`);
        const { score, report } = await critiquePost(results[i].draft, results[i].llm);
        results[i].score = score;
        results[i].report = report;
        console.log(`  ✓ Score: ${score}/100\n`);

        await new Promise(r => setTimeout(r, 2000));
    }

    // Calculate averages
    console.log("[4/4] Calculating results...\n");

    const perplexityScores = results.filter(r => r.llm === "Perplexity").map(r => r.score);
    const geminiScores = results.filter(r => r.llm === "Gemini").map(r => r.score);

    const avgPerplexity = perplexityScores.reduce((a, b) => a + b, 0) / perplexityScores.length;
    const avgGemini = geminiScores.reduce((a, b) => a + b, 0) / geminiScores.length;

    // Print results
    console.log("=".repeat(80));
    console.log("RESULTS");
    console.log("=".repeat(80));
    console.log(`\nPerplexity (with web search):`);
    console.log(`  Scores: ${perplexityScores.join(", ")}`);
    console.log(`  Average: ${avgPerplexity.toFixed(1)}/100`);

    console.log(`\nGemini (with Brave context):`);
    console.log(`  Scores: ${geminiScores.join(", ")}`);
    console.log(`  Average: ${avgGemini.toFixed(1)}/100`);

    console.log(`\nDifference: ${(avgGemini - avgPerplexity > 0 ? "+" : "")}${(avgGemini - avgPerplexity).toFixed(1)} points`);
    console.log(`Winner: ${avgGemini > avgPerplexity ? "Gemini ✅" : "Perplexity ✅"}`);

    // Save detailed report
    const report = {
        topic: TEST_TOPIC,
        timestamp: new Date().toISOString(),
        results,
        summary: {
            perplexity: {
                scores: perplexityScores,
                average: avgPerplexity
            },
            gemini: {
                scores: geminiScores,
                average: avgGemini
            },
            winner: avgGemini > avgPerplexity ? "Gemini" : "Perplexity",
            difference: avgGemini - avgPerplexity
        }
    };

    const fs = await import('fs/promises');
    await fs.writeFile(
        'test-results.json',
        JSON.stringify(report, null, 2)
    );

    console.log(`\n✓ Detailed report saved to test-results.json\n`);

    // Print sample drafts
    console.log("=".repeat(80));
    console.log("SAMPLE DRAFT COMPARISON (Analyst Angle)");
    console.log("=".repeat(80));

    const perplexitySample = results.find(r => r.llm === "Perplexity" && r.angle.includes("Analyst"));
    const geminiSample = results.find(r => r.llm === "Gemini" && r.angle.includes("Analyst"));

    console.log(`\n--- PERPLEXITY (Score: ${perplexitySample.score}/100) ---`);
    console.log(perplexitySample.draft);
    console.log(`\n--- QA REPORT ---`);
    console.log(perplexitySample.report);

    console.log(`\n\n--- GEMINI (Score: ${geminiSample.score}/100) ---`);
    console.log(geminiSample.draft);
    console.log(`\n--- QA REPORT ---`);
    console.log(geminiSample.report);

    console.log("\n" + "=".repeat(80));
}

// Run
runTest().catch(console.error);
