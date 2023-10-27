const express = require("express");
const app = express();
const DataStore = require("nedb");

const database = new DataStore("database.db");
database.loadDatabase();

app.listen(8082, () => console.log("listening on port 8082"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (req, res) => {
  const data = req.body;
  const timeStamp = Date.now();

  data.timestamp = timeStamp;

  database.insert(data);
  console.log(database);

  res.json({
    status: "success",
    timestamp: timeStamp,
    mood: data.mood,
    latitude: data.lat,
    longitude: data.long,
  });
});

app.get("/api", (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data);
  });
});
