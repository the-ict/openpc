import Joi from 'joi';

export const create_model_schema = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().allow('CPU', 'GPU', 'MOTHER_BOARD', 'RAM', 'STORAGE', 'POWER_SUPPLY', 'COOLER', 'CASE').required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
    model_file: Joi.string().required(),
});

export const update_model_schema = Joi.object({
    id: Joi.string().uuid(),
    name: Joi.string().optional(),
    type: Joi.string().allow('CPU', 'GPU', 'MOTHER_BOARD', 'RAM', 'STORAGE', 'POWER_SUPPLY', 'COOLER', 'CASE').optional(),
    brand: Joi.string().optional(),
    price: Joi.number().optional(),
    image: Joi.string().optional(),
    model_file: Joi.string().optional(),
});