const request = require('supertest')
const app = require('../app.js')

describe('Topic Tests', () => {
    test('Status 200: GETs all Topics',()=>{
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body })=>{
            const topics = body
            expect(topics).toHaveLength(3)
            topics.forEach((topic)=> {
                expect(topic).toMatchObject({
                    description : expect.any(String),
                    slug : expect.any(String),
            })

            })
        })
    })
})

describe('Endpoint Tests', () => {
    test('Status 200: GETs all EndPoints Info',()=>{
        return request(app)
        .get('/api')
        .expect(200)
        .then((data)=>{
            const endpoints = data.body
            
            for (let endpoint in endpoints) {
             const endpointObject = endpoints[endpoint]
             const length = Object.keys(endpointObject).length

             switch(length) {
                case 1:
                  // code block
                  expect(endpointObject).toMatchObject({
                    description : expect.any(String),
                })
                  break;
                case 2:
                  // code block
                  expect(endpointObject).toMatchObject({
                    description : expect.any(String),
                    queries : expect.any(Array),
                })
                  break;
                case 3:
                    expect(endpointObject).toMatchObject({
                        description : expect.any(String),
                        queries : expect.any(Array),
                        exampleResponse : expect.any(Object),
                    })
                  break;
                default:
              }


            }
        })
    })
})

describe('Article Tests', () => {
    test('Status 200: GETs an Article when given an article ID which we have',()=>{
        return request(app)
        .get('/api/articles/3')
        .expect(200)
        .then((data)=>{    
            const article = data.body
            expect(article).toMatchObject({
                article_id: expect.any(Number),
                title : expect.any(String),
                topic : expect.any(String),
                author : expect.any(String),
                body : expect.any(String),
                created_at : expect.any(String),
                votes : expect.any(Number),
                article_img_url: expect.any(String)
            })
        })
    })

    test('Status 404: Gives an error message and a status 404 for non existant article',()=>{
        return request(app)
        .get('/api/articles/999')
        .expect(404)
        .then((data) => {
            const err = data.body
            expect(err).toMatchObject({ status: 404, msg: 'Not found' })
        })
    })

    test('Status 400: Gives an error message for entering a parametric endpoint of wrong data type',()=>{
        return request(app)
        .get('/api/articles/hello')
        .expect(400)
        .then((data) => {
            const err = data.body
            expect(err).toMatchObject({ status: 400, msg: 'Bad Request' })
            
        }) 
    })

})

