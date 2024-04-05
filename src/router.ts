import {
    
    Router

} from "express";

const router = Router(); 

router.get('/', (req, res) => {
    res.send('Hola mundo en get')
})
router.post('/', (req, res) => {
    res.send('Hola mundo en post')
})
router.put('/', (req, res) => {
    res.send('Hola mundo en put')
})


export default router