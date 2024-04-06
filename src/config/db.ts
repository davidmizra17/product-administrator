import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
require('dotenv').config({ path: '../.env' }); // Load environment variables from .env file in the parent directory

dotenv.config()

console.log(process.env)

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*.ts']
})

export default db;