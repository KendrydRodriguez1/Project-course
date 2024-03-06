import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Document} from 'mongoose'   //este va hacer el tipo de documento con el cual se va a guardar 
@Schema()
export class Pokemon extends Document {
    @Prop({ //define como estaran cada cosa a guardar (en este caso name)
        unique: true,  //define que se unico 
        index: true, //crea un indice 
    })
    name: string


    @Prop({
        unique: true,
        index: true,
    })
    no: number 
}

// para crear un esquema a partir de la clase Pokemon. Este esquema se utilizará más tarde para definir la estructura de la colección de Pokémon en la base de datos.
export const PokemoShema = SchemaFactory.createForClass(Pokemon)
