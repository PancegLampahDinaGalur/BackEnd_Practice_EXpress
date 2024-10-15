const BaseModel = require("./index");

class accessModel extends BaseModel {
  constructor() {
    super("access");
    this.select = {
      id: true,
      visible: true,
      role_id: true,
      menu_id: true,
      grant: true,
    };
  }
}

module.exports = accessModel;
