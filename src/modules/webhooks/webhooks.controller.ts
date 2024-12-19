import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
    constructor(
        private readonly webhooksService: WebhooksService,
    ) {}

    @Post('yookassa')
    async handleYooKassaWebhook(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            await this.webhooksService.handleYooKassaWebhook(req.body);
            res.sendStatus(HttpStatus.OK);
        } catch (error) {
            console.error('Ошибка при обработке вебхука:', error.message);
            res.status(HttpStatus.BAD_REQUEST).send(error.message);
        }
    }
}
