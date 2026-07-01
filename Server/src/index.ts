import express, { type Request, type Response } from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import authroutes from "./Routes/auth.routes.js";
import snippetRoutes from "./Routes/snippet.routes.js";
import GoogleRoutes from "./Routes/google.route.js";
import passport from "./config/Passport.js";




connectDB();

const app = express();
const port = process.env.PORT ?? 5000;
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. https://your-frontend.onrender.com
    credentials: true, // needed if you're using cookies for JWT/session
  }),
);
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use('/api/auth',authroutes);
app.use("/api/snippets", snippetRoutes);
app.use("/api/auth", GoogleRoutes);

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
