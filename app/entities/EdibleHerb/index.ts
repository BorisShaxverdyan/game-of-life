import { matrix } from "../../../globals";

export default class EdibleHerb {
	public x: number;
	public y: number;
	public indexes: number[];
	public life: number;
	public level: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.indexes = [40, 41, 42, 43, 44];
		this.life = 0;
		this.level = 0;
	}

	public grow = () => {
		this.life++;

		if (this.life % 10 === 0 && this.level < this.indexes.length - 1) {
            this.level++;
            
            console.log("entered", this.life, this.level, this.indexes[this.level]);
			matrix[this.y][this.x] = this.indexes[this.level];
		}
	};
}
