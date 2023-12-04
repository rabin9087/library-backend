import Joi from 'joi'

export const newUserValidation = (req, res, next) => {
    try {
        //model what your validation is 
        const schema = Joi.object({
            fName: Joi.string().required(),
            lName: Joi.string().required(),
            phone: Joi.string().allow("", null),
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().required(),
        })

        const { value, error } = schema.validate(req.body)
        console.log(value)
        console.log(error, "-----------")

        if (error) {
            return res.json({
                status: 'error',
                message: error.message
            })
        }
        next();
    } catch (error) {
        console.log(error)
    }
}

export const loginValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().required(),
        });

        const { value, error } = schema.validate(req.body);
        if (error) {
            return res.json({
                status: "error",
                message: error.message,
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}