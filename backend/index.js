const app = require('./app');
const port = process.env.PORT || 3000;


// Start server
app.listen(port, () => {
    console.log(`Express server running on port ${port}`)
});