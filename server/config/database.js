const mongoose = require('mongoose');

module.exports = {
  async connect() {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    mongoose.connection.on('error', (err) => {
      console.error(err);
      console.log('MongoDb Error!!');
      process.exit();
    });
    return mongoose;
  },
};
