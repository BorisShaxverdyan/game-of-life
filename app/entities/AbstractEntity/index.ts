import * as _ from "lodash";
import { matrix } from "../../../globals";

export default abstract class AbstractEntity {
	public x: number;
	public y: number;
	public index: number;
	public directions: [number, number][];

	constructor(x: number, y: number, index: number) {
		this.x = x;
		this.y = y;
		this.index = index;

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

	protected chooseCell(index: number | number[]) {
		const found = [];

		for (let i in this.directions) {
			let x = this.directions[i][0];
			let y = this.directions[i][1];

			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if ((Array.isArray(index) && _.includes(index, matrix[y][x])) || (!Array.isArray(index) && matrix[y][x] === index)) {
					found.push(this.directions[i].concat(matrix[y][x]));
				}
			}
		}

		return found;
	}
}
