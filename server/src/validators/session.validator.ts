import Joi from "joi";

export const create_session_schema = Joi.object({
    name: Joi.string().required(),
});

export const add_model_to_session_schema = Joi.object({
    model_id: Joi.string().required(),
});