const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoDbData = process.env.MONGODB;
console.log('mongoDbData-->' + mongoDbData);
const app = require('./app');
// console.log('process.PORT-->' + process.env.PORT);
const port = process.env.PORT || 8001;

const statuuss = mongoose
  .connect(mongoDbData, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((con) => {
    console.log('conn.connection!!' + con.connections);
    console.log('status Conncted!!');
  });

console.log('resp-->' + JSON.stringify(statuuss));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
