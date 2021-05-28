import * as _ from "lodash";
import { matrix, sheepArr, grassArr, edibleHerbArr, EntityType } from "../../../globals";
import AbstractEntity from "../AbstractEntity";
import { ChooseCellItem } from "../AbstractEntity/types";
import { random } from "./../../../helpers";

export default class Sheep extends AbstractEntity {
	public energy: number;

	constructor(x: number, y: number) {
		super(x, y, EntityType.Animal, 2);

		this.energy = 30;
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

		if (newCell && this.energy >= 60) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[newY][newX][this.type] = this.index;

			sheepArr.push(new Sheep(newX, newY));

			this.energy = 20;
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
			this.energy--;
		}

		return this;
	};

	public die = () => {
		if (this.energy <= 0) {
			matrix[this.y][this.x][this.type] = 0;

			_.remove(sheepArr, sheep => this.x === sheep.x && this.y === sheep.y);
		}

		return this;
	};

	public eat = () => {
		const newCell: ChooseCellItem | null = random(this.chooseCell([1, 40, 41, 42, 43, 44], EntityType.Ground));

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

			matrix[this.y][this.x][this.type] = 0;
			matrix[newY][newX][this.type] = this.index;

			this.x = newX;
			this.y = newY;
		}

		return this;
	};
}
