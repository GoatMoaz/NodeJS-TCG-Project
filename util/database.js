const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://GoatMoazUser:dKGy14rsTuxUB36I@cluster0.hzbff1k.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      cb(client);
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;