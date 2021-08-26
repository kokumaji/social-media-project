import * as React from 'react';
import styled from 'styled-components';

import { User } from '../../api/models/user/User';
import * as formatter from '../../api/ReadableData';
import { Icon } from '../media/Icon';

const PostContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	min-height: 16em;
	border-radius: 1em;
	margin-bottom: 1em;
	background-color: white;
	color: black;
	padding: 1em;
	line-height: 2px;
`;

const PostAuthor = styled.div`
	display: flex;
	flex-direction: row;
`;

const ImageContainer = styled.div`
	> img {
		height: 4em;
		border-radius: 50%;
		width: auto;
	}
`;

const UserInfo = styled.div`
	max-height: 4em;
	padding: 10px;

	h2 {
		font-size: 1.25em;
	}

	h2 a {
		color: black;
		text-decoration: none;
	}

	p {
		font-size: 0.75em;
	}
`;

const MessageContainer = styled.div`
	height: 100%;
	margin-top: 2em;
	width: 100%;
`;

const InteractContainer = styled.div`
	width: 100%;
	bottom: 1em;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	height: 3em;
`;

const ActionHandler = styled.div`
	display: flex;
	flex-direction: row;
	margin: auto;
	align-items: center;
	color: #bcbcbc;
	transition: 0.1s;
	user-select: none;
	img,
	svg {
		margin-right: 0.6em;
		height: 1.5em;
		width: auto;
	}

	:hover {
		transition: 0.1s;
		filter: invert(46%) sepia(22%) saturate(268%) hue-rotate(157deg)
			brightness(89%) contrast(86%);
		cursor: pointer;
	}
`;

const PostHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const Timestamp = styled.div`
	color: #bcbcbc;
	width: 6em;
	padding: 0.5em;
	text-align: center;
`;

export class Post extends React.Component<{
	author: User;
	message: string;
}> {
	render() {
		return (
			<PostContainer>
				<PostHeader>
					<PostAuthor>
						<ImageContainer>
							<img
								src={
									this.props.author.media.profile_picture_url === null
										? "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"
										: this.props.author.media.profile_picture_url
								}
							/>
						</ImageContainer>
						<UserInfo>
							<h2>
								<a
									href={`http://localhost:3000/u/${this.props.author.data.user_name}`}
								>
									{this.props.author.data.name}
								</a>
							</h2>
							<p>@{this.props.author.data.user_name}</p>
						</UserInfo>
					</PostAuthor>
					<Timestamp>
						<p>{formatter.getReadableDifference(1504044000000)} ago</p>
					</Timestamp>
				</PostHeader>
				<MessageContainer>
					<p>{this.props.message}</p>
				</MessageContainer>
				<InteractContainer>
					<ActionHandler>
						<Icon name="reply" />
						<p>{formatter.getReadableCount(1210000) || 0}</p>
					</ActionHandler>
					<ActionHandler>
						<Icon name="favorite" />
						<p>{formatter.getReadableCount(1232) || 0}</p>
					</ActionHandler>
				</InteractContainer>
			</PostContainer>
		);
	}
}
