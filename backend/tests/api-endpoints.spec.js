const request = require('supertest');
const app = require('../app');

describe('api routes', () => {
    let api;
    beforeAll(() => {
        // Set up the server on port 5000
        api = app.listen(5000, () => {
            console.log(`Test API running on port 5000`)
        });
    });
    afterAll((done) => {
        // Close the server
        console.log('Gracefully stopping test server');
        api.close(done);
    });

    test("GET / tells you to go to /pushes for posts", (done) => {
        request(api)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Visit /pushes to get all the blog posts!')
            .expect(200, done)
    })

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
                "id": "6",
                "title": `${this.testPost.title}`,
                "text": `${this.testPost.text}`,
                "gifUrl": `${this.testPost.gifUrl}`,
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
                // Server should return the data for the post just added
                .expect(this.expectedResponse, done);
        });
        test("PUT request adds the data", async () => {
            // Check that the latest post is the newly added post
            const response = await request(api).get('/pushes');
            expect(response.status).toBe(200);
            expect(response.body[response.body.length-1]).toStrictEqual(this.expectedResponse)
        });
    });

    describe("PUT /gitpush/comment adds new comment to blog post data", () => {
        beforeAll(() => {
            this.testComment = {
                "id": "2",
                "body": "I agree, we need more posts!"
            };
            this.expectedResponse = {
                "id": "1",
                "body": `${this.testComment.body}`,
                "dateAdded": new Date().toLocaleDateString()
            };
        });
        test("PUT request is successful", (done) => {
            request(api)
                .put('/gitpush/comment')
                .send(this.testComment)
                .expect(201)
                // Server should return the data for the comment that was added
                .expect(this.expectedResponse, done);
        });
        test("PUT request adds to the data", async () => {
            // Check the test comment was added to the post
            const response = await request(api).get('/pushes');
            expect(response.status).toBe(200);
            // response.body gives the posts
            const comment = response.body[this.testComment.id-1].comments[this.expectedResponse.id-1];
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
                this.expectedResponse = {
                    "status": "200",
                    "message": "Emoji has been added",
                    "emojiCount": "3"
                }
            });
            test("PUT request is successful", (done) => {
                request(api)
                    .put('/gitpush/thumbsUp')
                    .send(this.requestBody)
                    .expect(this.expectedResponse)
                    .expect(200, done);
            });
            test("PUT request adds a thumbs up", async () => {
                // Check the data was updated with the new emoji count
                const response = await request(api).get('/pushes');
                expect(response.status).toBe(200);
                const thumbsUp = response.body[this.requestBody.id-1].thumbsUp;
                expect(thumbsUp).toBe(this.expectedResponse.emojiCount);
            });
        });
        test("PUT /gitpush/thumbsDown on post 2 with 'remove' is successful", async () => {
            const requestBody = {
                "id": "2",
                "adjust": "remove"
            };
            // Make PUT request to adjust thumbsDown emoji
            const putRequest = await request(api)
                .put('/gitpush/thumbsDown')
                .send(requestBody);
            if (putRequest.status === 200) {
                // Put request was successful
                // Check if emoji count was correctly updated
                const response = await request(api).get('/pushes');
                expect(response.status).toBe(200);
                const thumbsDown = response.body[requestBody.id-1].thumbsDown;
                expect(thumbsDown).toBe("2");
            } else {
                throw new Error(`Put request failed. Status code ${putRequest.status}: ${putRequest.text}`);
            };
        });
        test("PUT /gitpush/laughing with wrong adjust value returns error", async () => {
            const requestBody = {
                "id": "2",
                "adjust": "addition"
            }
            // Make PUT request
            const putRequest = await request(api)
                .put('/gitpush/laughing')
                .send(requestBody);
            expect(putRequest.status).toBe(400);
            expect(JSON.parse(putRequest.text).message).toContain('adjust must be "add" or "remove"');
        })
    });

    describe("DELETE requests successfully remove specified post/comment", () => {
        test("DELETE /gitrm/2 successfully removes post #2 and updates ids", async () => {
            // Note that the post added in the earlier test still exists in this test as post 3
            const deletePost = await request(api).delete('/gitrm/2');
            if (deletePost.status === 200) {
                // Delete request successful
                const checkPosts = await request(api).get('/pushes');
                const posts = checkPosts.body;
                // Check the post was deleted
                expect(posts.length).toBe(5);
                // Check that post ids were updated
                expect(posts[posts.length-1].id).toBe(posts.length);
            } else {
                throw new Error(`Status code ${deletePost.status}: ${deletePost.text}`);
            };
        });
        test("DELETE /rm/1/comment/1 successfully removes comment #1 from post #1 and updates ids", async () => {
            const testComment = {
                "id": "1",
                "body": "Adding test comment"
            };
            // Add test comment
            const putRequest = await request(api)
                .put('/gitpush/comment')
                .send(testComment)
            if (putRequest.status === 201) {
                // Put request successful, new comment should be 2nd comment on this post
                // Delete the first comment on this post
                const deleteComment = await request(api)
                    .delete(`/gitrm/${testComment.id}/comment/1`)
                if (deleteComment.status === 200) {
                    // Delete request successful
                    // Check if comment has been deleted and ids updated
                    const checkPosts = await request(api).get('/pushes');
                    const comments = checkPosts.body[testComment.id-1].comments;
                    expect(comments.length).toBe(1);
                    expect(comments[comments.length-1].id).toBe(comments.length);
                } else {
                    throw new Error(`Delete request failed. Status code ${deleteComment.status}: ${deleteComment.text}`);
                };
            } else {
                throw new Error(`Put request failed. Status code ${putRequest.status}: ${putRequest.text}`);
            };
        });
    });

    describe("Errors in routes are handled", () => {
        test("PUT /gitpush/:emoji with an invalid emoji returns a response asking for the correct path", async () => {
            const response = await request(api).put('/gitpush/thumbs');
            expect(response.status).toBe(404);
            expect(response.text).toBe("Please specify /thumbsUp, /thumbsDown, or /laughing in fetch url");
        })
    })
});

