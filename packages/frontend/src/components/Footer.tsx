import * as React from "react";
import styled from "styled-components";
import { darkTheme } from "../theme/colorScheme/colors";

const FooterWrapper = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: ${darkTheme.main.componentColor};
	color: white;
	padding-left: 1em;
	font-size: 12px;

	a {
		color: white;
		text-decoration: none;
		font-weight: bold;
	}
`;

export const Footer = () => (
	<FooterWrapper>
		<p>
			<a href="https://github.com/kokumaji" target="_blank">Kokumaji</a> &copy; {new Date().getFullYear()}
		</p>
	</FooterWrapper>
);
