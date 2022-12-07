const Joi = require('joi');

const schema = Joi.object({
    nome: Joi.string().min(3).max(30).required().messages({
        "string.min": "O nome deve ter pelo menos 3 caracteres",
        "string.max": "O nome deve ter no máximo 30 caracteres",
        "string.empty": "Nome não informado"
}),
    password: Joi.string().min(3).max(30).required().messages({
        "string.min": "Password deve ter pelo menos 3 caracteres",
        "string.max": "Password deve ter no máximo 30 caracteres",
        "string.empty": "Password não informado"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email não informado"
    }),
    cpf: Joi.string().required().min(11).max(11).pattern(new RegExp('[0-9]{11}')).messages({
        "string.empty": "CPF não informado",
        "string.max": "O CPF deve ter 11 caracteres",
        "string.min": "O CPF deve ter 11 caracteres",
        "string.pattern.base": "CPF inválido"
    })
});

const validate = (user) => {
    const result = schema.validate(user, {
        abortEarly: false
    });
    if (result.error) {
        return result.error;
    }
}

const schemaPost = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
        "string.min": "Título deve ter pelo menos 3 caracteres",
        "string.max": "Título deve ter no máximo 100 caracteres",
        "string.empty": "Título não informado"
    }),
    description: Joi.string().min(3).required().messages({
        "string.min": "Texto do Post deve ter pelo menos 3 caracteres",
        "string.empty": "Texto do Post não informado"
    })
})

const validatePost = (post) => {
    const result = schemaPost.validate(post, {
        abortEarly: false
    });
    if (result.error) {
        return result.error;
    }
}

module.exports = { validate, validatePost } ;