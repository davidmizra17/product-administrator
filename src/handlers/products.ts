import { Request, Response } from "express"

import Product from "../models/Product.model"
import { ValidationErrorItemOrigin } from "sequelize"


export const createProduct = async(req: Request, res: Response) => {
    
    const product = await Product.create(req.body)
    res.status(201).json({data: product})
}

export const getProducts = async (req: Request, res: Response) => {
   
    const product = await Product.findAll()
    res.json({ data: product })
    console.log("DESDE GET")
}
export const getProductByID = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }
   
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
                    return res.status(404).json({
                error: 'Producto No Encontrado'
            })

    }

    const updatedProduct = await product.update(req.body)

    await updatedProduct.save()

    res.json({data: product})

}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    console.log("this should return the opposite of what is in the response" + "=>" + !product.availability)

    product.dataValues.availability = !product.dataValues.availability
    await product.save()

    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
                    
        return res.status(404).json({
                
            error: 'Producto No Encontrado'
            
        })

    }
    await product.destroy()
    res.json({data: "producto eliminado"})

}