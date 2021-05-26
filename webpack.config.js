const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "development",
	target: "node",
	entry: "./server.ts",
	output: {
		filename: "server.js",
		path: path.resolve(__dirname),
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
};
