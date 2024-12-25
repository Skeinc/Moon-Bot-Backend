import axios from "axios";

export async function notifyUser(telegramId: number, message: string): Promise<void> {
    try {
        const botToken = process.env.BOT_TOKEN;
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        await axios.post(url, {
            chat_id: telegramId,
            text: message,
        });
    } catch (error) {
        console.error(`Ошибка при отправке уведомления: ${(error as Error).message}`);
    }
}