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
				if (matrix[i][j] === 1) {
					fill("green");
				} else if (matrix[i][j] === 2) {
					fill("yellow");
				} else if (matrix[i][j] === 3) {
					fill("red");
				} else {
					fill(backgroundColor);
				}

				rect(j * side, i * side, side, side);
			}
		}
	});
}
