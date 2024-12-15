import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreateUserDto, UpdateUserDto } from "@shared/dto/user.dto";
import { UserEntity } from "@shared/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getAllUsers(): Promise<ApiResponse<UserEntity[]>> {
        try {
            const users = await this.userRepository.find();

            return new ApiResponse(true, 'Users retrieved successfully', users);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUser(id: string): Promise<ApiResponse<UserEntity>> {
        try {
            const user = await this.userRepository.findOneBy({ id });

            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'User retrieved successfully', user);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserByTelegramId(telegramId: number): Promise<ApiResponse<UserEntity>> {
        try {
            const user = await this.userRepository.findOneBy({ telegramId });

            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'User retrieved successfully', user);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createUser(createUserDto: CreateUserDto): Promise<ApiResponse<UserEntity>> {
        try {
            const user = this.userRepository.create(createUserDto);

            const savedUser = await this.userRepository.save(user);

            return new ApiResponse(true, 'User created successfully', savedUser);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<ApiResponse<UserEntity>> {
        try {
            await this.userRepository.update({ id }, updateUserDto);

            const updatedUser = await this.getUser(id);

            return new ApiResponse(true, 'User updated successfully', updatedUser.data);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUserByTelegramId(telegramId: number, updateUserDto: UpdateUserDto): Promise<ApiResponse<UserEntity>> {
        try {
            await this.userRepository.update({ telegramId }, updateUserDto);

            const updatedUser = await this.getUserByTelegramId(telegramId);

            return new ApiResponse(true, 'User updated successfully', updatedUser.data);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUser(id: string): Promise<ApiResponse<null>> {
        try {
            const deleteResult = await this.userRepository.delete(id);

            if (deleteResult.affected === 0) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'User deleted successfully', null);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}