import { SetMetadata } from '@nestjs/common';

export const PUBLIC_AUTH_KEY = 'public-route';

export const Public = () => SetMetadata(PUBLIC_AUTH_KEY , true)