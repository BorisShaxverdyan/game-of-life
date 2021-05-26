import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";

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

// #region socket connection
const io = new Server(server);

io.on("connection", socket => {
	console.log("connected: ", socket.id);

	setInterval(() => {
		// socket.emit("data", {
		// });
	}, 1000);
});
// #endregion
