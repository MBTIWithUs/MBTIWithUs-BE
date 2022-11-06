import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { EntityNotFoundError } from "typeorm";
import { Response } from 'express';

@Catch(EntityNotFoundError)
export  class EntityNotFoundFilter implements ExceptionFilter {

    catch(exception: EntityNotFoundError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status: number = 404;

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url
            });
    }
}