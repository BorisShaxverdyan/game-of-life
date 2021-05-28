import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { app, generateMatrix, matrix, setInitialEntities, updateEntities } from "./globals";
import { config } from "./helpers";

app.init();

// #region server stuff
const port = config("app.port");

const appServer = express();
const server = http.createServer(appServer);

appServer.use(express.static("public"));

appServer.get("/", ({ res }) => res.sendFile(__dirname + "/public/index.html"));

server.listen(port, () => console.log(`Application url: http://localhost:${port}/\n`));
// #endregion

// #region game
generateMatrix(config("game.matrix.width"), config("game.matrix.height"));

setInitialEntities({
	grass: 50,
	sheep: 10,
	wolf: 2,
	edibleHerb: 0,
	human: 2,
});

// #region socket connection
const io = new Server(server);

io.on("connection", socket => {
	console.log("connected: ", socket.id);

	setInterval(() => {
		updateEntities();

		socket.emit("data", {
			matrix,
		});
	}, config("app.frame"));
});
// #endregion
// #endregion
