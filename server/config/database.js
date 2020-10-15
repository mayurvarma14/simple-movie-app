const mongoose = require('mongoose');

module.exports = {
  async connect() {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.connection.on('error', (err) => {
      console.error(err);
      console.log('MongoDb Error!!');
      process.exit();
    });
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    return mongoose;
  },
};
