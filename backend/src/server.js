import express from "express";
import cors from "cors"
import connectDb from "./db/connect.db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userlogin from "./routes/userlogin.routes.js";
import userRegister from "./routes/userRegister.routes.js";
import authMiddleware from "./middlewares/user.auth.js";
import mathQuestion from "./routes/mathqestion.route.js";
import englishQuestion from "./routes/english.routes.js";
import scienceQuestion from "./routes/science.routes.js";

dotenv.config();


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: '*', // Allows all origins (not recommended for production)
  methods: '*', // Allows all HTTP methods
  credentials: true
}));

const port = process.env.PORT || 5000;


app.use("/api/register", userRegister);
app.use("/api/login", userlogin);
app.use("api/maths",mathQuestion);
app.use("api/science",scienceQuestion);
app.use("api/english",englishQuestion);

app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "API route not found",
  });
});

app.listen(port, () => {
  connectDb()
    .then(() => {
      console.log("Database connected successfully!");
    })
    .catch((error) => {
      console.error(`Database connection error: ${error.message}`);
    });

  console.log(`Server running on http://localhost:${port}`);
});
