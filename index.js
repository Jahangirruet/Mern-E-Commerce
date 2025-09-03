import express from "express";

const app = express();
//const port = 3000;
import { PORT } from "./src/config/config.js";

const port = PORT;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${port}`);
})