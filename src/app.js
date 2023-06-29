const express = require("express");
const app = express();
const UserRoutes = require("./routes/UserRoutes");
const MongoConnect = require("./db/mongo");
const UserModel = require("./models/UserModel");

app.use(express.json());
app.delete("/delete/:email", async (req, res) => {
  const email = req.params.email;
  await UserModel.deleteOne({ email });
  res.sendStatus(200);
});
app.use(UserRoutes);
MongoConnect();

module.exports = app;
