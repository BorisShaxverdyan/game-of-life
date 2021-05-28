import { ResolverFunctionType } from "../Application/types";
import Cache from "../Cache";

export default class Config {
	private static cache: Cache = new Cache("configs");

	/**
	 * Initialize config files.
	 */
	public static init = (configs: string[], resolvers?: [string, ResolverFunctionType][]) => {
		configs.map(config => {
			try {
				let file = require(`./../../../config/${config}.json`);

				Config.cache.set(config, file);
			} catch (e) {
				console.error("Config.init():", e);
			}
		});

		if (resolvers) {
			resolvers.map(resolver => {
				let key = resolver[0];
				let callback = resolver[1];

				let config = Config.cache.get(key);

				if (!config) {
					return;
				}

				Config.cache.set(key, () => callback(config));
			});
		}
	};

	/**
	 * Get config value by key.
	 */
	public static get = (key: string): any => {
		if (Config.cache.has(key)) return Config.get(key);

		let segments = key.split(".");

		const path = segments[0];

		if (!Config.cache.has(path)) return null;

		segments = segments.slice(1);

		let config: any = Config.cache.get(path);

		let result: any = config;

		for (let segment of segments) {
			if (!(segment in result)) return null;

			result = result[segment];
		}

		return result;
	};

	/**
	 * Set config value by key.
	 */
	public static set = (key: string, value: any) => Config.cache.set(key, value);

	/**
	 * Clear config cache.
	 */
	public static clear = () => Config.cache.clear();
}
