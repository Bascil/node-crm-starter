const joi = require("joi");

// create schema to validate the customer
const customerSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  active: joi.boolean().optional(),
});

module.exports = customerSchema;
