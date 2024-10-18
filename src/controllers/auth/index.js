const Joi = require("joi");
const BaseController = require("../base");
const UserModel = require("../../models/users");
const express = require("express");
const router = express.Router();
const { checkPassword, encryptPassword } = require("../../helpers/bcrypt");
const { createToken } = require("../../helpers/jwt");
// const ServerError = require("nodejs/src/helpers/errors/server");
// const bcrypt = require("bcryptjs");

const users = new UserModel();

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .messages({
      "string.required":
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character",
      "string.min":
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character",
      "string.pattern.base":
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character",
    }),
  role: Joi.string().optional(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

class AuthController extends BaseController {
  constructor(model) {
    super(model);
    router.post(
      "/signup",
      this.validation(signupSchema),
      this.encrypt,
      this.signUp
    );
    router.post("/signin", this.validation(signinSchema), this.signIn);
  }

  signUp = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Check if the user already exists
      const checkUser = await this.model.getone({
        where: {
          email,
        },
        select: {
          email: true,
        },
      });

      if (checkUser) return next(new ValidationError("Email already exists"));

      const data = {
        email: email,
        password: password,
        role_id: 3 /* USER */,
      };

      console.log(data);
      // Create a new user
      const newUser = await this.model.set(data);
      return res.status(201).json(
        this.apiSend({
          code: 201,
          status: "success",
          message: "Signup success",
          data: {
            user: { ...newUser, id: undefined, password: undefined },
          },
        })
      );
    } catch (e) {
      next(new ServerError(e));
    }
  };
  encrypt = async (req, res, next) => {
    try {
      const encryptedPass = await encryptPassword(req.body.password);
      req.body.password = encryptedPass;
      next();
    } catch (e) {
      next(new ServerError(e));
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.model.getone({
        where: {
          email,
        },
      });

      if (!user) {
        return next(new ValidationError("Email or Password is wrong"));
      }

      const isMatch = await checkPassword(password, user.password);
      if (!isMatch) {
        return next(new ValidationError("Email or Password is wrong"));
      }

      const token = createToken({
        id: user.id,
      });
      return res.status(200).json(
        this.apiSend({
          code: 200,
          status: "success",
          message: "Signin success",
          data: {
            user: { ...user, id: undefined, password: undefined },
            token,
          },
        })
      );
    } catch (e) {
      next(new ServerError(e));
    }
  };
}

new AuthController(users);
module.exports = router;
