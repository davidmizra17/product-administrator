import { idDirective } from '@neo4j/graphql/dist/graphql/directives'
import { printSourceLocation } from 'graphql'
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'products'
})

class Product extends Model{

    @Column({
        type: DataType.STRING(100)
    })
    
    name: String

    @Column({
        type: DataType.FLOAT(6, 2)
    })
    price: number

    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean
}
 

export default Product
