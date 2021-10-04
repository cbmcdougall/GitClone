const request = require('supertest');
const app = require('../app');

describe('api routes', () => {
    let api;
    beforeEach(() => {
        api = app.listen(5000, () => {
            console.log(`Test API running on port 5000`)
        });
    });
    afterEach((done) => {
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    test("GET /pushes returns all the stored blog posts", (done) => {
        request(api)
            .get('/pushes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res => res.length > 0)
            .expect(200, done);
    });

    test("PUT /gitpush adds a new blog post", (done) => {
        let testPost = {
            "title": "API testing sure is a hoot!",
            "text": "You ever just feel an intense thrill writing tests for your API endpoints? I sure do!"
        };
        let expectedResponse = {
            "id": "3",
            "title": "API testing sure is a hoot!",
            "text": "You ever just feel an intense thrill writing tests for your API endpoints? I sure do!",
            "date": "04/10/2021",
            "thumbsUp": "0",
            "thumbsDown": "0",
            "comments": []
        }
        request(api)
            .put('/gitpush')
            .send(testPost)
            .expect(201)
            .expect(expectedResponse, done)
    })

    test("successful PUT request adds to the data", (done) => {
        let testPost = {
            "title": "API testing sure is a hoot!",
            "text": "You ever just feel an intense thrill writing tests for your API endpoints? I sure do!"
        };
        let expectedResponse = {
            "id": "3",
            "title": "API testing sure is a hoot!",
            "text": "You ever just feel an intense thrill writing tests for your API endpoints? I sure do!",
            "date": "04/10/2021",
            "thumbsUp": "0",
            "thumbsDown": "0",
            "comments": []
        }
        request(api)
            .put('/gitpush')
            .send(testPost)
        request(api)
            .get('/pushes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res => res[res.length-1] === expectedResponse)
            .expect(200, done)

    })

})