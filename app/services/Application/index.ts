import Config from "../Config";
import { ResolverFunctionType, ResolversType } from "./types";

export default abstract class Application {
	abstract configs: string[];

	private resolvers: ResolversType = {
		configs: [],
	};

	abstract bootstrap(): void;

	public init = () => {
		this.bootstrap();

		Config.init(this.configs, this.resolvers.configs);
	};

	protected resolveConfig = (key: string, callback: ResolverFunctionType) => {
		this.resolvers.configs.push([key, callback]);
	};

	// protected resolveConfigs = () => {
	// 	this.configs.map(config => {
	// 		try {
	// 			let file = require(`./../../../config/${config}.json`);

	// 			Config.cache.set(config, file);
	// 		} catch (e) {
	// 			console.error("Config.init():", e);
	// 		}
	// 	});

	// 	return this.configs.find(config => config === key);
	// };
}
