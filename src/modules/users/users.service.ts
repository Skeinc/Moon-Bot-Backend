import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreateUserDto, UpdateUserDto, UserDto } from "@shared/dto/user.dto";
import { RoleEntity } from "@shared/entities/role.entity";
import { UserEntity } from "@shared/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) {}

    async getAllUsers(): Promise<ApiResponse<UserDto[]>> {
        try {
            const users = await this.userRepository.find({
                relations: ['role', 'referrer'],
            });
    
            const mappedUsers = users.map(user => ({
                id: user.id,
                telegramId: user.telegramId,
                username: user.username,
                roleId: user.role?.id || null,
                requestsLeft: user.requestsLeft,
                subscriptionExpiry: user.subscriptionExpiry,
                referrerId: user.referrer?.id || null,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                lastLogin: user.lastLogin,
            }));

            return new ApiResponse(true, 'Users retrieved successfully', mappedUsers);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUser(id: string): Promise<ApiResponse<UserDto>> {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                relations: ['role', 'referrer'],
            });
    
            if (!user) {
                throw new HttpException('User  not found', HttpStatus.NOT_FOUND);
            }
    
            const mappedUser  = {
                id: user.id,
                telegramId: user.telegramId,
                username: user.username,
                roleId: user.role?.id || null,
                requestsLeft: user.requestsLeft,
                subscriptionExpiry: user.subscriptionExpiry,
                referrerId: user.referrer?.id || null,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                lastLogin: user.lastLogin,
            };

            return new ApiResponse(true, 'User retrieved successfully', mappedUser);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserByTelegramId(telegramId: number): Promise<ApiResponse<UserDto>> {
        try {
            const user = await this.userRepository.findOne({
                where: { telegramId },
                relations: ['role', 'referrer'],
            });
    
            if (!user) {
                throw new HttpException('User  not found', HttpStatus.NOT_FOUND);
            }
    
            const mappedUser  = {
                id: user.id,
                telegramId: user.telegramId,
                username: user.username,
                roleId: user.role?.id || null,
                requestsLeft: user.requestsLeft,
                subscriptionExpiry: user.subscriptionExpiry,
                referrerId: user.referrer?.id || null,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                lastLogin: user.lastLogin,
            };

            return new ApiResponse(true, 'User retrieved successfully', mappedUser);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createUser(createUserDto: CreateUserDto): Promise<ApiResponse<UserEntity>> {
        try {
            const role = await this.roleRepository.findOneBy({ id: 2 });

            if (!role) {
                throw new HttpException('Default role not found', HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const user = this.userRepository.create({
                ...createUserDto,
                role,
            });

            const savedUser = await this.userRepository.save(user);

            return new ApiResponse(true, 'User created successfully', savedUser);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<ApiResponse<UserDto>> {
        try {
            await this.userRepository.update({ id }, updateUserDto);

            const updatedUser = await this.getUser(id);

            return new ApiResponse(true, 'User updated successfully', updatedUser.data);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUserByTelegramId(telegramId: number, updateUserDto: UpdateUserDto): Promise<ApiResponse<UserDto>> {
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
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}