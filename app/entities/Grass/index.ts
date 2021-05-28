import { EntityType, grassArr, matrix } from "../../../globals";
import AbstractEntity from "../AbstractEntity";
import { ChooseCellItem } from "../AbstractEntity/types";
import { random } from "./../../../helpers";

export default class Grass extends AbstractEntity {
	public energy: number;

	constructor(x: number, y: number) {
		super(x, y, EntityType.Ground, 1);

		this.energy = 0;
	}

	public multiply = () => {
		this.energy++;

		const newCell: ChooseCellItem | null = random(this.chooseCell(0));

		if (newCell && this.energy >= 4) {
			const newX = newCell[0];
			const newY = newCell[1];

			matrix[newY][newX][this.type] = this.index;

			grassArr.push(new Grass(newX, newY));

			this.energy = 0;
		}
	};
}
