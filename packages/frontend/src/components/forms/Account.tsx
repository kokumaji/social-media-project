import * as React from "react";
import styled from "styled-components";

import { darkTheme } from "../../theme/colorScheme/main";

const fieldHeight = "4em";
const fieldWidth = "80%";
const fieldBorder = "border-radius:1em;border-style:none;";

const fixPlaceholder = `
    ::placeholder {
        color: white;
    }
`;

export const InputField = styled.input`
	${fieldBorder}
	color:${darkTheme.text};
	background-color: #4f6675;
	width: ${fieldWidth};
	height: ${fieldHeight};
	padding: 1em;
	margin: 1.75em;

	${fixPlaceholder}
`;

export const Error = styled.div`
	position: absolute;
	height: 3em;
	width: 90%;
	background-color: #ffb5b5;
	color: #ff3d3d;
	border-radius: 0.35em;
	padding: 1em;
	top: 10px;
	border-style: solid;
	border-width: 1px;
`;

export const ConfirmButton = styled.button`
	${fieldBorder}
	background-color:${darkTheme.body};
	color: ${darkTheme.text};
	text-transform: uppercase;
	border-style: none;
	width: ${fieldWidth};
	height: ${fieldHeight};
	margin-top: 1em;
	letter-spacing: 0.25em;
	cursor: pointer;

	:hover {
		background-color: #2c3f4d;
		transition: 0.2s;
	}
`;

export const PasswordField = styled.input`
	${fieldBorder}
	color:${darkTheme.text};
	background-color: #4f6675;
	width: 100%;
	height: ${fieldHeight};
	padding: 1em;
	margin: 0px;

	${fixPlaceholder}
`;

export const FieldRow = styled.div`
	display: flex;
	flex-direction: row;
	width: 80%;
	position: relative;

	input {
		margin: 0;
		margin-bottom: 1.75em;
	}
`;

export const Spacer = styled.span`
	height: 100%;
	width: 1em;
`;

export const HideSensitive = styled.button`
	min-width: 20%;
	position: absolute;
	border-radius: 5px;
	z-index: 2;
	border: none;
	cursor: pointer;
	color: white;
	background-color: rgba(0, 0, 0, 0);
	right: 0;
	height: 70%;
`;
