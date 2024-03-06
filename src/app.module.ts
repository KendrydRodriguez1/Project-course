import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema, 
    }),  //siempre colocar al inicio para poder ahorra problemas de pag 103 para arriba
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
      MongooseModule.forRoot(process.env.MONGODB, {
        dbName: 'Pokemonsdb'  //para poner en el nombre de como va a estar guardado los pokemons en railway
      }),
    PokemonModule,
    CommonModule,
    SeedModule
  ],
})
export class AppModule {
  constructor(){
    console.log(process.env)}
  
}
