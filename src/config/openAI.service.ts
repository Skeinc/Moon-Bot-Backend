import { getEnvironmentConfig } from "@environments/environment.config";
import OpenAI from "openai";

export class OpenAIService {
    private openai = new OpenAI({
        apiKey: getEnvironmentConfig().OPENAI_API_KEY,
    });

    async getTarotReading(question: string, cards: string[]): Promise<string> {
        const prompt = `Пользователь задал вопрос: "${question}". Выбрал карты: ${cards.join(', ')}. Сделай расклад и расшифруй его. Ограничение: 350 символов.`;

        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: prompt }],
                max_tokens: 350,
                temperature: 0.5,
            });

            return response.choices[0]?.message?.content?.trim() || 'Ответ не получен.';
        } catch (error) {
            throw new Error("Ошибка при обращении к OpenAI API.");
        }
    }
}