import { config } from 'dotenv';
config();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const BRAVE_API_KEY = process.env.BRAVE_API_KEY;

const TEST_TOPIC = "Lion's Mane Mushroom for Mental Clarity and Focus";
const MAX_ITERATIONS = 3; // Increased from 2
const TARGET_SCORE = 95; // Realistic target, not 98

const SOP_GUIDELINES = [
    "Mission: You write for Synervion (a Functional Mushroom Brand). Every post MUST relate to Mushrooms.",
    "Voice: Professional but grounded. Avoid cliches (Unlock, Game-changer, Delve).",
    "Truthfulness: NEVER invent 'lab results' or 'in our lab' stories.",
    "Format: Short paragraphs. Generous whitespace. NO MARKDOWN.",
    "Structure: Strong Hook -> Evidence -> Application -> Soft CTA.",
    "Human Connection: Use 'We believe...' for opinions only."
];

// === CALIBRATED PROMPTS (From Test #2 Learning) ===

const DRAFT_SYSTEM_PROMPT = `You are the Lead Content Strategist for Synervion. Draft a LinkedIn post about "${TEST_TOPIC}".

🚨 CRITICAL FORMATTING RULES:

1. NO MARKDOWN SYNTAX EVER
   - NO **bold**, NO *italic*, NO __underline__, NO bullet points (-)
   - NO [links](url) - use "Source (url.com)"
   - Plain text ONLY

2. CITATIONS FORMAT
   - "Source (short-url.com)" inline
   - NO separate "Sources" section
   - Prefer PMC or university sources

3. HASHTAGS MANDATORY
   - End with 3-5 hashtags (3, 4, or 5 all acceptable)
   - Format: #LionsMane #Focus #Wellness
   - On final line, space-separated

4. ULTRA-SPECIFIC EXAMPLES
   - Time (e.g. "7:15 AM")
   - Dosage (e.g. "500mg")  
   - Context (e.g. "before standup")
   - All three required!

5. BANNED ACADEMIC PHRASES
   - NO: promote, well-being, bioactive, enhance, stimulate, modulate, optimize, facilitate, cognitive function
   - YES: help, support, work, boost, improve, focus, clarity, memory

6. TONE: Conversational, like talking to a friend

GUIDELINES: ${SOP_GUIDELINES.map(r => `- ${r}`).join('\n')}

Output ONLY the post. NO explanations.`;

// === CALIBRATED CRITIQUE (Fixed from Test #2) ===

const CRITIQUE_SYSTEM_PROMPT = `You are a Social Media Editor. Critique using the 12-ITEM CHECKLIST with CALIBRATED scoring.

🎯 CALIBRATED PENALTIES (Lessons from Test #2):

AUTOMATIC FAILURES (-25 points):
- Markdown visible (**bold**, *italic*, [brackets] for links)
- Missing hashtags entirely (0 hashtags)

MAJOR VIOLATIONS (-15 points):
- Academic language in 3+ instances
- NO specific examples (missing all of time/dosage/context)
- URL shorteners (shorturl.at - suspicious)

MODERATE VIOLATIONS (-10 points):
- Academic language 1-2 instances
- Generic examples (have 1-2 of time/dosage/context, not all 3)
- Non-credible sources (blogs, no author)

MINOR VIOLATIONS (-5 points):
- Duplicate citation (same source twice)
- Vague claims without specifics
- Missing context in examples

SUBJECTIVE (-3 points max):
- Weak hook (if truly generic like "Ever feel tired?")
- Slightly awkward phrasing

✅ ACCEPTABLE (0 penalty):
- 3, 4, OR 5 hashtags (all valid in "3-5" range)
- University news sources (.edu domains are credible)
- Hook that mentions specific scenario (e.g. "7:15 AM standup")
- Single instance of academic term if surrounded by conversational text

✅ 12-ITEM CHECKLIST:
1. ✅/❌ Clean URL citations (plain "Source (url.com)")
2. ✅/❌ No separate "Sources" section
3. ✅/❌ Hashtags correctly formatted (#Word) 
4. ✅/❌ Paragraphs flexible (1-5 sentences)
5. ✅/❌ NO markdown visible
6. ✅/❌ Generous whitespace
7. ✅/❌ No citation markers [1][2][3]
8. ✅/❌ Conversational tone
9. ✅/❌ No unsourced claims
10. ✅/❌ Ultra-specific examples
11. ✅/❌ 3-5 hashtags present
12. ✅/❌ Hook grabs attention

OUTPUT FORMAT:
SCORE: X/100
LLM: [NAME]
ITERATION: [N]
REPORT:
[All 12 items with ✅/❌]
[Penalties and reasoning]

TARGET RANGE:
- 95-100: Excellent, ready to publish
- 85-94: Very good, minor polish
- 75-84: Good, needs refinement
- 65-74: Acceptable, significant fixes needed
- <65: Reject, major violations`;

