const pool = require("../../config/db");
 
class cars{
    async getCars(req, res){
        try {
            const cars = await pool.query("SELECT name_car, year, type, manufactur, price, img, id FROM cars");
            res.status(200).json(cars.rows);
        } catch (error) {
            res.status(500).json({ message: "Server Error Bro" });
        }
    }
 
    async getCarById(req, res){
        const id = req.params.id;
        try {
            const car = await pool.query("SELECT * FROM cars WHERE id = $1", [id]);
            res.status(200).json(car.rows);
        } catch (error) {
            res.status(500).json({ message: "Server Error Bro" });
        }
    }
   
    async createCar(req, res){
        const { name_car, year, type, manufactur, price, img, license_number, seat, baggage, transmition, description,is_driver, is_available, create_by, update_by, create_dt, update_dt } = req.body;
        try {
            const newCar = await pool.query(
            `INSERT INTO cars (name_car, year, type, manufactur, price, img, license_number, seat, baggage, transmition, description, is_driver, is_available, create_by, update_by, create_dt, update_dt) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
            RETURNING *`,
            [name_car, year, type, manufactur, price, img, license_number, seat, baggage, transmition, description, is_driver, is_available, create_by, update_by, create_dt, update_dt]
        );
            res.status(201).json(newCar.rows);
        } catch (error) {
            res.status(500).json({ message: "Server Error Bro"});
        }
    
    }


   
    async updateCar(req, res){
        const { id } = req.params;
        const { name_car, year, type, manufactur, price, img, license_number, seat, baggage, transmition, description, is_driver, is_available, } = req.body;
        try {
            const updatedCar = await pool.query(
            `UPDATE cars SET name_car = $1, year = $2, type = $3, manufactur = $4, price = $5, img = $6, license_number = $7, seat = $8, baggage = $9, transmition = $10, description = $11, is_driver = $12, is_available = $13 WHERE id = $14
            RETURNING *`,
            [name_car, year, type, manufactur, price, img, license_number, seat, baggage, transmition, description, is_driver, is_available, id]
        );
            res.status(200).json(updatedCar.rows[0]);
        } catch (error) {
            res.status(500).json({ message: "Server Error Bro"});
        }
    
    }

    async deleteCar(req, res) {
        const { id } = req.params;
        try {
            const cars = await pool
            await pool.query("DELETE FROM cars WHERE id = $1", [id]);
            if(cars.rowCount === 0) return res.status(404).json({ message: "Car not found" });
            res.status(200).json({ message: "Car deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server Error Bro" });
        }
    }
}
module.exports = new cars();