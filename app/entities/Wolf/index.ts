import * as _ from "lodash";
import { matrix, sheepArr, wolfArr } from "../../../globals";
import { random } from "./../../../helpers";

export default class Wolf {
	public x: number;
	public y: number;
	public index: number;
	public energy: number;
	public directions: [number, number][];

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.index = 3;
		this.energy = 30;

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

	private getNewCoordinates = () => {
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
	};

	private chooseCell = (index: number) => {
		this.getNewCoordinates();

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
		const newCell: [number, number] | null = random(this.chooseCell(0));

		if (newCell && this.energy >= 60) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[newY][newX] = this.index;

			wolfArr.push(new Wolf(newX, newY));

			this.energy = 20;
		}

		return this;
	};

	public move = () => {
		const newCell: [number, number] | null = random(this.chooseCell(0));

		if (newCell) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[this.y][this.x] = 0;
			matrix[newY][newX] = this.index;

			this.x = newX;
			this.y = newY;
			this.energy--;
		}

		return this;
	};

	public die = () => {
		if (this.energy <= 0) {
			matrix[this.y][this.x] = 0;

			_.remove(wolfArr, wolf => this.x === wolf.x && this.y === wolf.y);
		}

		return this;
	};

	public eat = () => {
		const newCell: [number, number] | null = random(this.chooseCell(2));

		if (newCell) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[this.y][this.x] = 0;
			matrix[newY][newX] = this.index;

			_.remove(sheepArr, sheep => newX === sheep.x && newY === sheep.y);

			this.x = newX;
			this.y = newY;

			this.energy += 30;
		}

		return this;
	};
}