const REFINE_SYSTEM_PROMPT = `You are a Senior Editor fixing issues from critique.

STRATEGY:
1. Keep what's good
2. Fix only what critique flagged
3. Make minimal changes

PRIORITY FIXES:
- Markdown → Remove ALL (**bold** → plain)
- Missing hashtags → Add 3-5 at end
- Academic language → Replace with conversational
- Vague examples → Add time/dosage/context
- URL shorteners → Use real URLs

Output the COMPLETE refined post.`;

// === LLM Callers (Same as Test #2) ===

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

    if (!response.ok) throw new Error(`Brave failed: ${response.status}`);
    const json = await response.json();
    return json.web?.results?.map((r: any) => `- ${r.title}: ${r.description}`).join('\n') || "No results.";
}

// === Workflow ===

async function generateDraft(llm: string, context: string, angle: string) {
    const prompt = DRAFT_SYSTEM_PROMPT + `\n\nAPPROACH: ${angle}`;

    if (llm === "Perplexity") {
        return await callPerplexity([
            { role: "system", content: prompt },
            { role: "user", content: `Topic: ${TEST_TOPIC}\n\nGenerate the post using your web search.` }
        ]);
    } else {
        return await callGemini([
            { role: "system", content: prompt },
            { role: "user", content: `Topic: ${TEST_TOPIC}\n\nContext:\n${context}\n\nGenerate the post.` }
        ]);
    }
}

