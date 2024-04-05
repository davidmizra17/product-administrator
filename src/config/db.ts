import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
require('dotenv').config({ path: '../.env' }); // Load environment variables from .env file in the parent directory

dotenv.config()

console.log(process.env)

const db = new Sequelize(process.env.DATABASE_URL)

export default db;