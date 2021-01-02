import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import { fullUrl } from "./utils.js"
import userRouter from "./routers/user.router.js"

const hostname = "0.0.0.0";
const port = 80;

mongoose
  .connect(
    `mongodb://mongo/${process.env.MONGO_DATABASE}`,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())

app.use('/api', userRouter)

app.all("*", (req, res) => {
    if (req.accepts('json')) {
        res.status(404);
        res.json({
            message: `${req.method}: ${fullUrl(req)} not found!`
        });
    } else {
        res.status(404);
        res.type('txt').send('Not found');
    }
});

app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});
