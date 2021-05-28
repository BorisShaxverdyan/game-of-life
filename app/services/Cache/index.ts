export default class Cache<T = any> {
	private static global: Map<string, Map<string, any>> = new Map();

	private local: Map<string, T>;

	constructor(key: string) {
		Cache.global.set(key, new Map());

		this.local = Cache.global.get(key);
	}

	/**
	 * Get item from cache by key.
	 */
	public get = (key: string) => this.local.get(key);

	/**
	 * Set item to cache.
	 */
	public set = (key: string, value: any) => this.local.set(key, value);

	/**
	 * Clear cache.
	 */
	public clear = () => this.local.clear();

	/**
	 * Remove item from cache by key.
	 */
	public delete = (key: string) => this.local.delete(key);

	/**
	 * Check that item with that key is exist.
	 */
	public has = (key: string) => this.local.has(key);

	/**
	 * Clear all cache.
	 */
	public static clear = () => Cache.global.clear();
}
