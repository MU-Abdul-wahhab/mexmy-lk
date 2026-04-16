import { SetMetadata } from '@nestjs/common';
import { RESPONSE_MESSAGE_KEY } from '../constants/api-success-message.constant';

export const ApiResponseMessage = (message : string) =>
  SetMetadata(RESPONSE_MESSAGE_KEY , message)