import { Router } from "express";
import { createProduct } from "./handlers/products";

const router = Router(); 

router.get('/', (req, res) => {
    res.send('Hola mundo en get')
})
router.post('/', createProduct)
router.put('/', (req, res) => {
    res.send('Hola mundo en put')
})


export default router