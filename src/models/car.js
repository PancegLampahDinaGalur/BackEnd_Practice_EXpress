const BaseModel=require('./index');

class CarModel extends BaseModel{
    constructor(){
        super('cars');
        this.select = {
            id : true,
            name_car : true,
            manufactur : true,
            img : true,
            year : true,
            price : true,
            
        };
    }
}