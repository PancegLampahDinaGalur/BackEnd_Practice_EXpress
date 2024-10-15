const BaseModel = require("./index");

class roleModel extends BaseModel {
  constructor() {
    super("role");
    this.select = {
      id: true,
      role: true,
    };
  }
}

module.exports = roleModel;
