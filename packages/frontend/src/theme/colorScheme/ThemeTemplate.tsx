interface MainComponentColors {
	bodyColor: string;
	componentColor: string;
	linkColor: string;
	textColor: string;
	toggleBorder: string;
}

interface TextFieldColors {
	fieldColor: string;
	textColor: string;
	border: string;
}

interface Accents {
	mainAccent: string;
	secondaryAccent: string;
}

export interface ColorTheme {
	main: MainComponentColors;
	textFields: TextFieldColors;
	accents: Accents;
}
