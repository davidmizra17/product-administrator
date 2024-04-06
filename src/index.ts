import colors from 'colors'
import server from './server'
import 'reflect-metadata';



const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(colors.cyan.bold(`REST API en el puerto ${PORT}`))
})