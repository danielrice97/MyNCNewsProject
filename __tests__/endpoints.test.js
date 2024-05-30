const request = require('supertest')
const app = require('../app.js')
const db = require('../db/data/test-data/index.js')
const seed = require('../db/seeds/seed.js')

beforeEach(()=> seed(db))

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
    describe('For retrieving an individual article', () => {
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

    test('Status 400: Gives an error message for entering a parametric endpoint of wrong data type when trying to retrieve a specific article ',()=>{
        return request(app)
        .get('/api/articles/hello')
        .expect(400)
        .then((data) => {
            const err = data.body
            expect(err).toMatchObject({ status: 400, msg: 'Bad Request' })
            
        }) 
    })
    })
    describe('Get all articles', () => {

    test('Status 200: Gets all articles',()=>{
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((data) => {
            const articles = data.body

            articles.forEach((article) => {
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title : expect.any(String),
                    topic : expect.any(String),
                    author : expect.any(String),
                    created_at : expect.any(String),
                    votes : expect.any(Number),
                    article_img_url: expect.any(String)
                })
            })

        }) 
    })

})

describe('For retrieving comments for a specified article', () => {

    test('Status 200: Gets all comments for specified article',()=>{
        return request(app)
        .get('/api/articles/3/comments')
        .expect(200)
        .then(({ body }) => {
           for (let comment of body) {
            expect(comment).toMatchObject({
                comment_id: expect.any(Number),
                body: expect.any(String),
                article_id: expect.any(Number),
                author: expect.any(String),
                votes: expect.any(Number),
                created_at: expect.any(String)
               })
           }            
        }) 
    })

    test('Status 404: Not Found error when looking for comments of a non existant article',()=>{
        return request(app)
        .get('/api/articles/999/comments')
        .expect(404)
        .then(({ body }) => {
            expect(body).toMatchObject({ status: 404, msg: 'Not found' })
        }) 
    })

    test('Status 400: Gives an error message for entering a parametric endpoint of wrong data type when trying to retrieve comments for a specified article',()=>{
        return request(app)
        .get('/api/articles/hello/comments')
        .expect(400)
        .then(({ body }) => {
            expect(body).toMatchObject({ status: 400, msg: 'Bad Request' })
        }) 
    })

})

describe('For adding a comment to a specified article', () => {
    test('Status 201: inserts a new comment for the specified article and responds with the posted comment',()=>{
        return request(app)
        .post('/api/articles/3/comments')
        .send({ username: "butter_bridge",
                body: "I am northcoder student"
        })
        .expect(201)
        .then(({body}) => {
            const comment = body[0]
            expect(comment).toMatchObject({
                comment_id: expect.any(Number),
                body: 'I am northcoder student',
                article_id: 3,
                author: "butter_bridge",
                votes: expect.any(Number),
                created_at: expect.any(String)
            })
        });
    })
    test('Status 404: cannot post and displays 404 error message because no such article to post the comment to',()=>{
        return request(app)
        .post('/api/articles/999/comments')
        .send({ username: "daniel",
                body: "I am northcoder student"
        })
        .expect(404)
        .then(({body}) => {
            expect(body).toMatchObject({ status: 404, msg: 'Not found' })
        });
    })

    test('Status 401: unauthorised user tried to add a comment to an article',()=>{
        return request(app)
        .post('/api/articles/3/comments')
        .send({ username: "daniel",
                body: "I am northcoder student"
        })
        .expect(401)
        .then(({body}) => {
            expect(body).toMatchObject({ status: 401, msg: 'Unauthorized' })
        });
    })


    
})

describe('Patches the article by updating the number of votes', () => {
    test('Status 201: succesfully patches the article when a valid article is chosen and updates the number of votes when given amount to update them',()=>{
        return request(app)
        .patch('/api/articles/3')
        .send({ inc_votes: 50 })
        .expect(201)
        .then(({body}) => {
            expect(body).toMatchObject({
                article_id: 3,
                title: 'Eight pug gifs that remind me of mitch',
                topic: 'mitch',
                author: 'icellusedkars',
                body: 'some gifs',
                created_at: '2020-11-03T09:12:00.000Z',
                votes: 50,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'})
        });
    })

    test('Status 404: tries to patch a non existant article and returns an error and status code',()=>{
        return request(app)
        .patch('/api/articles/999')
        .send({ inc_votes: 50 })
        .expect(404)
        .then(({body}) => {
            expect(body).toMatchObject({ status: 404, msg: 'Not found' })
        })
    })
  

})

})
describe('Deletes a comment when given a comment_id', () => {
    test('Status 204: succesfully deleted the comment when given a valid comment ID',()=>{
        return request(app)
        .delete('/api/comments/4')
        .expect(204)
    })  

    test('Status 404: cannot delete comment when comment ID does not match any of our comments',()=>{
        return request(app)
        .delete('/api/comments/999')
        .expect(404)
        .then(({body}) => {
            expect(body).toMatchObject({ status : 404, msg: "Not Found"})
        });
    })  


    test('Status 400: cannot delete comment when given incorrect data type for the comment id',()=>{
        return request(app)
        .delete('/api/comments/hello')
        .expect(400)
        .then(({body}) => {
            expect(body).toMatchObject({ status : 400, msg: "Bad Request"})
        });
    })  
})


describe('User Tests', () => {
    describe('Gets all the Users', () => {
    test('Status 200: Gets all the Users ',()=>{
        return request(app)
        .get('/api/users')
        .expect(200).then(({body}) => {
            const users = body
            users.forEach((user) => {
                expect(user).toMatchObject({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String)
                })
            })
        })
    })  
    })
})