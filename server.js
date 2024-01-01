const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
// For config.env file
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log("DB connected Successfully");
});

// For Port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
// console.log(process.env);
