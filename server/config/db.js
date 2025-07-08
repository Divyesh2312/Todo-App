const mongoose = require("mongoose");


const MONGO_URL = process.env.MONGO_URI 
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

module.exports = mongoose;