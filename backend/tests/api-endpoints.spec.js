const request = require('supertest');
const app = require('../app');

describe('api routes', () => {
    let api;
    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log(`Test API running on port 5000`)
        });
    });
    afterAll((done) => {
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

    describe("PUT /gitpush adds new blog post", () => {
        beforeAll(() => {
            this.testPost = {
                "title": "API testing sure is a hoot!",
                "text": "You ever just feel an intense thrill writing tests for your API endpoints? I sure do!"
            };
            this.expectedResponse = {
                "id": "3",
                "title": "API testing sure is a hoot!",
                "text": "You ever just feel an intense thrill writing tests for your API endpoints? I sure do!",
                "date": new Date().toLocaleDateString(),
                "thumbsUp": "0",
                "thumbsDown": "0",
                "comments": []
            };
        });
        test("PUT request is successful", (done) => {
            request(api)
                .put('/gitpush')
                .send(this.testPost)
                .expect(201)
                .expect(this.expectedResponse, done);
        });
        test("PUT request adds the data", (done) => {
            request(api)
                .put('/gitpush')
                .send(this.testPost);
            request(api)
                .get('/pushes')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => {
                    const posts = JSON.parse(res.text);
                    const post = posts[posts.length-1];
                    return post === this.expectedResponse;
                })
                .expect(200, done);
        });
    })

    describe("PUT /gitpush/comment adds new comment to blog post data", () => {
        beforeAll(() => {
            this.testComment = {
                "body": "Oh man, this is really cool!",
                "id": "2"
            };
            this.expectedResponse = {
                "body": "Oh man, this is really cool!",
                "dateAdded": new Date().toLocaleDateString()
            };
        });
        test("PUT request is successful", (done) => {
            request(api)
                .put('/gitpush/comment')
                .send(this.testComment)
                .expect(201)
                .expect(this.expectedResponse, done);
        });
        test("PUT request adds to the data", (done) => {
            request(api)
                .get('/pushes')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => {
                    const comment = JSON.parse(res.text)[1].comments[0];
                    return comment === this.expectedResponse;
                })
                .expect(200, done);
        });
    })

})