import express from "express";
import cors from "cors";
import * as testController from  "./controllers/testController";
var genreRoutes = require('./routers/genreRouter')
var recommendationRoutes = require('./routers/recommendationRouter')


const app = express();
app.use(cors());
app.use(express.json());

app.use("/genres", genreRoutes);
app.use("/recommendations", recommendationRoutes);

app.get("/test", testController.test);

export default app;
