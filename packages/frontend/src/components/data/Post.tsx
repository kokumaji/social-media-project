import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";

import Icon from '../media/Icon';

import { getMonthYear } from "../../api/ReadableDate";
import { getUser } from "../../api/users";
import { getColorScheme } from "../../theme/colorScheme/profileCards";
import { User } from "../../types/User";

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
    img {
        margin-right: 0.35em;
        height: 1.5em;
        width: 1.5em;
    }
`;

export class Post extends React.Component<{author: User, message: string}> {
    render() {
        return(
            <PostContainer>
                <PostAuthor>
                    <ImageContainer>
                        <img src={this.props.author.profileImg === null ? 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg' : this.props.author.profileImg } />
                    </ImageContainer>
                    <UserInfo>
                        <h2><a href={`http://localhost:3000/u/${this.props.author.username}`}>{this.props.author.fullname}</a></h2>
                        <p>@{this.props.author.username}</p>
                    </UserInfo>
                </PostAuthor>
                <MessageContainer>
                    <p>
                        {this.props.message}
                    </p>
                </MessageContainer>
                <InteractContainer>
                    <ActionHandler>
                        <Icon name='reply' />
                        <p>10K</p>
                    </ActionHandler>
                    <ActionHandler>
                        <Icon name='favorite' />
                        <p>10K</p>
                    </ActionHandler>
                </InteractContainer>
            </PostContainer>
        );
    }
}