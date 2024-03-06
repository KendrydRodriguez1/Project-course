import * as Joi from 'joi'  //se le pone asi para que importe todo
export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),  //dice que si no viene el mongodb va a lanzar error
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(7)
})