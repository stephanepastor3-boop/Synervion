import { config } from 'dotenv';
config();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;

const TEST_TOPIC = "Lion's Mane Mushroom for Mental Clarity and Focus";
const MAX_ITERATIONS = 2; // Iterate until 98+ or max 2 refinements

const SOP_GUIDELINES = [
    "Mission: You write for Synervion (a Functional Mushroom Brand). Every post MUST relate to Mushrooms, Mycelium, or Natural Wellness.",
    "Voice: Professional but grounded. Avoid 'LinkedIn Cliches' (e.g. 'Unlock', 'Game-changer', 'Delve').",
    "Truthfulness: NEVER invent 'lab results', 'experiments', or 'in our lab' stories.",
    "Format: Short paragraphs (1-2 sentences). Generous whitespace. NO MARKDOWN.",
    "Structure: Strong Hook -> Evidence/Science -> Application -> Soft CTA.",
    "Human Connection: Use 'We believe...' for opinions only."
];

// === IMPROVED PROMPTS ===

const DRAFT_SYSTEM_PROMPT = `You are the Lead Content Strategist for Synervion. Draft a LinkedIn post about "${TEST_TOPIC}".

🚨 CRITICAL FORMATTING RULES (FAILURE = AUTOMATIC REJECTION):

1. ABSOLUTELY NO MARKDOWN SYNTAX
   - NO **bold**, NO *italic*, NO __underline__
   - NO [links](url) - use plain "Source (url.com)" format
   - NO # headers, NO > quotes, NO \`code\`
   - Plain text ONLY

2. CITATIONS MUST BE CLEAN
   - Format: "Source (short-url.com)" 
   - NOT: [Source](url) or (Source)[url]
   - Inline only, NO separate "Sources" section

3. HASHTAGS ARE MANDATORY
   - MUST end post with exactly 3-5 hashtags
   - Format: #LionsMane #Focus #Wellness
   - On final line, separated by spaces
   - FAILURE TO INCLUDE = REJECT

4. ULTRA-SPECIFIC EXAMPLES REQUIRED
   - MUST include ALL THREE:
     (1) Exact time (e.g. "7:15 AM")
     (2) Exact dosage (e.g. "500mg")  
     (3) Specific context (e.g. "before standup meeting")
   - Generic examples = FAIL

5. BANNED ACADEMIC PHRASES
   - NO: promote, well-being, bioactive compounds, enhance, stimulate
   - NO: increase resistance, modulate, optimize, facilitate
   - USE: help, support, work, boost, improve (conversational alternatives)

6. CONVERSATIONAL TONE REQUIRED
   - Write like talking to a friend, NOT a thesis
   - Use "you", "your", ask questions
   - Short sentences, simple words

GUIDELINES:
${SOP_GUIDELINES.map(r => `- ${r}`).join('\n')}

Output ONLY the final post text. NO meta-commentary, NO explanations.`;

const CRITIQUE_SYSTEM_PROMPT = `You are a HARSH Social Media Editor. Critique this LinkedIn draft using the 12-ITEM CHECKLIST.

🔴 STRICT GRADING (Deduct points immediately):

AUTOMATIC FAILURES (-25 points each):
- Markdown visible (ANY **bold**, *italic*, [links])
- Missing hashtags (MUST have 3-5)
- Wrong citation format (brackets, no URL)

MAJOR VIOLATIONS (-15 points each):
- Academic language (promote, well-being, enhance, etc.)
- Generic examples (missing time OR dosage OR context)
- Vague claims ("Some studies suggest..." without specifics)

MINOR VIOLATIONS (-5 points each):
- Weak hook (generic question)
- Missing whitespace
- Too many hashtags (>5)

✅ 12-ITEM CHECKLIST (EVALUATE ALL):
1. ✅/❌ Clean URL citations (plain "Source (url.com)", NO [brackets])
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

OUTPUT FORMAT (MANDATORY):
Line 1: SCORE: X/100
Line 2: LLM: [LLM_NAME]
Line 3: ITERATION: [N]
Line 4+: REPORT:
[List ALL 12 items with ✅ or ❌]
[For each ❌, explain violation and point deduction]

GUIDELINES:
${SOP_GUIDELINES.map(r => `- ${r}`).join('\n')}`;

