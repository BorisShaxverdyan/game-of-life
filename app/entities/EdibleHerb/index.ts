import { EntityType, matrix } from "../../../globals";

export default class EdibleHerb {
	public x: number;
	public y: number;
	public type: EntityType;
	public indexes: number[];
	public life: number;
	public level: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.type = EntityType.Ground;
		this.indexes = [40, 41, 42, 43, 44];
		this.life = 0;
		this.level = 0;
	}

	public grow = () => {
		this.life++;

		if (this.life % 4 === 0 && this.level < this.indexes.length - 1) {
			this.level++;

			matrix[this.y][this.x][this.type] = this.indexes[this.level];
		}
	};
}
