import React from "react";
import styled from "styled-components";
import UserObject from "../../api/models/user/UserObject";
import { getSelf } from "../../api/users";
import { PostContext, PostStateProvider } from "../data/PostManager";

const PostWrapper = styled.div`
    background-color: black;

    width: 100px;
    height: 100px;
`;

const ContentField = styled.input`
`;

const SubmitButton = styled.button``;

class PostFormContainer extends React.Component<{ postState: PostStateProvider, user?: UserObject },{ postContent: string }> {
    
    state = {
        postContent: ""
    }

    private handlePostInput(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ postContent: e.target.value });
    }

    private async submitPost(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if(!this.props.user) return;
        const user = this.props.user as UserObject;
        const userData = user.data;
        const userId = userData.id.toString();

        this.props.postState.submitPost(userId, this.state.postContent);
    }

    render() {
        return (
            <PostWrapper>
                <ContentField value={this.state.postContent} onChange={this.handlePostInput.bind(this)} ></ContentField>
                <SubmitButton onClick={this.submitPost.bind(this)}>Submit</SubmitButton>
            </PostWrapper>
        );
    }
}

export const PostForm = () => (
    <PostContext.Consumer>
        {state => <PostFormContainer postState={state} />}
    </PostContext.Consumer>
);