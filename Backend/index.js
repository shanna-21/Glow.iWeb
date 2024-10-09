import express from "express"; 
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";

const app = express();
const port = 3002;

const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); 


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log("Server running on port " + port); 
});
