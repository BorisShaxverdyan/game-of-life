import * as express from "express";
import * as http from "http";

// #region Server stuff
const port = 3000;

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));

app.get("/", (req: any, res: any) => {
	res.sendFile(__dirname + "/public/index.html");
});

server.listen(port, function () {
	console.log(`Application url: http://localhost:${port}/\n`);
});
// #endregion
