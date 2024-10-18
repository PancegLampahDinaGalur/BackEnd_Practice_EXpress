const BaseModel = require("./index");

class UsersModel extends BaseModel {
  constructor() {
    super("users");
    this.select = {
      id: true,
      full_name: true,
      email: true,
      phone_number: true,
      addres: true,
      avatar: true,
      role_id: true,
      birthdate: true,
      gender: true,
      driver_license: true,
    };
  }
}

module.exports = UsersModel;
