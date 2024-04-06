import { Request, Response } from "express"
import { check, validationResult } from 'express-validator'
import Product from "../models/Product.model"
import { ValidationErrorItemOrigin } from "sequelize"


export const createProduct = async(req: Request, res: Response) => {
    //Validation
    await check('name').notEmpty().withMessage('El nombre del producto no puede estar vacio').run(req)

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const product = new Product(req.body)
    const savedProduct = await product.save()
    
    res.json({data: savedProduct})

}