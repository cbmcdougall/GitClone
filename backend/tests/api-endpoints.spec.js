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
            .expect(200, done);
    });

    describe("PUT /gitpush adds new blog post", () => {
        beforeAll(() => {
            this.testPost = {
                "title": "API testing sure is a hoot!",
                "text": "You ever just feel an intense thrill writing tests for your API endpoints? I sure do!",
                "gifUrl": ""
            };
            this.expectedResponse = {
                "id": "3",
                "title": "API testing sure is a hoot!",
                "text": "You ever just feel an intense thrill writing tests for your API endpoints? I sure do!",
                "gifUrl": "",
                "date": new Date().toLocaleDateString('en-GB'),
                "thumbsUp": "0",
                "thumbsDown": "0",
                "laughing": "0",
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
        test("PUT request adds the data", async () => {
            const response = await request(api).get('/pushes');
            expect(response.status).toBe(200);
            expect(response.body[response.body.length-1]).toStrictEqual(this.expectedResponse)
        });
    });

    describe("PUT /gitpush/comment adds new comment to blog post data", () => {
        beforeAll(() => {
            this.testComment = {
                "body": "I agree, we need more posts!",
                "id": "2"
            };
            this.expectedResponse = {
                "body": `${this.testComment.body}`,
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
        test("PUT request adds to the data", async () => {
            const response = await request(api).get('/pushes');
            expect(response.status).toBe(200);
            const comment = response.body[this.testComment.id-1].comments[0];
            expect(comment).toStrictEqual(this.expectedResponse)

        })
    });

    describe("PUT /gitpush/:emoji adjusts the relevant emoji count for the post", () => {
        describe("PUT /gitpush/thumbsUp on post id 1 with 'add' is successful", () => {
            beforeAll(() => {
                this.requestBody = {
                    "id": "1",
                    "adjust": "add"
                };
            });
            test("PUT request is successful", (done) => {
                request(api)
                    .put('/gitpush/thumbsUp')
                    .send(this.requestBody)
                    .expect("Emoji has been added")
                    .expect(200, done);
            });
            test("PUT request adds a thumbs up", async () => {
                const response = await request(api).get('/pushes');
                expect(response.status).toBe(200);
                const thumbsUp = response.body[this.requestBody.id-1].thumbsUp;
                expect(thumbsUp).toBe(3);
            });
        });
        test("PUT /gitpush/thumbsDown on post 2 with 'remove' is successful", async () => {
            const requestBody = {
                "id": "2",
                "adjust": "remove"
            };
            const putRequest = await request(api)
                .put('/gitpush/thumbsDown')
                .send(requestBody);
            if (putRequest.status === 200) {
                const response = await request(api).get('/pushes');
                expect(response.status).toBe(200);
                const thumbsDown = response.body[requestBody.id-1].thumbsDown;
                expect(thumbsDown).toBe(2);
            } else {
                throw new Error(`Status code ${putRequest.status}: ${putRequest.text}`);
            };
        });
    });
});