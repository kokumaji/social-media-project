import React from "react";
import styled from "styled-components";
import { UserRole } from "../../api/models/user/UserRoles";
import { titleCase } from "../../api/StringUtils";
import { darkTheme } from "../../theme/colorScheme/colors";

const StaticLabel = styled.label`
	font-size: 0.8em;
	font-weight: bold;

	display: inline !important;

	padding: 0.1em 0.5em 0em 0.5em;

	${darkTheme.textFields.border}s
`;

interface BadgeColors {
	textColor: string;
	backgroundColor: string;
}

class Badge extends React.Component<{ content: string; colors?: BadgeColors }> {
	state = {
		defaultColor: {
			textColor: "#000",
			backgroundColor: "#FFF",
		},
	};

	render() {
		const colors: BadgeColors = this.props.colors ? this.props.colors : this.state.defaultColor;
		const badgeStyle = {
			color: colors.textColor,
			backgroundColor: colors.backgroundColor,
		};

		return <StaticLabel style={badgeStyle}>{this.props.content}</StaticLabel>;
	}
}

export const TestBadge = () => <Badge content="Admin" />;

export class RoleBadge extends React.Component<{ role?: UserRole }> {
	render() {
		if (this.props.role) return <Badge content={titleCase(this.props.role as UserRole)} />;
		return <></>;
	}
}
