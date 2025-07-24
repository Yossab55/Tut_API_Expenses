import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app = express();

app.listen(3000, () => {
  console.log(`server running on port: 3000`);
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.set("view engine", "ejs")
