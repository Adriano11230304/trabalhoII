const Joi = require('joi');

const schema = Joi.object({
    nome: Joi.string().min(3).max(30).required().messages({
        "string.min": "O nome deve ter pelo menos 3 caracteres",
        "string.max": "O nome deve ter no máximo 30 caracteres"
}),
    password: Joi.string().min(3).max(30).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        "string.min": "Password deve ter pelo menos 3 caracteres",
        "string.max": "O nome deve ter no máximo 30 caracteres",
        "pattern": "Password deve ter pelo menos ----"
    }),
    email: Joi.string().email(),
    cpf: Joi.string().required()
});

const validate = (user) => {
    const result = schema.validate(user, {
        abortEarly: false
    });
    if (result.error) {
        return result.error;
    }
}

module.exports = validate;