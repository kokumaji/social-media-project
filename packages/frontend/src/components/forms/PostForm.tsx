import React from 'react';
import styled from 'styled-components';

import { User } from '../../api/models/user/User';
import { getSelf } from '../../api/users';
import { PostContext, PostStateProvider } from '../data/PostManager';

const PostWrapper = styled.div`
	background-color: black;

	width: 100px;
	height: 100px;
`;

const ContentField = styled.input``;

const SubmitButton = styled.button``;

class PostFormContainer extends React.Component<
	{ postState: PostStateProvider; user?: User },
	{ postContent: string }
> {
	state = {
		postContent: ""
	};

	private handlePostInput(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ postContent: e.target.value });
	}

	private submitPost(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (!this.props.user) {
			return;
		}
		const userData = this.props.user.data;
		const userId = userData.id.toString();
		this.props.postState.submitPost(userId, this.state.postContent);
	}

	render() {
		return (
			<PostWrapper>
				<ContentField
					value={this.state.postContent}
					onChange={this.handlePostInput.bind(this)}
				></ContentField>
				<SubmitButton onClick={this.submitPost.bind(this)}>Submit</SubmitButton>
			</PostWrapper>
		);
	}
}

export const PostForm = ({ user }: { user?: User }) => (
	<PostContext.Consumer>
		{state => <PostFormContainer postState={state} user={user} />}
	</PostContext.Consumer>
);
