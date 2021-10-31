import React from "react";
import styled from "styled-components";

import { User } from "../../api/models/user/User";
import { UserRole } from "../../api/models/user/UserRoles";
import { darkTheme } from "../../theme/colorScheme/colors";
import { getColorScheme } from "../../theme/colorScheme/profileCards";
import { UserData } from "../data/UserManager";
import { UserModel } from "../data/UserModel";
import { RoleBadge } from "../decoration/Labels";
import { NameComponent } from "./AccountName";

const MentionableContainer = styled.div`
	display: inline;

	> a:hover ~ div {
		cursor: pointer;
		opacity: 1;

		animation: makeVisible 0.2s ease-in;

		@keyframes makeVisible {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	}

	a:hover {
		background-color: ${darkTheme.textFields.fieldColor};
	}
`;

const ProfileCard = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;

	cursor: default;
	position: absolute;
	height: 8em;
	width: 18.5em;
	margin: -10em 0 0 6.25em;
	background-color: ${darkTheme.textFields.fieldColor};
	opacity: 0;

	padding: 0;

	${darkTheme.textFields.border}
`;

const ProfileLink = styled.a`
	padding: 0.15em;

	text-decoration: none;
	font-weight: bold;
	color: ${darkTheme.main.textColor};
	${darkTheme.textFields.border} :hover {
		text-decoration: underline;
	}
`;

const NameContainer = styled.div`
	line-height: 5%;
	text-align: left;
	background-color: #373737;

	display: flex;
	flex-direction: row;
	align-items: center;

	flex: 1 0 50%;

	${darkTheme.textFields.border}
`;

const DescriptionField = styled.div`
	top: 0;
	text-align: left;
	flex: 1 0 10%;

	padding: 0.5em;

	label {
		font-size: 1em;
	}
`;

const ProfileImage = styled.div`
	float: left;

	width: 4em;
	height: 4em;

	border-radius: 50%;

	margin-left: 0.75em;
	margin-top: 0.75em;
`;

export class Mention extends React.Component<{ user: User }> {
	state = {
		cardColor: this.props.user.theme.colorScheme,
		imgUrl: `http://localhost:8000/profile_pictures/${this.props.user.data.id}`,
	};

	render() {
		const cardStyle = {
			backgroundColor: this.state.cardColor?.cardBackground,
			borderColor: this.state.cardColor?.cardBackground,
			color: this.state.cardColor?.cardText,
		};

		const withImage = {
			backgroundImage: `url(${this.state.imgUrl})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
		};

		return (
			<MentionableContainer>
				<ProfileLink href={`http://localhost:3000/u/${this.props.user.data.id}`}>
					@{this.props.user.data.user_name}
				</ProfileLink>
				<ProfileCard>
					<NameContainer style={cardStyle}>
						<ProfileImage style={withImage} />
						<NameComponent user={this.props.user} />
					</NameContainer>
					<DescriptionField>
						<label>{this.props.user.meta.description}</label>
					</DescriptionField>
				</ProfileCard>
			</MentionableContainer>
		);
	}
}
