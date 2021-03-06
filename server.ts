import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { generateMatrix, matrix, setInitialEntities, updateEntities } from "./globals";

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

// #region game
generateMatrix(25, 25);
setInitialEntities({
	grass: 50,
	sheep: 10,
	wolf: 2,
	edibleHerb: 0,
	human: 2
});
// #endregion

io.on("connection", socket => {
	console.log("connected: ", socket.id);

	setInterval(() => {
		updateEntities();

		socket.emit("data", {
			matrix,
		});
	}, 500);
});
// #endregion
