import { Sequelize } from "sequelize";

const db = new Sequelize('postgres://rest_api_node_ts_server_user:9pGOboG49KroiDV5NO7mwnOzt1a2WazK@dpg-co87u7ljm4es738v3eu0-a.oregon-postgres.render.com/rest_api_node_ts_server?ssl=true')

export default db;