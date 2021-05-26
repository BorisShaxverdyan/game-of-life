import { grassArr, matrix } from "../../../globals";
import { random } from "./../../../helpers";

export default class Grass {
	private x: number;
	private y: number;
	private index: number;
	private energy: number;
	private directions: [number, number][];

	constructor(x: number, y: number) {
		this.x = x;
		this.y = x;
		this.index = 1;
		this.energy = 0;

		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1],
		];
	}

	private chooseCell = (index: number) => {
		const found = [];

		for (let i in this.directions) {
			let x = this.directions[i][0];
			let y = this.directions[i][1];

			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == index) {
					found.push(this.directions[i]);
				}
			}
		}

		return found;
	};

	public multiply = () => {
		this.energy++;

		const newCell: [number, number] | null = random(this.chooseCell(0));

		if (newCell && this.energy >= 4) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[newY][newX] = this.index;

			grassArr.push(new Grass(newX, newY));

			this.energy = 0;
		}
	};
}
