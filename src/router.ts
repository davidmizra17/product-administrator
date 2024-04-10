import { Router } from "express";
import { createProduct, getProducts, getProductByID, updateProduct, updateAvailability, deleteProduct } from "./handlers/products";
import { body, param } from 'express-validator'
import { handleInputErrors } from "./middleware";


const router = Router(); 
//GET
router.get('/', getProducts)

router.get('/:id',
    
    param('id').isInt().withMessage('ingrese un numero para el id'),
    handleInputErrors,    
    getProductByID)
//POST
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

//POST
router.put('/:id',
    body('name')
        .notEmpty().withMessage("El nombre del producto no puede ir vacio"),
    body('price')
    .isNumeric().withMessage("Valor no valido")
        
        .notEmpty().withMessage('El precio del producto no puede estar vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

router.patch('/:id',
    param('id').isInt().withMessage('ingrese un numero para el id'),
    handleInputErrors,  
    updateAvailability)
    
router.delete('/:id', deleteProduct)

export default router