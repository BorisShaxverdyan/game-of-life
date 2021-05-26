import Grass from "./app/entities/Grass";
import { random } from "./helpers";

export type MatrixType = number[][];

export const matrix: MatrixType = [];
export const grassArr: Grass[] = [];

export const generateMatrix = (width: number, height: number): MatrixType => {
	for (let y: number = 0; y < height; y++) {
		matrix[y] = [];

		for (let x: number = 0; x < width; x++) {
			matrix[y][x] = 0;
		}
	}

	return matrix;
};

export const setRandom = (value: number): [number, number] => {
	let isSetted = false;

	let x: number;
	let y: number;

	while (!isSetted) {
		x = random(matrix[0].length - 1);
		y = random(matrix.length - 1);

		if (matrix[y][x] === 0) {
			matrix[y][x] = value;

			isSetted = true;
		}
	}

	return [x, y];
};

export const setInitialEntities = (grassCount: number) => {
	while (grassCount) {
		let coords = setRandom(1);
		grassArr.push(new Grass(...coords));
		grassCount--;
	}
};

export const updateEntities = () => {
	grassArr.map(grass => {
		grass.multiply();
	});
};
