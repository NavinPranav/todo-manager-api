import express from "express";
import router from "./routes/task";

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const port = 8080;

app.use('/api', router);

app.listen(port, () => {
    console.log(`\n\n Application listening at http://localhost:${port}\n\n`);
});
