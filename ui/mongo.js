const mongoose = require("mongoose")

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017")
    console.log("Connected to MongoDB")
  } catch (err) {
    console.error("Failed to connect to MongoDB", err)
  }
}

connectToDatabase()

const newSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true
  }
})

const collection = mongoose.model("collection", newSchema)

module.exports = collection