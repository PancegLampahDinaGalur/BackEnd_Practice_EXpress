const express = require('express');
const pg = require('pg');
const {Client} = pg; 
const http = require('http');
// const express = require('express');
// const pg = require('pg');
const PORT = 3000;

const app = express();
const server = http.createServer(app);

const client = new Client({
    user : 'admin40',
    host : 'localhost',
    database : 'car_rental',
    password : 'admin40',
    port : '5432'
})

// async function connectAndListTables() {
//     try {
//         await client.connect();
//         console.log('Connected to the database');
        
//         const res = await client.query(`
//             SELECT table_name 
//             FROM information_schema.tables 
//             WHERE table_schema = 'public'
//         `);
//         return res.rows
        
//         console.log('Tables in the database:', res.rows);
//     } catch (err) {
//         console.error('Error connecting to the database or fetching tables:', err);
//         return err
//     } finally {
//         await client.end();
//     }
    
// }

client.connect((err) => {
    console.log(err)
});

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).send('hello world');
});

app.get('/about', (req,res) => {
    res.status(200).send('page about');
});

app.post('/register', (req,res) => {
    console.log(req.body);
    res.status(200).send(`Register ${req.body.email} Succes` );
});

app.get('/cars2', (req, res) => {
    client.query("SELECT * FROM CARS")
    .then((data) => {
        res.status(200).json(data.rows);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send('Error fetching cars'); // ini kalo pake promise (tidak di recomendasikan)
    });
});


app.get('/cars', async (req, res) => {
    const data = await  client.query("SELECT * FROM CARS"); // ini pake async
    console.log(data);
    res.status(200).json(data.rows);
});

app.post('/cars', async (req, res) => {
    const {
        manufactur,
        type,
        licenseNumber,
        seat,
        baggage,
        name_car,
        transmition,
        description,
        year,
        is_driver,
        is_available,
        img,
        create_by,
        update_by,
        create_dt,
        update_dt,
        price
    } = req.body;
    try {
        const res = await client.query(
            "INSERT INTO cars (manufactur, type, license_number, seat, baggage, name_car, transmition, description, year, is_driver, is_available, img, create_by, update_by, create_dt, update_dt, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);",
            [manufactur, type, licenseNumber, seat, baggage, name_car, transmition, description, year, is_driver, is_available, img, create_by, update_by, create_dt, update_dt, price]
        );
        res.status(201).json(`Submit data is success : ${JSON.stringify()}`);
    } catch (error) {
        console.error(error);
        res.status(500).json(`Internal Server Error : ${error}`);
    }
});


app.put('/cars/:id', async (req, res) => {
    const { id } = req.params;
    const {
        manufactur,
        type,
        licenseNumber,
        seat,
        baggage,
        name_car,
        transmition,
        description,
        year,
        is_driver,
        is_available,
        img,
        create_by,
        update_by,
        create_dt,
        update_dt,
        price
    } = req.body;
   
    try {
        const result = await client.query(
            `UPDATE cars 
             SET manufactur = $1, type = $2, license_number = $3, seat = $4, baggage = $5, name_car = $6, transmition = $7, description = $8, year = $9, is_driver = $10, is_available = $11, img = $12, create_by = $13, update_by = $14, create_dt = $15, update_dt = $16, price = $17
             WHERE id = $18`,
            [manufactur, type, licenseNumber, seat, baggage, name_car, transmition, description, year, is_driver, is_available, img, create_by, update_by, create_dt, update_dt, price, id]
        );
        res.status(200).json(`Update data is success : ${JSON.stringify(result.rowCount)}`);
    } catch (error) {
        console.error(error);
        res.status(500).json(`Internal Server Error : ${error}`);
    }
});



// app.post('/cars2', async (req, res) => {
//     const { manufactur, type, licenseNumber, seat, baggage, name_car, transmition, description, year, is_driver, is_available, img, create_by, update_by, create_dt, update_dt, price } = req.body;
//     try {
//         const result = await client.query(
//             "INSERT INTO CARS (manufactur, type, licenseNumber, seat, baggage, name_car, transmition, description, year, is_driver, is_available, img, create_by, update_by, create_dt, update_dt, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *",
//             [manufactur, type, licenseNumber, seat, baggage, name_car, transmition, description, year, is_driver, is_available, img, create_by, update_by, create_dt, update_dt, price]
//         );
//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})