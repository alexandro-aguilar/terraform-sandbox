import Joi from "joi";

export default interface Schema {
    path?:  Joi.ObjectSchema | Joi.ArraySchema | Joi.StringSchema,
    query?:  Joi.ObjectSchema | Joi.ArraySchema | Joi.StringSchema,
    body?:  Joi.ObjectSchema | Joi.ArraySchema | Joi.StringSchema,

}