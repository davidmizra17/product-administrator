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