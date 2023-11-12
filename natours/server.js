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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);
const testTours = new Tour({
  name: 'ROLLS',
  rating: 4.5,
  price: 45000,
});

testTours
  .save()
  .then((doc) => {
    console.log('doc' + doc);
  })
  .catch((err) => {
    console.log('ERRR' + err);
  });

console.log('resp-->' + JSON.stringify(statuuss));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
