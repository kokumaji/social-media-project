const EPOCH = 1577836800000;
let INCREMENT = 0;

/**
 * Generates a Discord snowflake.
 * <info>This hardcodes the worker ID as 1 and the process ID as 0.</info>
 * @param timestamp Timestamp or date of the snowflake to generate
 * @returns The generated snowflake
 */
export const generate = (timestamp: number | Date = Date.now()) => {
	if (timestamp instanceof Date) timestamp = timestamp.getTime();
	if (typeof timestamp !== "number" || isNaN(timestamp)) {
		throw new TypeError(
			`"timestamp" argument must be a number (received ${
				isNaN(timestamp) ? "NaN" : typeof timestamp
			})`
		);
	}
	if (INCREMENT >= 4095) INCREMENT = 0;
	// eslint-disable-next-line max-len
	const BINARY = `${(timestamp - EPOCH)
		.toString(2)
		.padStart(42, "0")}0000100000${(INCREMENT++)
		.toString(2)
		.padStart(12, "0")}`;
	return binaryToID(BINARY);
};

/**
 * Deconstructs a Discord snowflake.
 * @param snowflake Snowflake to deconstruct
 * @returns Deconstructed snowflake
 */
export const deconstruct = (snowflake: string) => {
	const BINARY = idToBinary(snowflake).padStart(64, "0");
	const res = {
		timestamp: parseInt(BINARY.substring(0, 42), 2) + EPOCH,
		workerID: parseInt(BINARY.substring(42, 47), 2),
		processID: parseInt(BINARY.substring(47, 52), 2),
		increment: parseInt(BINARY.substring(52, 64), 2),
		binary: BINARY,
	};
	Object.defineProperty(res, "date", {
		get: function get() {
			return new Date(this.timestamp);
		},
		enumerable: true,
	});
	return res;
};

/**
 * Transforms a snowflake from a decimal string to a bit string.
 * @param num Snowflake to be transformed
 * @returns binary
 * @private
 */
const idToBinary = (num: string) => {
	let bin = "";
	let high = parseInt(num.slice(0, -10)) || 0;
	let low = parseInt(num.slice(-10));
	while (low > 0 || high > 0) {
		bin = String(low & 1) + bin;
		low = Math.floor(low / 2);
		if (high > 0) {
			low += 5000000000 * (high % 2);
			high = Math.floor(high / 2);
		}
	}
	return bin;
};

/**
 * Transforms a snowflake from a bit string to a decimal string.
 * @param num Bit string to be transformed
 * @returns A snowflake
 * @private
 */
const binaryToID = (num: string) => {
	let dec = "";

	while (num.length > 50) {
		const high = parseInt(num.slice(0, -32), 2);
		const low = parseInt((high % 10).toString(2) + num.slice(-32), 2);

		dec = (low % 10).toString() + dec;
		num =
			Math.floor(high / 10).toString(2) +
			Math.floor(low / 10)
				.toString(2)
				.padStart(32, "0");
	}

	let int = parseInt(num, 2);
	while (int > 0) {
		dec = (int % 10).toString() + dec;
		int = Math.floor(int / 10);
	}

	return dec;
};
