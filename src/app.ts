import express from "express";
import cors from "cors";
import router from "./routes/task";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.listen(port, () => {
  console.log(`\n\n Application listening at http://localhost:${port}\n\n`);
});