async function critiqueDraft(draft: string, llmName: string, iteration: number) {
    const prompt = CRITIQUE_SYSTEM_PROMPT.replace('[NAME]', llmName).replace('[N]', iteration.toString());

    const critique = await callGemini([
        { role: "system", content: prompt },
        { role: "user", content: `Draft:\n${draft}` }
    ]);

    const scoreMatch = critique.match(/SCORE:\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

    return { score, report: critique };
}

async function refineDraft(draft: string, critique: string, llm: string, context: string) {
    if (llm === "Perplexity") {
        return await callPerplexity([
            { role: "system", content: REFINE_SYSTEM_PROMPT },
            { role: "user", content: `Draft:\n${draft}\n\nCritique:\n${critique}\n\nOutput refined post.` }
        ]);
    } else {
        return await callGemini([
            { role: "system", content: REFINE_SYSTEM_PROMPT },
            { role: "user", content: `Draft:\n${draft}\n\nCritique:\n${critique}\n\nContext:\n${context}\n\nOutput refined post.` }
        ]);
    }
}

async function iterateToQuality(llm: string, context: string, angle: string) {
    console.log(`  ${llm}: Starting...`);

    let draft = await generateDraft(llm, context, angle);
    let bestScore = 0;
    let bestDraft = draft;
    let bestReport = "";
    let scores: number[] = [];

    for (let i = 1; i <= MAX_ITERATIONS; i++) {
        console.log(`  ${llm}: Iteration ${i} - Critiquing...`);

        const { score, report } = await critiqueDraft(draft, llm, i);
        scores.push(score);
        console.log(`  ${llm}: Iteration ${i} - Score: ${score}/100`);

        if (score > bestScore) {
            bestScore = score;
            bestDraft = draft;
            bestReport = report;
        }

        if (score >= TARGET_SCORE) {
            console.log(`  ${llm}: ✓ Target ${TARGET_SCORE}+ achieved! (${score}/100)\n`);
            break;
        }

        if (i < MAX_ITERATIONS) {
            console.log(`  ${llm}: Iteration ${i} - Refining...`);
            draft = await refineDraft(draft, report, llm, context);
        }

        await new Promise(r => setTimeout(r, 2000));
    }

    console.log(`  ${llm}: Final best score: ${bestScore}/100\n`);

    return {
        draft: bestDraft,
        score: bestScore,
        report: bestReport,
        scores,
        iterations: scores.length
    };
}

// === Main ===

async function runFinalTest() {
    console.log("=".repeat(80));
    console.log("FINAL A/B TEST: Calibrated Critique + 3 Iterations");
    console.log("=".repeat(80));
    console.log(`Topic: "${TEST_TOPIC}"`);
    console.log(`Iterations: Up to ${MAX_ITERATIONS}`);
    console.log(`Target: ${TARGET_SCORE}/100\n`);

    console.log("[1/3] Research...");
    const context = await braveSearch(TEST_TOPIC);
    console.log(`✓ ${context.length} chars\n`);

    const angle = "Data-Driven Analyst";

    console.log("[2/3] Running tests...\n");

    const perplexity = await iterateToQuality("Perplexity", context, angle);
    const gemini = await iterateToQuality("Gemini", context, angle);

    console.log("[3/3] Results...\n");
    console.log("=".repeat(80));
    console.log("FINAL RESULTS");
    console.log("=".repeat(80));

    console.log(`\nPerplexity (web search):`);
    console.log(`  Score Progression: ${perplexity.scores.join(" → ")}`);
    console.log(`  Final: ${perplexity.score}/100`);
    console.log(`  Improvement: +${perplexity.score - perplexity.scores[0]}`);

    console.log(`\nGemini (Brave context):`);
    console.log(`  Score Progression: ${gemini.scores.join(" → ")}`);
    console.log(`  Final: ${gemini.score}/100`);
    console.log(`  Improvement: +${gemini.score - gemini.scores[0]}`);

    const diff = gemini.score - perplexity.score;
    console.log(`\nDifference: ${diff > 0 ? "+" : ""}${diff} points`);
    console.log(`Winner: ${gemini.score > perplexity.score ? "Gemini ✅" : "Perplexity ✅"}`);

    if (perplexity.score >= TARGET_SCORE || gemini.score >= TARGET_SCORE) {
        console.log(`\n🎉 TARGET ${TARGET_SCORE}+ ACHIEVED!`);
    }

    // Save
    const report = {
        topic: TEST_TOPIC,
        timestamp: new Date().toISOString(),
        targetScore: TARGET_SCORE,
        perplexity,
        gemini,
        winner: gemini.score > perplexity.score ? "Gemini" : "Perplexity"
    };

    const fs = await import('fs/promises');
    await fs.writeFile('test-results-final.json', JSON.stringify(report, null, 2));

    console.log(`\n✓ Saved to test-results-final.json\n`);

    // Print drafts
    console.log("=".repeat(80));
    console.log("FINAL DRAFTS");
    console.log("=".repeat(80));

    console.log(`\n--- PERPLEXITY (${perplexity.score}/100) ---`);
    console.log(perplexity.draft);
    console.log(`\n--- REPORT ---`);
    console.log(perplexity.report);

    console.log(`\n\n--- GEMINI (${gemini.score}/100) ---`);
    console.log(gemini.draft);
    console.log(`\n--- REPORT ---`);
    console.log(gemini.report);

    console.log("\n" + "=".repeat(80));
}

runFinalTest().catch(console.error);
