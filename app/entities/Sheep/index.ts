import * as _ from "lodash";
import { matrix, sheepArr, grassArr, edibleHerbArr } from "../../../globals";
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

	private chooseCell = (index: number | number[]) => {
		this.getNewCoordinates();

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
		const newCell: [number, number, number] | null = random(this.chooseCell([1, 40, 41, 42, 43, 44]));

		if (newCell) {
			const newX = newCell[0];
			const newY = newCell[1];
			const foodIndex = newCell[2];

			switch (foodIndex) {
				case 1:
					this.energy += 4;
					_.remove(grassArr, grass => newX === grass.x && newY === grass.y);
					break;
				case 40:
					this.energy += 1;
					_.remove(edibleHerbArr, edibleHerb => newX === edibleHerb.x && newY === edibleHerb.y);
					break;
				case 41:
					this.energy += 3;
					_.remove(edibleHerbArr, edibleHerb => newX === edibleHerb.x && newY === edibleHerb.y);
					break;
				case 42:
					this.energy += 5;
					_.remove(edibleHerbArr, edibleHerb => newX === edibleHerb.x && newY === edibleHerb.y);
					break;
				case 43:
					this.energy += 10;
					_.remove(edibleHerbArr, edibleHerb => newX === edibleHerb.x && newY === edibleHerb.y);
					break;
				case 44:
					this.energy += 15;
					_.remove(edibleHerbArr, edibleHerb => newX === edibleHerb.x && newY === edibleHerb.y);
					break;
			}

			matrix[this.y][this.x] = 0;
			matrix[newY][newX] = this.index;

			this.x = newX;
			this.y = newY;
		}
	};
}
