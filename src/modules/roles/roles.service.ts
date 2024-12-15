import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreateRoleDto, RoleDto, UpdateRoleDto } from "@shared/dto/role.dto";
import { RoleEntity } from "@shared/entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>
    ) {}

    async getAllRoles(): Promise<ApiResponse<RoleDto[]>> {
        try {
            const roles = await this.roleRepository.find();

            return new ApiResponse(true, 'Roles retrieved successfully', roles);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getRole(id: number): Promise<ApiResponse<RoleDto>> {
        try {
            const role = await this.roleRepository.findOneBy({ id });

            if (!role) {
                throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Role retrieved successfully', role);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createRole(createRoleDto: CreateRoleDto): Promise<ApiResponse<RoleEntity>> {
        try {
            const role = this.roleRepository.create(createRoleDto);

            const savedRole = await this.roleRepository.save(role);

            return new ApiResponse(true, 'Role created successfully', savedRole);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<ApiResponse<RoleDto>> {
        try {
            await this.roleRepository.update({ id }, updateRoleDto);

            const updatedRole = await this.getRole(id);

            return new ApiResponse(true, 'Role updated successfully', updatedRole.data);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteRole(id: number): Promise<ApiResponse<null>> {
        try {
            const deleteResult = await this.roleRepository.delete(id);

            if (deleteResult.affected === 0) {
                throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Role deleted successfully', null);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}