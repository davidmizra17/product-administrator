import request from 'supertest'
import server from '../../server'


describe('POST /api,products', () => {

    it('Price should be > 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse Ergonomico",
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
    })
    
    it('Price should bea number and > 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse Ergonomico",
            price: "hello"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
    })


    it('Should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)
    })


    it('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 50
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.body).not.toHaveProperty('error')
    })
})


describe('GET /api,products', () => {

    it('validate if the url exists', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    it('GET a JSON response with products ', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty('errors')
        

    })
})

describe('GET /api/products/:id', () => {
    it('Should return a 404 response for a non existent product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')
    })

    it('Should check a valid id in the url', async () => {
        const response = await request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })
})

describe('PUT /api/products/:id', () => {


    it('should check a valid id in the url', async () => {
        const response = await request(server).put('/api/products/not-valid-url').send({
            name: "Monitor Curvo",
            availability: true,
            price: 300
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('should display validation error messages when updating a product', async () => {
        
        const response = await request(server).put('/api/products/1').send({}) 

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)
    })
    it('should validate price > 0', async () => {
        
        const response = await request(server).put('/api/products/1').send({
            name: "Monitor Curvo",
            availability: true,
            price: -300
        }) 

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Precio no valido')
    })
    it('should return a 404 for a non-existent product', async () => {
        const productId = 2000
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Monitor Curvo",
            availability: true,
            price: 300
        }) 

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')
        
    })
    it('should update an existing product with valid data', async () => {
        
        const response = await request(server).put('/api/products/1').send({
            name: "Monitor Curvo",
            availability: true,
            price: 500
        }) 

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
        
    })
})

describe('DELETE /api/products/:id', () => {
    
    it('should check a valid id', async () => {
        const response = await request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    it('should return a 404 for a non-existent product', async () => {
        const productID = 2000
        const response = await request(server).delete(`/api/products/${productID}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')

        expect(response.body).not.toHaveProperty('data')
        expect(response.body).not.toBe(200)
    })

    it('should eliminate a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('producto eliminado')

        expect(response.body).not.toHaveProperty('errors')
        expect(response.body).not.toBe(400)
        expect(response.body).not.toBe(404)

    })
})