import React from "react";

import FavoriteDefault from "../../assets/icons/favorite_default.png";
import FavoriteActive from "../../assets/icons/favorite_active.png";

import ReplyDefault from "../../assets/icons/reply_default.png";

interface Icon {
	name: string;
}

/* create a function that will pick which icon to use */
const pickIcon = (name: string) => {
	switch (name) {
		case "reply":
			return ReplyDefault;
		case "favorite":
			return FavoriteDefault;
		case "favorite_active":
			return FavoriteActive;
		default:
			throw new Error("No Icon For: " + name);
	}
};

/* pass the name & fill props (that we will specify in our 
other components) to Icon to pick the right icon */
export const Icon: React.FC<{ name: string }> = ({ name }) => {
	const ico = pickIcon(name);
	return (
		<img src={ico} />
		//<SVG fill={fill}/>
	);
};
