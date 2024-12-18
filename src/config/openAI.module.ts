import { Module } from "@nestjs/common";
import { OpenAIService } from "./openAI.service";

@Module({
    providers: [
        OpenAIService,
    ],
    exports: [
        OpenAIService,
    ],
})
export class OpenAIModule {}