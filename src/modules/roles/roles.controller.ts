import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { ApiResponse } from "@shared/dto/api.dto";
import { RoleEntity } from "@shared/entities/role.entity";
import { CreateRoleDto, UpdateRoleDto } from "@shared/dto/role.dto";

@Controller('roles')
export class RolesController {
    constructor (
        private readonly rolesService: RolesService
    ) {}

    @Get()
    async getAllRoles(): Promise<ApiResponse<RoleEntity[]>> {
        try {
            return await this.rolesService.getAllRoles();
        } catch (error) {
            return new ApiResponse(false, 'Failed to retrieve roles', null);
        }
    }

    @Get(':id')
    async getRole(@Param('id') id: number): Promise<ApiResponse<RoleEntity>> {
        try {
            return await this.rolesService.getRole(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve role with ID ${id}`, null);
        }
    }

    @Post()
    async createRole(@Body() createRoleDto: CreateRoleDto): Promise<ApiResponse<RoleEntity>> {
        try {
            return await this.rolesService.createRole(createRoleDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to create role', null);
        }
    }

    @Put()
    async updateRole(@Body() updateRoleDto: UpdateRoleDto): Promise<ApiResponse<RoleEntity>> {
        try {
            if (!updateRoleDto.id) {
                return new ApiResponse(false, 'Role ID is required in the request body', null);
            }
            return await this.rolesService.updateRole(updateRoleDto.id, updateRoleDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to update role', null);
        }
    }

    @Delete()
    async deleteRole(@Body('id') id: number): Promise<ApiResponse<null>> {
        try {
            if (!id) {
                return new ApiResponse(false, 'Role ID is required in the request body', null);
            }
            return await this.rolesService.deleteRole(id);
        } catch (error) {
            return new ApiResponse(false, 'Failed to delete role', null);
        }
    }
}