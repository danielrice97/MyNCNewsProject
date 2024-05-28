const request = require('supertest')
const app = require('../app.js')

describe('Fetching API topics requests', () => {
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