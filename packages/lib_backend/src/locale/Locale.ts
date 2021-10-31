import YAML from "yaml";
import * as fs from "fs";

export default class LocaleFile {
	private data: YAML.Document.Parsed;
	private vars: YAML.Document.Parsed;

	constructor() {
		const langFile = fs.readFileSync(__dirname + "/data/locale.en_US.yml", "utf8");
		this.data = YAML.parseDocument(langFile);

		const varFile = fs.readFileSync(__dirname + "/data/variables.en_US.yml", "utf8");
		this.vars = YAML.parseDocument(varFile);
	}

	getLocale(key: string) {
		return this.data.get(key);
	}

	getVariable(key: string) {
		return this.vars.get(key);
	}
}
