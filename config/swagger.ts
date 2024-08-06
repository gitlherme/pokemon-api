import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Pokemon API Swagger')
  .setVersion('1.0')
  .build();
