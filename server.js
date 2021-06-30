import mongoose from "mongoose";
import app from "./app.js";

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db_con = mongoose.connection;

// db_con.on("error", console.error.bind(console, "connection error"));
db_con.once("open", function () {
  console.log(`Connection established to ${uri}`);
});

const server = app.listen(port, () =>
  console.log(`Server running on localhost:${port}...`)
);

process.on("unhandledRejection", (err, _promise) => {
  console.log(`Error: ${err.message}`);
  // server.close(() => process.exit(1));
});

export default app;
