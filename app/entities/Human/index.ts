import { random } from "./../../../helpers";
import { edibleHerbArr, EntityType, grassArr, humanArr, matrix, sheepArr } from "../../../globals";
import * as _ from "lodash";
import Grass from "../Grass";
import EdibleHerb from "../EdibleHerb";
import AbstractEntity from "../AbstractEntity";
import { ChooseCellItem } from "../AbstractEntity/types";

export default class Human extends AbstractEntity {
	private _health: number;
	public hunger: number;
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
		super(x, y, EntityType.Animal, 5);

		this.hunger = 50;
		this.health = 100;
		this.pocketGrass = [];
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

	protected chooseCell = (index: number | number[], type?: EntityType) => {
		this.getNewCoordinates();

		return super.chooseCell(index, type);
	};

	public multiply = () => {
		const newCell: ChooseCellItem | null = random(this.chooseCell(0));

		if (newCell && this.hunger >= 80 && this.health === 100) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[newY][newX][this.type] = this.index;

			humanArr.push(new Human(newX, newY));

			this.hunger = 30;
			this.health -= 20;
		}

		return this;
	};

	public move = () => {
		const newCell: ChooseCellItem | null = random(this.chooseCell(0));

		if (newCell) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[this.y][this.x][this.type] = 0;
			matrix[newY][newX][this.type] = this.index;

			this.x = newX;
			this.y = newY;
			this.hunger--;
		}

		return this;
	};

	public die = () => {
		if (this.hunger <= 0) {
			this.health -= 20;
		}

		if (this.health <= 0) {
			matrix[this.y][this.x][this.type] = 0;

			_.remove(humanArr, human => this.x === human.x && this.y === human.y);
		}

		return this;
	};

	public collectGrass = () => {
		const newCell: ChooseCellItem | null = random(this.chooseCell(1, EntityType.Ground));

		if (newCell && this.pocketGrass.length < 5) {
			const newX = newCell[0];
			const newY = newCell[1];

			// FIXME: Only collect grass under human.
			matrix[this.y][this.x][this.type] = 0;
			matrix[newY][newX][this.type] = this.index;

			this.pocketGrass.push(1);

			_.remove(grassArr, grass => newX === grass.x && newY === grass.y);

			this.x = newX;
			this.y = newY;

			this.hunger--;
		}

		return this;
	};

	public plantASeed = () => {
		const newCell: ChooseCellItem | null = random(this.chooseCell(0, EntityType.Ground));

		if (newCell && this.pocketGrass.length >= 3) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[newY][newX][EntityType.Ground] = 40;

			edibleHerbArr.push(new EdibleHerb(newX, newY));

			this.pocketGrass.splice(0, 3);
		} else {
			this.collectGrass();
		}

		return this;
	};

	public eat = () => {
		const newCell: ChooseCellItem | null = random(this.chooseCell([41, 42, 43, 44], EntityType.Ground).concat(this.chooseCell(2)));

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
				default:
					this.plantASeed();
			}

			matrix[this.y][this.x][this.type] = 0;
			matrix[newY][newX][this.type] = this.index;

			this.x = newX;
			this.y = newY;
		}

		if (this.hunger >= 90 && this.health < 100) {
			this.health += 20;
		}

		return this;
	};
}