const REFINE_SYSTEM_PROMPT = `You are a Senior Editor. Your job is to FIX ALL issues from the critique WITHOUT breaking what works.

🎯 REFINEMENT STRATEGY:

1. ANALYZE the critique
   - What's GOOD? (preserve this)
   - What's BAD? (fix this)

2. FIX FORMATTING VIOLATIONS FIRST
   - Remove ALL markdown (**bold** → plain text)
   - Fix citations ([Source](url) → Source (url.com))
   - Add hashtags if missing (3-5 at end)

3. FIX CONTENT VIOLATIONS
   - Replace academic phrases with conversational
   - Make examples ultra-specific (add time/dosage/context)
   - Add sources for vague claims

4. STRENGTHEN WEAKNESSES
   - Weak hook? Write new attention-grabbing opener
   - Generic examples? Add exact details

OUTPUT: The COMPLETE refined post (not just changes).

CRITICAL:
- Keep ALL good content from original
- Fix ONLY what critique flagged
- Maintain conversational tone
- NO markdown in output`;

// === LLM Callers ===

async function callPerplexity(messages: any[]) {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
        },
        body: JSON.stringify({
            model: "sonar-pro",
            messages,
            return_citations: true
        })
    });

    if (!response.ok) throw new Error(`Perplexity failed: ${response.status}`);
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

// === Workflow Functions ===

async function generateDraft(llm: string, context: string, angle: string) {
    const prompt = DRAFT_SYSTEM_PROMPT.replace('APPROACH: ', `APPROACH: ${angle}\n`);

    if (llm === "Perplexity") {
        return await callPerplexity([
            { role: "system", content: prompt },
            { role: "user", content: `Topic: ${TEST_TOPIC}\n\nUse your web search for current research.\n\nGenerate the post.` }
        ]);
    } else {
        return await callGemini([
            { role: "system", content: prompt },
            { role: "user", content: `Topic: ${TEST_TOPIC}\n\nContext:\n${context}\n\nGenerate the post.` }
        ]);
    }
}

