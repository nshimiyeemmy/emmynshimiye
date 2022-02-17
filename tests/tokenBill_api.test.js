const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('./../app')
const api = supertest(app)
const User = require('../models/users')
const meterNumber = require('../models/meterNumber')
const bcrypt = require('bcrypt')


describe('new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const hashedPassword = await bcrypt.hash('secret', 10)
    
        const user = new User({
            firstname: 'nshimiye',
            lastname: 'rootic',
            email: 'emmyt@bla.com',
            hashedPassword,
        })
        
        await user.save()
    })
    test('valid new users are created', async () => {
        const token = await helper.signToken('nshimiye')
        const usersBefore = await api
            .get('/admin/users')
            .set('Authorization', `bearer ${token}`)

        const user = {
            firstName: 'oreste',
            lastName: 'abizera',
            email: 'oreste@gmail.com',
            password: 'oreste'
        }
        const result = await api
            .post('/users/register')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body.message).toBe('registration successful')

        const usersAfter = await api
            .get('/admin/users')
            .set('Authorization', `bearer ${token}`)

        expect(usersAfter.body).toHaveLength(usersBefore.body.length + 1)
    })

    test('invalid new users are not created', async () => {
        const token = await helper.signToken('nshimiye')
        const usersBefore = await api
            .get('/admin/users')
            .set('Authorization', `bearer ${token}`)
        
        const user = {
            email: 'harerimanaegide@',
            lastName: 'kam1',
            firstName: 'Kama',
            password: 'sho'
        }

        const result = await api
            .post('/users/register')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toBe('Password must not be less than 6 characters')

        const usersAfter = await api
            .get('/admin/users')
            .set('Authorization', `bearer ${token}`)

        expect(usersAfter.body).toHaveLength(usersBefore.body.length)
    })
    test('user can login with valid credentials', async () => {
        const credentials = {
            email: 'nshimiyee311@gmail.com',
            password: '123@nshimiye'
        }

        const result = await api
            .post('/users/login')
            .send(credentials)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(result.body.username).toBe('nshimiyee311@gmail.com')
    })
    test('user cannot login with invalid credentials', async () => {
        const credentials = {
            email: 'voting@gmail.com',
            password: 'habumugisha'
        }

        const result = await api
            .post('/users/login')
            .send(credentials)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toBe('invalid email or password')
    })
})

describe('meter numbers in db', () => {
    beforeEach(async () => {
        await meterNumber.deleteMany({})
    
        const meterNumbers = helper.initialMeters.map(meter => new Meter(meter))
        const promises = meters.map(meter => meter.save())
        await Promise.all(promises)
    })

    test('meterNumbers are saved as json', async () => {
        const token = await helper.signToken('nshimiyee311@gmail.com')
        const response = await api
            .get('/meters/all')
            .set('Authorization', `bearer ${token}`)
    
        await api
            .get('/meters/all')
            .set('Authorization', `bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    test('_id is id', async () => {
        const token = await helper.signToken('nshimiyee311@gmail.com')
        const response = await api
            .get('/meters/all')
            .set('Authorization', `bearer ${token}`)
    
        response.body.forEach(meter => expect(meter.id).toBeDefined())
    })
})

describe('new blog', () => {
    beforeEach(async () => {
        await meterNumber.deleteMany({})
        await User.deleteMany({})

        const meters = helper.initialMeters.map(meter => new Meter(meter))
        const promises = meters.map(meter => meter.save())
        await Promise.all(promises)

        const hashedPassword = await bcrypt.hash('secret', 10)
    
        const user = new User({
            firstName: 'nshimiye',
            lastName: 'emmy',
            email: 'nshimiyee311@gmail.com.com',
            hashedPassword
        })
        
        await user.save()
    })

    test('add meter', async () => {
        const token = await helper.signToken('nshimiyee311@gmail.com')

        const newMeter = {
            meterNumber: 123456,
            user_id: '4r3uvhrehgerthftwe7hf',
        }
    
        await api
            .post('/meters/new')
            .send(newMeter)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api
            .get('/meters/all')
            .set('Authorization', `bearer ${token}`)
        expect(response.body).toHaveLength(helper.initialMeters.length + 1)
    
        const meters = response.body.map(meter => meter.meterNumber)
        expect(meters).toContain('123456')
    })

    describe('meter is created', () => {
        beforeEach(async () => {
            const token = await helper.signToken('nshimiyee311@gmail.com')

            const newMeter = {
                meterNumber: 123456,
                user_id: '4r3uvhrehgerthftwe7hf',
            }

            await api
                .post('/meters/new')
                .send(newMeter)
                .set('Authorization', `bearer ${token}`)
        })

        test('meter can be deleted', async () => {
            const token = await helper.signToken('nshimiyee311@gmail.com')
            const metersBefore = await api
                .get('/meters/all')
                .set('Authorization', `bearer ${token}`)
    
            const { id } = metersBefore.body.find(meter => meter.meterNumber === 123456)
    
            const response = await api
                .delete(`/admin/meter/${id}`)
                .set('Authorization', `bearer ${token}`)
                .expect(204)
    
            expect(response.body.message).not.toBeDefined()
    
            const metersAfter = await api
                .get('/meters/all')
                .set('Authorization', `bearer ${token}`)
    
            expect(metersAfter.body).toHaveLength(metersBefore.body.length - 1)

            expect(metersAfter.body.find(meter => meter.id === id)).not.toBeDefined()
        })
    })
})

afterAll(() => mongoose.connection.close())
