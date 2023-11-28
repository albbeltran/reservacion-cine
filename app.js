const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const { query } = require('./db');

const app = express();
const port = process.env.PORT;

// middleware

app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded

// cors
app.use(cors());

// obtener todas las butacas
app.get('/butaca', async (req, res) => {
    try {
        const result = await query('SELECT * FROM butacas;');
        res.send(result);
    } catch (err) {
        console.log('Hubo un error', err);
    }
})

// obtener estado de la butaca
app.get('/butaca/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await query('SELECT estado FROM butacas WHERE id = ?', [id]);
        const estado = result[0].estado;

        if (estado != 'on') res.sendStatus(200);
        else res.sendStatus(400);

    } catch (err) {
        console.log('Hubo un error', err);
    }
});

// cambiar estado de la butaca 
app.post('/butaca/:id', async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;
        await query(`UPDATE butacas SET estado = ? WHERE id = ?`, [data.estado, id]);
        res.sendStatus(200);
    } catch (err) {
        console.log('Hubo un error', err);
        res.sendStatus(400);
    }
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})