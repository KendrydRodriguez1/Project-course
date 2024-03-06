import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2'),
  app.useGlobalPipes(
    new ValidationPipe({  //manejo de pipes que creo
      whitelist: true,
      forbidNonWhitelisted: true,
      //permite que se jagn transformaciones . PNG 98
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  )
  await app.listen(process.env.PORT); //esto se hace si es que se quiere 
}
bootstrap();
