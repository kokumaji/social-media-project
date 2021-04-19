const { resolve } = require("path"),
	webpack = require("webpack"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// infer environment from process.env
if (process.env.NODE_ENV === undefined) {
	console.log("\n'NODE_ENV' is undefined - falling back to 'development'.\n");
	process.env.NODE_ENV = "development";
}

module.exports = {
	context: resolve(__dirname, "../src"),

	resolve: {
		alias: {
			assets: resolve(__dirname, "../src/assets/")
		},
		extensions: [".ts", ".tsx", ".js", ".json"]
	},

	devServer: {
		proxy: {
			"/api": {
				target: {
					host: "0.0.0.0",
					protocol: "http:",
					port: 8080
				},
				pathRewrite: {
					"^/api": ""
				}
			}
		}
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(__dirname, "../src/index.html"),
			title: "webpack-eslint-config",
			filename: resolve(__dirname, "../dist/index.html")
		}),

		new webpack.DefinePlugin(require("./env")),
		new ForkTsCheckerWebpackPlugin({
			typescript: { configFile: `${__dirname}/../tsconfig.json` }
		})
	],

	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				use: ["babel-loader", "source-map-loader"],
				exclude: /node_modules/
			},
			{
				test: /\.(le|c)ss$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "less-loader",
						options: {
							javascriptEnabled: true
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: "url-loader"
			},
			{
				test: /\.svg$/,
				loader: "@svgr/webpack"
			}
		]
	}
};
