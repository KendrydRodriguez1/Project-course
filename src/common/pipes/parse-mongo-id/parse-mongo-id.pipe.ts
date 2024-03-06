import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  transform(value: string, metadata: ArgumentMetadata) {
    // console.log({value, metadata})
    if (!isValidObjectId(value)){
      throw new BadRequestException(`${value} is not a valid MongoID`)  //validar si el id es de tipo mongo
    } 
    return value; //retorna el valor ingresado en delete como mayuscula
  }
}
