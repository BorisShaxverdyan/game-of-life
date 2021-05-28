export type ResolverFunctionType = <T = any>(config: T) => any;

export type ResolversType = {
	configs: [string, ResolverFunctionType][];
};
