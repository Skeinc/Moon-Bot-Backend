import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiResponse } from "@shared/dto/api.dto";
import { CreateRequestDto, GetRequestDto, RequestDto, UpdateRequestDto } from "@shared/dto/request.dto";
import { RequestEntity } from "@shared/entities/request.entity";
import { UserEntity } from "@shared/entities/user.entity";
import { RequestStatusesEnum, RequestTypesEnum } from "@shared/enums/requests.enum";
import { mapRequest } from "@shared/utils/mapper.util";
import { Repository } from "typeorm";

@Injectable()
export class RequestsService {
    constructor(
        @InjectRepository(RequestEntity)
        private readonly requestRepository: Repository<RequestEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async getAllRequests(): Promise<ApiResponse<GetRequestDto[]>> {
        try {
            const requests = await this.requestRepository.find({
                relations: ['user'],
            });

            const mappedRequests = requests.map(mapRequest);

            return new ApiResponse(true, 'All requests retrieved successfully', mappedRequests);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getRequest(id: string): Promise<ApiResponse<GetRequestDto>> {
        try {
            const request = await this.requestRepository.findOne({
                where: { id },
                relations: ['user'],
            });

            if (!request) {
                throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
            }

            return new ApiResponse(true, 'Request retrieved successfully by ID', mapRequest(request));
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getRequestsByUserId(userId: string): Promise<ApiResponse<GetRequestDto[]>> {
        try {
            const requests = await this.requestRepository.find({
                where: { user: { id: userId } },
                relations: ['user'],
            });

            const mappedRequests = requests.map(mapRequest);

            return new ApiResponse(true, 'Requests retrieved successfully by user ID', mappedRequests);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getRequestsByType(type: RequestTypesEnum): Promise<ApiResponse<GetRequestDto[]>> {
        try {
            const requests = await this.requestRepository.find({
                where: { type },
                relations: ['user'],
            });

            const mappedRequests = requests.map(mapRequest);

            return new ApiResponse(true, 'Requests retrieved successfully by request type', mappedRequests);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getRequestsByStatus(status: RequestStatusesEnum): Promise<ApiResponse<GetRequestDto[]>> {
        try {
            const requests = await this.requestRepository.find({
                where: { status },
                relations: ['user'],
            });

            const mappedRequests = requests.map(mapRequest);

            return new ApiResponse(true, 'Requests retrieved successfully by request status', mappedRequests);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createRequest(createRequestDto: CreateRequestDto): Promise<ApiResponse<RequestEntity>> {
        try {
            const user = await this.userRepository.findOneBy({ id: createRequestDto.userId });

            if (!user) {
                throw new HttpException('User  not found', HttpStatus.NOT_FOUND);
            }

            if (!Object.values(RequestTypesEnum).includes(createRequestDto.type)) {
                throw new HttpException('Invalid request type', HttpStatus.BAD_REQUEST);
            }
    
            if (createRequestDto.status && !Object.values(RequestStatusesEnum).includes(createRequestDto.status)) {
                throw new HttpException('Invalid request status', HttpStatus.BAD_REQUEST);
            }

            const request = this.requestRepository.create({
                ...createRequestDto,
                user,
            });

            const savedRequest = await this.requestRepository.save(request);

            return new ApiResponse(true, 'Request created successfully', savedRequest);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateRequest(id: string, updateRequestDto: UpdateRequestDto): Promise<ApiResponse<RequestDto>> {
        try {
            const existingRequest = await this.requestRepository.findOne({ where: { id } });

            if (!existingRequest) {
                throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
            }

            if (updateRequestDto.type && !Object.values(RequestTypesEnum).includes(updateRequestDto.type)) {
                throw new HttpException('Invalid request type', HttpStatus.BAD_REQUEST);
            }
    
            if (updateRequestDto.status && !Object.values(RequestStatusesEnum).includes(updateRequestDto.status)) {
                throw new HttpException('Invalid request status', HttpStatus.BAD_REQUEST);
            }

            await this.requestRepository.update({ id }, updateRequestDto);

            const updatedRequest = await this.getRequest(id);

            return new ApiResponse(true, 'Request updated successfully', updatedRequest.data);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteRequest(id: string): Promise<ApiResponse<null>> {
        try {
            const deleteResult = await this.requestRepository.delete(id);
    
            if (deleteResult.affected === 0) {
                throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
            }
    
            return new ApiResponse(true, 'Request deleted successfully', null);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}