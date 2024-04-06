import { Request, Response } from "express"

import Product from "../models/Product.model"
import { ValidationErrorItemOrigin } from "sequelize"


export const createProduct = async(req: Request, res: Response) => {
    
    try {

        const product = new Product(req.body)
        const savedProduct = await product.save()
    
    res.json({data: savedProduct})
        
    } catch (error) {
        console.log(error)
        
    }
   

}