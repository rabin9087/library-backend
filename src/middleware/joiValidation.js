import Joi from 'joi'

const SORTSTR = Joi.string().required()
const SORTSTRREQUIRED = Joi.string().max(100).required()
const LONGSTR = Joi.string().max(500).required()
const LONGSTRREQUIRED = Joi.string().max(5000).required()
const NUMBERREQUIRED = Joi.number().required()
const EMAILREQUIRED = Joi.string().email({ minDomainSegments: 2 }).required()
const PHONEREQUIRED = Joi.string().allow("", null)
const PASSWORDREQUIRED = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

const validationProcesser = ({ schemaObj, req, res, next }) => {
    try {
        //model what your validation is 
        const schema = Joi.object(schemaObj)
        const { error } = schema.validate(req.body)
        console.log("schema.validate(req.body): ", schema.validate(req.body))
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

//new user validation
export const newUserValidation = (req, res, next) => {
    //model what your validation is 
    const schema = Joi.object({
        fName: SORTSTR,
        lName: SORTSTR,
        phone: PHONEREQUIRED,
        email: EMAILREQUIRED,
        password: SORTSTR,
    })
    validationProcesser({ schema, req, res, next })
}

//login Validation
export const loginValidation = (req, res, next) => {

    const schema = Joi.object({
        email: EMAILREQUIRED,
        password: PASSWORDREQUIRED,
    });
    validationProcesser({ schema, req, res, next })

}

//books validation
export const newBookValidation = (req, res, next) => {
    const schemaObj = {
        thumbnail: LONGSTRREQUIRED,
        name: SORTSTRREQUIRED,
        author: SORTSTRREQUIRED,
        publishYear: NUMBERREQUIRED,
        isbn: SORTSTRREQUIRED,
        description: LONGSTRREQUIRED,
    }
    validationProcesser({ schemaObj, req, res, next })
}

export const updateBookValidation = (req, res, next) => {
    const schemaObj = {
        _id: SORTSTRREQUIRED,
        status: SORTSTRREQUIRED,
        thumbnail: LONGSTRREQUIRED,
        name: SORTSTRREQUIRED,
        author: SORTSTRREQUIRED,
        publishYear: NUMBERREQUIRED,
        description: LONGSTRREQUIRED,
    }
    validationProcesser({ schemaObj, req, res, next })
}