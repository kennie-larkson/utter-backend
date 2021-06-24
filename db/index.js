import mongoose from "mongoose";

export const uri =
  "mongodb+srv://lawallarkson:$vMv8a3Di9tpSQY@halaqaat.sd2ol.mongodb.net/UtterUsers?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db_con = mongoose.connection;

db_con.on('error', console.error.bind(console, 'connection error'))
db_con.once('open', function() { console.log(`Connection established to ${uri}`);})



export default db_con;
