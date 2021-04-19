module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ["./tsconfig.json"]
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"prettier"
	],

	rules: {
		"@typescript-eslint/explicit-module-boundary-types": "off"
	}
};
