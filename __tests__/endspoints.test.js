const request = require('supertest')
const app = require('../app.js')
const { end } = require('../db/connection.js')

describe('API Tests', () => {
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
