import mongoose from "mongoose";
async function connectDatabase() {
  await mongoose.connect("mongodb://localhost:27017/mydb", {
    useNewUrlParser: true,
  });
  console.log("Database connect !");
}

export { connectDatabase };
