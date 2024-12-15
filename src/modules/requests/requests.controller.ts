import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreateRequestDto, GetRequestDto, UpdateRequestDto } from "@shared/dto/request.dto";
import { RequestStatusesEnum, RequestTypesEnum } from "@shared/enums/requests.enum";
import { RequestEntity } from "@shared/entities/request.entity";

@Controller('requests')
export class RequestsController {
    constructor(
        private readonly requestsService: RequestsService
    ) {}

    @Get()
    async getAllRequests(): Promise<ApiResponse<GetRequestDto[]>> {
        try {
            return await this.requestsService.getAllRequests();
        } catch (error) {
            return new ApiResponse(false, 'Failed to retrieve requests', null);
        }
    }

    @Get(':id')
    async getRequest(@Param('id') id: string): Promise<ApiResponse<GetRequestDto>> {
        try {
            return await this.requestsService.getRequest(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve request with ID ${id}`, null);
        }
    }

    @Get('/by-user/:userId')
    async getRequestsByUserId(@Param('userId') userId: string): Promise<ApiResponse<GetRequestDto[]>> {
        try {
            return await this.requestsService.getRequestsByUserId(userId);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve requests for user with ID ${userId}`, null);
        }
    }

    @Get('/by-type/:type')
    async getRequestsByType(@Param('type') type: RequestTypesEnum): Promise<ApiResponse<GetRequestDto[]>> {
        try {
            return await this.requestsService.getRequestsByType(type);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve requests of type ${type}`, null);
        }
    }

    @Get('/by-status/:status')
    async getRequestsByStatus(@Param('status') status: RequestStatusesEnum): Promise<ApiResponse<GetRequestDto[]>> {
        try {
            return await this.requestsService.getRequestsByStatus(status);
        } catch (error) {
            return new ApiResponse(false, `Failed to retrieve requests with status ${status}`, null);
        }
    }

    @Post()
    async createRequest(@Body() createRequestDto: CreateRequestDto): Promise<ApiResponse<RequestEntity>> {
        try {
            return await this.requestsService.createRequest(createRequestDto);
        } catch (error) {
            return new ApiResponse(false, 'Failed to create request', null);
        }
    }

    @Put()
    async updateRequest(@Body() updateRequestDto: UpdateRequestDto): Promise<ApiResponse<GetRequestDto>> {
        try {
            if (!updateRequestDto.id) {
                return new ApiResponse(false, 'Request ID is required in the request body', null);
            }

            return await this.requestsService.updateRequest(updateRequestDto.id, updateRequestDto);
        } catch (error) {
            return new ApiResponse(false, `Failed to update request with ID ${updateRequestDto.id}`, null);
        }
    }

    @Delete()
    async deleteRequest(@Body('id') id: string): Promise<ApiResponse<null>> {
        try {
            if(!id) {
                return new ApiResponse(false, 'Request ID is required in the request body', null);
            }

            return await this.requestsService.deleteRequest(id);
        } catch (error) {
            return new ApiResponse(false, `Failed to delete request with ID ${id}`, null);
        }
    }
}