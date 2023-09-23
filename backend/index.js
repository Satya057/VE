const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

mongoose.set("strictQuery", false);

const todomodel = require("./model/todo.model");

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend start");
});

app.get("/todo", async (req, res) => {
  let data = await todomodel.find();
  res.send(data);
});
app.post("/todo", async (req, res) => {
  let data = await todomodel.create(req.body);
  res.send(data);
  data.save();
});

app.delete(`/todo/:id`, async (req, res) => {
  const data = await todomodel.findByIdAndDelete(req.params.id);
  res.send(data);
});

const dbconnect = () => {
  mongoose.connect(
    "mongodb+srv://satya057:satya057@cluster0.lketdlg.mongodb.net/?retryWrites=true&w=majority"
    
    // "mongodb+srv://skk:skk123@cluster0.h5brjlh.mongodb.net/?retryWrites=true&w=majority"
  );
};

app.listen(8080, () => {
  dbconnect();
  try {
    console.log("Server start");
  } catch (err) {
    console.log(err);
  }
});
