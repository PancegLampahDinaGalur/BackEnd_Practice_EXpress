const Joi = require("joi");
const BaseController = require('../base');
const UserModel = require('../../models/users');
const express = require("express");
const router = express.Router();
const { encryptPassword} = require("../../helpers/bcrypt");

const users = new UserModel();

const userSchema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone_number: Joi.string().required(),
    addres: Joi.string().required(),    
    avatar: Joi.string().uri().allow(null),
    role : Joi.string().required(),
    birthdate: Joi.date().required(),
    gender : Joi.string().required(),
    driver_license: Joi.string().required(),
  
});

class UsersController extends BaseController {
    constructor(model) {
        super(model)
        router.get("/", this.getAll);
        router.post("/", this.validation(userSchema),this.checkUnique,this.encryptPassword, this.create);
        router.get("/:id", this.get);
        router.put("/:id", this.validation(userSchema),this.checkUnique, this.update);
        router.delete("/:id", this.delete);
    }


//overide 
checkUnique = async (req, res, next) => {
    const checkUnique = await this.model.getone({
        where: {
        OR : [
            { email: req.body.email,},
    
            {phone_number: req.body.phone_number,},
             
        ]
    },

    select : {
        email: true,
        phone_number: true,
    }

});

if(checkUnique)
    return next(new ValidationError("Email or Phone Number already exist"));


next();
};

encryptPassword = async (req, res, next) => {
    const encryptedPass = await encryptPassword(req.body.password);
    req.body.password = encryptedPass;
    next();
};

}
new UsersController(users);
module.exports = router;
