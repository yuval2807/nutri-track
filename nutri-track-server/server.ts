import express, { Express } from "express";
import postRoutes from "./src/routes/post";
import commentRoutes from "./src/routes/comment";
import userRoutes from "./src/routes/user";
import authRoutes from "./src/routes/auth";
import aiRoutes from "./src/routes/aiSuggestion";
import likeRoutes from "./src/routes/like";
import imageRoutes from "./src/routes/imageServer";
import connectToDatabase from "./src/config/db";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";
import mongoose from "mongoose";
import { errorHandler } from "./src/middleware/errorHandler";
const path = require("path");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web dev 2024 api",
      description: "Blog API Information",
      version: "1.0.0",
      contact: {
        name: "Amazing Developer",
      },
      servers: [{ url: "http://localhost:" + process.env.PORT }],
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;
app.use(cors({ origin: "http://localhost:3000" }));

connectToDatabase();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/ai", aiRoutes);
app.use("/like", likeRoutes);
app.use("/public", express.static("public"));
app.use("/image", imageRoutes);

app.use(errorHandler);
app.use(express.static("front"));

//app.use(express.static(path.join("nutri-track-server", 'front')));

app.get("*", (req, res) => {
  res.sendFile(path.join("front", "index.html"));
});

const initApp = () => {
  return new Promise<Express>(async (resolve, reject) => {
    if (process.env.DB_CONNECTION == undefined) {
      reject("DB_CONNECTION is not defined");
    } else {
      await mongoose.connect(process.env.DB_CONNECTION);
      resolve(app);
    }
  });
};

export default initApp;
