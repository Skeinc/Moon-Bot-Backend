import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiResponse } from "@shared/dto/api.dto";
import { UserEntity } from "@shared/entities/user.entity";
import { CreateUserDto, UpdateUserDto } from "@shared/dto/user.dto";

@Controller('users')
export class UsersController {
    constructor (
        private readonly usersService: UsersService
    ) {}

    @Get()
    async getAllUsers(): Promise<ApiResponse<UserEntity[]>> {
        try {
            return await this.usersService.getAllUsers();
        } catch (error) {
            return new ApiResponse(false, 'Failed to retrieve users', null);
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<ApiResponse<UserEntity>> {
        try {
            return await this.usersService.getUser(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve user with ID ${id}`, null);
        }
    }

    @Get('/by-telegram-id/:telegramId')
    async getUserByTelegramId(@Param('telegramId') telegramId: number): Promise<ApiResponse<UserEntity>> {
        try {
            return await this.usersService.getUserByTelegramId(telegramId);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve user with Telegram ID ${telegramId}`, null);
        }
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<UserEntity>> {
        try {
            return await this.usersService.createUser(createUserDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to create user', null);
        }
    }

    @Put()
    async updateUser(
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<ApiResponse<UserEntity>> {
        try {
            if (!updateUserDto.id) {
                return new ApiResponse(false, 'User ID is required in the request body', null);
            }

            return await this.usersService.updateUser(updateUserDto.id, updateUserDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to update user', null);
        }
    }

    @Put('/by-telegram-id')
    async updateUserByTelegramId(
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<ApiResponse<UserEntity>> {
        try {
            if(!updateUserDto.telegramId) {
                return new ApiResponse(false, 'Telegram ID is required in the request body', null);
            }

            return await this.usersService.updateUserByTelegramId(updateUserDto.telegramId, updateUserDto);
        } catch (error) {
            return new ApiResponse(false, `Failed to update user with Telegram ID ${updateUserDto.telegramId}`, null);
        }
    }

    @Delete()
    async deleteUser(@Body('id') id: string): Promise<ApiResponse<null>> {
        try {
            if (!id) {
                return new ApiResponse(false, 'User ID is required in the request body', null);
            }

            return await this.usersService.deleteUser(id);
        } catch (error) {
            return new ApiResponse(false, 'Failed to delete user', null);
        }
    }
}