import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function callGemini(
    messages: Array<{ role: string; content: string }>,
    options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',  // Stable version has higher quota than -exp
        generationConfig: {
            temperature: options?.temperature ?? 0.7,
            maxOutputTokens: options?.maxTokens ?? 2048,
        }
    });

    // Convert messages to Gemini format
    // Gemini doesn't have explicit "system" role - combine system + user prompts
    const systemPrompt = messages.find(m => m.role === 'system')?.content || '';
    const userPrompt = messages.find(m => m.role === 'user')?.content || '';

    const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${userPrompt}` : userPrompt;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error('[Gemini] Error:', error.message);
        throw new Error(`Gemini API call failed: ${error.message}`);
    }
}
