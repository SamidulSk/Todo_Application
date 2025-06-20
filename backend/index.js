import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";
import summaryRoute from "./routes/summary.route.js";
import cors from "cors";
import "./cron/reminderJob.js";
const app = express();
dotenv.config();

// port
const port = process.env.PORT || 4002;
app.listen(port, () => {
  console.log(`server up on ${port}`);
});

// database connection
const DB_URI = process.env.MONGODB_URI || "mongodb+srv://mrsamidul2002:CmQCIQzqRGWLLgyP@cluster0.dxkeu1q.mongodb.net/";
(async () => {
  try {
    const { connection } = await mongoose.connect(DB_URI);
    if (connection) {
      console.log(`Connected to MongoDB: ${connection.host} ${connection.name}`);
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
// routes
app.use("/user", userRoute);
app.use("/todo", todoRoute);
app.use("/summary", summaryRoute);

app.get(`/`, (req, res) => {
  res.send(`TODO App`);
})
