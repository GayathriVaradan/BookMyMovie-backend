/* eslint-disable no-console */
const mongoose = require('mongoose');

// eslint-disable-next-line import/no-unresolved

const envFiles = {
  development: '.env',
  test: '.env.test',
};
// eslint-disable-next-line import/no-unresolved
require('dotenv').config({ path: envFiles[process.env.NODE_ENV] });

const connect = async () => {
  const mongoConnectionString = process.env.MONGO_URI;
  try {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(mongoConnectionString, opts);
    console.log({ mongoConnectionString });
  } catch (err) {
    console.log(`Fail to connect with database ${mongoConnectionString}`);
  }
};
module.exports = { connect };
