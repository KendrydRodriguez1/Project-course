import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaulttLimit: number
  constructor(
    @InjectModel(Pokemon.name)
    private readonly PokemonModel: Model <Pokemon>,
    private readonly configService: ConfigService
  ){
    this.defaulttLimit = configService.get<number>('defaultLimit') //se saca de el archivo de cosfiguracio  de las variables de entorno
  }



  //Crear un nuveo dato
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try{ //en el model se especifico que cada valor sera unico, por lo cual dara error si se ingresan dos valores repetidos 
      const Pokemon = await this.PokemonModel.create(createPokemonDto)
      return Pokemon;
    }catch(error){
      this.hadleExeptions(error)
    }
  }



  //Encontrar otro dato
  findAll(paginationDto: PaginationDto) {
    const {limit = this.defaulttLimit, offset = 0} = paginationDto  //le da 10  y 0 por si no ingresa nada
    return this.PokemonModel.find()
    .limit(limit)
    .skip(offset)
  }



  //Encontrar mediante un id 
  async findOne(term: string) {
    let pokemon: Pokemon
    if (!isNaN(+term)){
      pokemon = await this.PokemonModel.findOne({no:term})  //findOne es para buscar
    }
    if(isValidObjectId(term) && !pokemon){  //verifica MongoID
      pokemon = await this.PokemonModel.findById(term)
    }

    if (!pokemon){//Encontrar medinate el nombre 
      pokemon = await this.PokemonModel.findOne({name: term.toLowerCase().trim()})
    }
    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no `)
    return pokemon;
  }





  //Editar algun dato de base de datos 
  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const Pokemon = await this.findOne(term)
    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
      try{
        await Pokemon.updateOne(updatePokemonDto, {new: true})
        return {...Pokemon.toJSON(),...updatePokemonDto}
      }catch (error){
        this.hadleExeptions(error)
      }
  }




  //Eliminar de base de datos 
  async remove(id: string) {
    // const exist = this.findOne(id)
    // const exist = await this.findOne(id)
    // await exist.deleteOne()
    const {deletedCount} =  await this.PokemonModel.deleteOne({_id:id}); //elimina un pokemon con ese id
    if (deletedCount === 0){  //verificar esto envia un cero en caso de que no sea eliminado
      throw new BadRequestException(`Pokemon with id "${id}" not fount`);
    }
    return;
  }



  //metodo para poder enviar errores
  private hadleExeptions(error: any){
    if(error.code == 11000){
      throw new BadRequestException(`Hay un error in db ${JSON.stringify(error.keyValue)}`)
    }
    throw new InternalServerErrorException(`Can't create Pokemon - check servet logs`)
  }

  


}
