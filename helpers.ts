import { random as randomLodash, sample } from "lodash";

/**
 * Get random integer from min to max - random(min, max)
 *
 * Get random integer from 0 to max - random(max)
 *
 * Get random item from array - random(Array)
 *
 * @throws Wrong arguments is given.
 */
export const random = (...args: Array<any>) => {
	if (typeof args[0] === "number" && typeof args[1] === "number") {
		return randomLodash(args[0], args[1]);
	} else if (typeof args[0] === "number") {
		return randomLodash(0, args[0]);
	} else if (Array.isArray(args[0])) {
		return sample(args[0]);
	}

	throw Error("Wrong arguments is given.");
};
