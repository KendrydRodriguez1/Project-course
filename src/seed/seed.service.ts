import { Pokemon } from './../pokemon/entities/pokemon.entity';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/pok-response.interfaces';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adaptersHTTP/axios.adapter';


@Injectable()
export class SeedService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model <Pokemon>,
    private readonly http: AxiosAdapter
  ){}
  
  async executeSeed(){
    await this.PokemonModel.deleteMany({})
    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=600')
    const pokemonToInsert: {name:string, no:number} [] = []
    data.results.forEach(async({name, url}) => {
      const segmentos = url.split('/')
      const no = +segmentos[segmentos.length - 2]
      await pokemonToInsert.push({name, no})
    })

    this.PokemonModel.insertMany(pokemonToInsert)  //almacena todos los datos en la base de datos

    return 'si'
    
  }


}