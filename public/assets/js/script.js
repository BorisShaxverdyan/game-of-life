/// <reference path="./../p5/p5.global.d.ts" />

const socket = io();

function setup() {
	noStroke();

	const side = 30;
	const backgroundColor = "#acacac";

	socket.on("data", data => {
		const matrix = data.matrix;

		// console.log(matrix);

		createCanvas(matrix[0].length * side, matrix.length * side);
		background(backgroundColor);

		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {
				for (let k = 0; k < matrix[j].length; k++) {
					if (k === 0) {
						switch (matrix[i][j][0]) {
							case 1:
								fill("green");
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

						noStroke();
						rect(j * side, i * side, side, side);
					}

					if (k === 1) {
						switch (matrix[i][j][1]) {
							case 2:
								fill("white");
								break;
							case 3:
								fill(114, 140, 242);
								break;
							case 5:
								fill(240, 213, 79);
								break;
							default:
								continue;
						}

						stroke(1);
						ellipse(j * side + (side / 2), i * side + (side / 2), side, side);
					}
				}
			}
		}
	});
}
