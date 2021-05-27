import { random } from "./../../../helpers";
import { edibleHerbArr, grassArr, humanArr, matrix, sheepArr } from "../../../globals";
import * as _ from "lodash";
import Grass from "../Grass";
import EdibleHerb from "../EdibleHerb";

export default class Human {
	public x: number;
	public y: number;
	public index: number;
	private _health: number;
	public hunger: number;
	public directions: [number, number][];
	public pocketGrass: number[];

	public get health() {
		return this._health;
	}

	public set health(value) {
		if (value > 100) {
			this._health = 100;
		} else {
			this._health = value;
		}
	}

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.index = 5;
		this.hunger = 50;
		this.health = 100;
		this.pocketGrass = [];

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
		const newCell: [number, number, number] | null = random(this.chooseCell(0));

		if (newCell && this.hunger >= 80 && this.health === 100) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[newY][newX] = this.index;

			humanArr.push(new Human(newX, newY));

			this.hunger = 30;
			this.health -= 20;
		}
	};

	public move = () => {
		const newCell: [number, number, number] | null = random(this.chooseCell(0));

		if (newCell) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[this.y][this.x] = 0;
			matrix[newY][newX] = this.index;

			this.x = newX;
			this.y = newY;
			this.hunger--;
		}
	};

	public die = () => {
		if (this.hunger <= 0) {
			this.health -= 20;
		}

		if (this.health <= 0) {
			matrix[this.y][this.x] = 0;

			_.remove(humanArr, human => this.x === human.x && this.y === human.y);
		}
	};

	public collectGrass = () => {
		const newCell: [number, number, number] | null = random(this.chooseCell(1));

		if (newCell && this.pocketGrass.length < 5) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[this.y][this.x] = 0;
			matrix[newY][newX] = this.index;

			this.pocketGrass.push(1);
			_.remove(grassArr, grass => newX === grass.x && newY === grass.y);

            this.x = newX;
            this.y = newY;

			this.hunger -= 3;
		}
	};

	public plantASeed = () => {
		const newCell: [number, number, number] | null = random(this.chooseCell(0));

		if (newCell && this.pocketGrass.length > 3) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[newY][newX] = 40;

			edibleHerbArr.push(new EdibleHerb(newX, newY));

            this.pocketGrass.splice(0, 3);
		} else {
            this.collectGrass();
        }
	};

	public eat = () => {
		const newCell: [number, number, number] | null = random(this.chooseCell([2, 41, 42, 43, 44]));

		if (newCell && this.hunger < 70) {
			const newX = newCell[0];
			const newY = newCell[1];
			const foodIndex = newCell[2];

			switch (foodIndex) {
				case 2:
					this.hunger = 100;
					_.remove(sheepArr, sheep => newX === sheep.x && newY === sheep.y);
					break;
				case 41:
					this.hunger += 3;
					_.remove(edibleHerbArr, edibleHerb => newX === edibleHerb.x && newY === edibleHerb.y);
					break;
				case 42:
					this.hunger += 5;
					_.remove(edibleHerbArr, edibleHerb => newX === edibleHerb.x && newY === edibleHerb.y);
					break;
				case 43:
					this.hunger += 10;
					_.remove(edibleHerbArr, edibleHerb => newX === edibleHerb.x && newY === edibleHerb.y);
					break;
				case 44:
					this.hunger += 15;
					_.remove(edibleHerbArr, edibleHerb => newX === edibleHerb.x && newY === edibleHerb.y);
					break;
			}

			matrix[this.y][this.x] = 0;
			matrix[newY][newX] = this.index;

			this.x = newX;
			this.y = newY;

			if (this.hunger < 100) {
				this.plantASeed();
			}
		}

		if (this.hunger >= 90 && this.health < 100) {
			this.health += 20;
		}
	};
}
