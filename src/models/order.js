const BaseModel = require("./index");

class OrderModel extends BaseModel {
  constructor() {
    super("orders");
    this.select = {
      id: true,
      order_no: true,
      users_id: true,
      car_id: true,
      start_time: true,
      end_time: true,
      total: true,
      is_driver: true,
      is_expired: true,
      status: true,
      is_deleted: true,
      create_by: true,
      update_by: true,
      create_dt: true,
      update_dt: true,
    };
  }
}

module.exports = OrderModel;
