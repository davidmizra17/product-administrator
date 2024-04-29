import express from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'


export async function connectDB() {
    try {

        await db.authenticate()
        db.sync()
        // console.log(colors.magenta("conexion exitosa a la db"))
        
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold("hubo un error al conectar a la base de datos"))

    }
}
connectDB();
//Instancia de express
const server = express();
const cors = require('cors')

server.use(cors('http://localhost:5173/'))

//leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'Desde API'})
})



export default server