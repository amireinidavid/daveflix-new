import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./Routes/UserRouter.js";
import { errorHandling } from "./middlewares/errorsMiddlewares.js";
import moviesRouter from "./Routes/MoviesRouter.js";
import categoriesRouter from "./Routes/CategoriesRouter.js";
import Uploadrouter from "./Controllers/UploadFile.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// connect mongodb
connectDB();
// main router
app.get("/", (req, res) => {
  res.send("API is running... Daveflix rules");
});

// Public router

app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/upload", Uploadrouter);

// error handling

app.use(errorHandling);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
