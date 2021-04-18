import * as React from "react";
import styled from "styled-components";

import { darkTheme } from "../../theme/colorScheme/main";

const fieldHeight = "3.5em";
const fieldWidth = "80%";
const fieldBorder = "border-radius:0.25em;border-style:none;";
const fieldFont = "font-size: 0.85em;";
const fieldFocus = ":focus { background-color: #4b4b4b; outline: none; }";

const fixPlaceholder = `
    ::placeholder {
        color: white;
    }
`;

export const InputField = styled.input`
	${fieldBorder}
	color:${darkTheme.text};
	background-color: #2b2b2b;
	width: ${fieldWidth};
	height: ${fieldHeight};
	padding: 1em;
	margin: 1.5em;
	${fieldFont}

	${fixPlaceholder}

	${fieldFocus}
`;

export const Error = styled.label`
	margin-bottom: 0.5em;
	display: block;
	font-size: 0.75em;
	color: red;
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
	background-color: #2b2b2b;
	width: 100%;
	height: ${fieldHeight};
	padding: 1em;
	margin: 0px;
	${fieldFont}

	${fixPlaceholder}

	${fieldFocus}
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

export const FieldLabel = styled.label`
	margin-top: 1.75em;
`;

export const Spacer = styled.span`
	height: 100%;
	width: 1em;
`;

export const HideSensitive = styled.button`
	position: absolute;

	border: 0px; 
	border-radius: 0px;
	
	border-left: 1px solid ${darkTheme.body};

	cursor: pointer; 
	color: white; 
	background-color: rgba(0,0,0,0); 
	
	top: 20%;
	right: 8px;
	z-index: 2; 
`;
