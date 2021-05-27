/// <reference path="./../p5/p5.global.d.ts" />

const socket = io();

function setup() {
	strokeWeight(1);

	const side = 30;
	const backgroundColor = "#acacac";

	socket.on("data", data => {
		const matrix = data.matrix;

		console.log(matrix);

		createCanvas(matrix[0].length * side, matrix.length * side);
		background(backgroundColor);

		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {
				switch (matrix[i][j]) {
					case 1:
						fill("green");
						break;
					case 2:
						fill("yellow");
						break;
					case 3:
						fill("red");
						break;
					case 40:
						fill(92, 247, 87);
						break;
					case 41:
						fill(30, 237, 24);
						break;
					case 42:
						fill(22, 173, 17);
						break;
					case 43:
						fill(15, 140, 11);
						break;
					case 44:
						fill(10, 94, 8);
						break;
					default:
						fill(backgroundColor);
				}

				rect(j * side, i * side, side, side);
			}
		}
	});
}
