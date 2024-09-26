
import Joi from 'joi';

import Schema from "@commons/utils/request/Schema"

const queryPaginationSchema = Joi.object(({
  
  pn: Joi.number().integer().min(1).required().label('pn => Page Number'),
  ps: Joi.number().integer().min(1).required().label('ps => Page Size')

}));


const pathPaginationSchema = Joi.object(({
  
  categoryId: Joi.number().integer().min(1).required().label(`categoryId => Book's category id`),
  authorId: Joi.number().integer().min(1).required()  .label(`authorId => Book's author id`)

}));

const schema: Schema = {
  query: queryPaginationSchema,
  path: pathPaginationSchema
}

export default schema;