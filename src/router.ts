import { Router } from "express";
import { createProduct } from "./handlers/products";
import { body } from 'express-validator'
import { handleInputErrors } from "./middleware";


const router = Router(); 

router.get('/', (req, res) => {
    res.send('Hola mundo en get')
})
router.post('/',
    
    //Validation
     body('name')
        
        .notEmpty()
        .withMessage('El nombre del producto no puede estar vacio'),
        
    
     body('price').isNumeric().withMessage("Valor no valido")
        
        .notEmpty().withMessage('El precio del producto no puede estar vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    //Manejamos errores en el middleware 
    handleInputErrors,
    //si no hay errores, con funcion next() invocada en handleInputErrors llamamos a la funcion createProduct
    createProduct)
router.put('/', (req, res) => {
    res.send('Hola mundo en put')
})


export default router