import Grass from "./app/entities/Grass";

export type MatrixType = number[][];

export const matrix: MatrixType = [];

export const generateMatrix = (width: number, height: number): MatrixType => {
	for (let y: number = 0; y < height; y++) {
		matrix[y] = [];

		for (let x: number = 0; x < width; x++) {
			matrix[y][x] = 0;
		}
	}

	return matrix;
};

export const grassArr: Grass[] = [];
