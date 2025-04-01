
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://user-mangement-9a295-default-rtdb.firebaseio.com/" // replace this
});

const db = admin.database();
module.exports = db;