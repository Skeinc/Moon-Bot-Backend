import { getEnvironmentConfig } from "@environments/environment.config";

export function generateReferralLink(userId: string): string {
    return `https://t.me/${getEnvironmentConfig().BOT_USERNAME}?start=${userId}`;
}