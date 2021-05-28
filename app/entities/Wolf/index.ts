import * as _ from "lodash";
import { EntityType, matrix, sheepArr, wolfArr } from "../../../globals";
import AbstractEntity from "../AbstractEntity";
import { ChooseCellItem } from "../AbstractEntity/types";
import { random } from "./../../../helpers";

export default class Wolf extends AbstractEntity {
	public energy: number;

	constructor(x: number, y: number) {
		super(x, y, EntityType.Animal, 3);
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

			wolfArr.push(new Wolf(newX, newY));

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

			_.remove(wolfArr, wolf => this.x === wolf.x && this.y === wolf.y);
		}

		return this;
	};

	public eat = () => {
		const newCell: ChooseCellItem | null = random(this.chooseCell(2));

		if (newCell) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[this.y][this.x][this.type] = 0;
			matrix[newY][newX][this.type] = this.index;

			_.remove(sheepArr, sheep => newX === sheep.x && newY === sheep.y);

			this.x = newX;
			this.y = newY;

			this.energy += 30;
		}

		return this;
	};
}
