import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';

import { User } from '../api/models/user/User';
import { getMonthYear } from '../api/ReadableData';
import { getUser } from '../api/users';
import { darkTheme } from '../theme/colorScheme/colors';
import { defaultDark } from '../theme/colorScheme/profileCards';
import { CardScheme } from '../types/Theme';
import { Post } from './data/Post';
import { NameComponent } from './profile/AccountName';

const ProfilePicture = styled.div`
	height: 6em;
	width: 6em;

	border-radius: 50%;
	background-color: black;
`;

const HeaderWrapper = styled.div`
	width: 40em;
	height: 20em;

	display: flex;
	flex-wrap: wrap;
	flex-direction: column;

	padding: 0;

	background-color: ${darkTheme.main.componentColor};
`;

const NameContainer = styled.div`
	line-height: 5%;
	text-align: left;

	height: 8em;

	display: flex;
	flex-direction: row;
	align-items: center;
`;

const ContentWrapper = styled.div`
	background-color: ${darkTheme.textFields.fieldColor};
	padding: 1em;
	width: 100%;
	height: auto;
`;

const MiscContent = styled.div`
	top: 0;
	text-align: left;
	flex: 1 0 10%;

	padding: 1em 2em 1em 2em;

	display: flex;
	flex-direction: row;
	justify-content: space-around;

	label {
		font-size: 1em;
	}
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

class ProfileComponent extends React.Component<
	RouteComponentProps<{ id: string }>,
	{ userData: User; notFound: boolean; imgUrl: string }
> {
	state = {
		notFound: false,
		userData: User.defaultUser,
		imgUrl: `http://localhost:8000/profile_pictures/0`
	};

	async componentDidMount() {
		const id = this.props.match.params.id;
		try {
			const queriedUser = await getUser(id);
			this.setState({
				userData: queriedUser,
				imgUrl: `http://localhost:8000/profile_pictures/${id}`
			});
		} catch (err) {
			console.log(err);
			this.setState({ notFound: true });
		}
	}

	render() {
		const colorScheme: CardScheme = defaultDark as CardScheme;

		const bannerBg = {
			backgroundColor:
				colorScheme.cardBannerBg /*
			backgroundImage: `url(${this.state.userData.media.profile_banner_url})`,
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",*/
		};

		const withImage = {
			backgroundImage: `url(${this.state.imgUrl})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat"
		};

		const userNameColor = {
			color: colorScheme.cardUserText
		};

		const style = {
			backgroundColor: colorScheme.cardBackground,
			borderColor: colorScheme.cardBackground,
			color: colorScheme.cardText
		};

		const numberOfPosts = 0;

		const posts = [];

		const fixedDate: Date = this.state.userData.data.created_at
			? new Date(this.state.userData.data.created_at.toString())
			: new Date(0);

		for (let i = 0; i < numberOfPosts; i++) {
			posts[i] = <Post author={this.state.userData} message="Hello World!" />;
		}

		return (
			<HeaderWrapper>
				<ContentWrapper>
					<NameContainer>
						<ProfilePicture style={withImage}></ProfilePicture>
						<NameComponent user={this.state.userData}></NameComponent>
					</NameContainer>
					<DescriptionField>
						<label>{this.state.userData.meta.description}</label>
					</DescriptionField>
					<MiscContent>
						<label>
							<b>Location</b> {this.state.userData.meta.location}
						</label>
						<label>
							<b>Gender</b> {this.state.userData.meta.gender}
						</label>
						<label>
							<b>Joined</b> {getMonthYear(fixedDate)}
						</label>
					</MiscContent>
				</ContentWrapper>
			</HeaderWrapper>
		);
	}
}

export const ProfileWrapper = withRouter(ProfileComponent);
