import * as _ from "lodash";
import { matrix, sheepArr, grassArr } from "../../../globals";
import { random } from "./../../../helpers";

export default class Sheep {
	public x: number;
	public y: number;
	public index: number;
	public energy: number;
	public directions: [number, number][];

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.index = 2;
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

			sheepArr.push(new Sheep(newX, newY));

			this.energy = 20;
		}
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
	};

	public die = () => {
		if (this.energy <= 0) {
			matrix[this.y][this.x] = 0;

			_.remove(sheepArr, sheep => this.x === sheep.x && this.y === sheep.y);
		}
	};

	public eat = () => {
		const newCell: [number, number] | null = random(this.chooseCell(1));

		if (newCell) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[this.y][this.x] = 0;
			matrix[newY][newX] = this.index;

			_.remove(grassArr, grass => newX === grass.x && newY === grass.y);

			this.x = newX;
			this.y = newY;

			this.energy += 5;
		}
	};
}
