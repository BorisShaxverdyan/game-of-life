import App from "./app/App";
import EdibleHerb from "./app/entities/EdibleHerb";
import Grass from "./app/entities/Grass";
import Human from "./app/entities/Human";
import Sheep from "./app/entities/Sheep";
import Wolf from "./app/entities/Wolf";
import { random } from "./helpers";

export const app = new App();

export type MatrixType = [number, number][][];

export enum EntityType {
	Ground,
	Animal,
}

export const matrix: MatrixType = [];
export const grassArr: Grass[] = [];
export const sheepArr: Sheep[] = [];
export const wolfArr: Wolf[] = [];
export const edibleHerbArr: EdibleHerb[] = [];
export const humanArr: Human[] = [];

export const generateMatrix = (width: number, height: number): MatrixType => {
	for (let y: number = 0; y < height; y++) {
		matrix[y] = [];

		for (let x: number = 0; x < width; x++) {
			matrix[y][x] = [0, 0];
		}
	}

	return matrix;
};

export const setRandom = (type: EntityType, value: number): [number, number, EntityType] => {
	let isSetted = false;

	let x: number;
	let y: number;

	while (!isSetted) {
		x = random(matrix[0].length - 1);
		y = random(matrix.length - 1);

		if (matrix[y][x][type] === 0) {
			matrix[y][x][type] = value;

			isSetted = true;
		}
	}

	return [x, y, type];
};

type CountsType = {
	grass: number;
	sheep: number;
	wolf: number;
	edibleHerb: number;
	human: number;
};

export const setInitialEntities = (counts: CountsType) => {
	while (counts.grass) {
		let coords = setRandom(EntityType.Ground, 1);

		grassArr.push(new Grass(coords[0], coords[1]));

		counts.grass--;
	}

	while (counts.sheep) {
		let coords = setRandom(EntityType.Animal, 2);
		sheepArr.push(new Sheep(coords[0], coords[1]));
		counts.sheep--;
	}

	while (counts.wolf) {
		let coords = setRandom(EntityType.Animal, 3);
		wolfArr.push(new Wolf(coords[0], coords[1]));
		counts.wolf--;
	}

	while (counts.edibleHerb) {
		let coords = setRandom(EntityType.Ground, 40);
		edibleHerbArr.push(new EdibleHerb(coords[0], coords[1]));
		counts.edibleHerb--;
	}

	while (counts.human) {
		let coords = setRandom(EntityType.Animal, 5);
		humanArr.push(new Human(coords[0], coords[1]));
		counts.human--;
	}
};

export const updateEntities = () => {
	grassArr.map(grass => grass.multiply());

	sheepArr.map(sheep => sheep.move().eat().multiply().die());

	wolfArr.map(wolf => wolf.move().eat().multiply().die());

	edibleHerbArr.map(edibleHerb => edibleHerb.grow());

	humanArr.map(human => human.eat().move().plantASeed().multiply().die());
};
