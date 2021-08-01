import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(Array)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception && exception[0] instanceof ValidationError) {
      const ex: ValidationError = exception[0];
      return response.status(400).json({
        statusCode: 400,
        message: Object.values(ex.constraints),
        error: 'Bad Request',
      });
    }

    return response.status(400).json({
      statusCode: 400,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}
