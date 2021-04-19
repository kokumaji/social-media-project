declare module "flakeid" {
	interface GeneratorOptions {
		mid: number;
		timeOffset: number;
	}

	export default class FlakeId {
		constructor(options?: Partial<GeneratorOptions>);
		gen(): string;
	}
}
