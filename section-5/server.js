const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
// console.log('process.PORT-->' + process.env.PORT);
const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});