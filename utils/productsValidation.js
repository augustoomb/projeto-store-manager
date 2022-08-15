const Joi = require('joi');

const schemaName = Joi.object({
  name: Joi.string()
    .min(5)
    .required(),  
});

const schemaId = Joi.object({
  id: Joi.number()
    .integer(),
});

module.exports = {
  schemaName, schemaId,
};
