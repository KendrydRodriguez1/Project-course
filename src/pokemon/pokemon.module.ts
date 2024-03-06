import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemoShema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[   //Modelo de como estara la base de datos
    ConfigModule, 
    MongooseModule.forFeature([{
      name:Pokemon.name,
      schema:PokemoShema,
    }])
  ],
  exports: [MongooseModule],
})
export class PokemonModule {}