async function critiqueDraft(draft: string, llmName: string, iteration: number) {
    const prompt = CRITIQUE_SYSTEM_PROMPT.replace('[LLM_NAME]', llmName).replace('[N]', iteration.toString());

    const critique = await callGemini([
        { role: "system", content: prompt },
        { role: "user", content: `Draft:\n${draft}` }
    ]);

    const scoreMatch = critique.match(/SCORE:\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

    return { score, report: critique };
}

async function refineDraft(draft: string, critique: string, llm: string, context: string) {
    const prompt = REFINE_SYSTEM_PROMPT;

    if (llm === "Perplexity") {
        return await callPerplexity([
            { role: "system", content: prompt },
            { role: "user", content: `Original Draft:\n${draft}\n\nCritique:\n${critique}\n\nOutput the COMPLETE refined post.` }
        ]);
    } else {
        return await callGemini([
            { role: "system", content: prompt },
            { role: "user", content: `Original Draft:\n${draft}\n\nCritique:\n${critique}\n\nContext (for adding sources):\n${context}\n\nOutput the COMPLETE refined post.` }
        ]);
    }
}

async function iterateToQuality(llm: string, context: string, angle: string) {
    console.log(`\n  Starting ${llm} iteration (${angle})...`);

    let draft = await generateDraft(llm, context, angle);
    let iteration = 0;
    let bestScore = 0;
    let bestDraft = draft;
    let bestReport = "";

    while (iteration < MAX_ITERATIONS) {
        iteration++;
        console.log(`    Iteration ${iteration}: Critiquing...`);

        const { score, report } = await critiqueDraft(draft, llm, iteration);
        console.log(`    Iteration ${iteration}: Score ${score}/100`);

        if (score > bestScore) {
            bestScore = score;
            bestDraft = draft;
            bestReport = report;
        }

        if (score >= 98) {
            console.log(`    ✓ Target achieved (${score}/100)!\n`);
            break;
        }

        if (iteration < MAX_ITERATIONS) {
            console.log(`    Iteration ${iteration}: Refining...`);
            draft = await refineDraft(draft, report, llm, context);
        }

        await new Promise(r => setTimeout(r, 2000));
    }

    console.log(`  Final: Best score ${bestScore}/100 after ${iteration} iterations\n`);

    return {
        draft: bestDraft,
        score: bestScore,
        report: bestReport,
        iterations: iteration
    };
}

// === Main Test ===

async function runImprovedTest() {
    console.log("=".repeat(80));
    console.log("IMPROVED A/B TEST: With Iteration + Better Prompts");
    console.log("=".repeat(80));
    console.log(`\nTopic: "${TEST_TOPIC}"`);
    console.log(`Max Iterations: ${MAX_ITERATIONS} per draft`);
    console.log(`Target Score: 98/100\n`);

    console.log("[1/3] Getting research context...");
    const braveContext = await braveSearch(TEST_TOPIC);
    console.log(`✓ Context: ${braveContext.length} chars\n`);

    const angle = "Data-Driven Analyst (Focus on stats, biochemistry, and papers)";

    console.log("[2/3] Running LLM iterations...\n");

    const perplexityResult = await iterateToQuality("Perplexity", braveContext, angle);
    const geminiResult = await iterateToQuality("Gemini", braveContext, angle);

    console.log("[3/3] Final Comparison...\n");
    console.log("=".repeat(80));
    console.log("RESULTS");
    console.log("=".repeat(80));

    console.log(`\nPerplexity (with web search):`);
    console.log(`  Final Score: ${perplexityResult.score}/100`);
    console.log(`  Iterations: ${perplexityResult.iterations}`);

    console.log(`\nGemini (with Brave context):`);
    console.log(`  Final Score: ${geminiResult.score}/100`);
    console.log(`  Iterations: ${geminiResult.iterations}`);

    const diff = geminiResult.score - perplexityResult.score;
    console.log(`\nDifference: ${diff > 0 ? "+" : ""}${diff} points`);
    console.log(`Winner: ${geminiResult.score > perplexityResult.score ? "Gemini ✅" : "Perplexity ✅"}`);

    // Save results
    const report = {
        topic: TEST_TOPIC,
        timestamp: new Date().toISOString(),
        maxIterations: MAX_ITERATIONS,
        perplexity: perplexityResult,
        gemini: geminiResult,
        winner: geminiResult.score > perplexityResult.score ? "Gemini" : "Perplexity",
        difference: diff
    };

    const fs = await import('fs/promises');
    await fs.writeFile('test-results-improved.json', JSON.stringify(report, null, 2));

    console.log(`\n✓ Detailed report saved to test-results-improved.json\n`);

    // Print drafts
    console.log("=".repeat(80));
    console.log("FINAL DRAFTS");
    console.log("=".repeat(80));

    console.log(`\n--- PERPLEXITY (${perplexityResult.score}/100 after ${perplexityResult.iterations} iterations) ---`);
    console.log(perplexityResult.draft);
    console.log(`\n--- QA REPORT ---`);
    console.log(perplexityResult.report);

    console.log(`\n\n--- GEMINI (${geminiResult.score}/100 after ${geminiResult.iterations} iterations) ---`);
    console.log(geminiResult.draft);
    console.log(`\n--- QA REPORT ---`);
    console.log(geminiResult.report);

    console.log("\n" + "=".repeat(80));
}

runImprovedTest().catch(console.error);
