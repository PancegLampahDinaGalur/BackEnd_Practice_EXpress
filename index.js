const express = require('express');
const pg = require('pg');
const {Client} = pg; 
const http = require('http');
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

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})