import express from "express";
import cors from "cors";
import router from "./router";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
