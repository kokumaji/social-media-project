import React from "react";
import styled from "styled-components";
import { darkTheme } from "../../theme/colorScheme/colors";
import { UserData } from "../data/UserManager";
import { UserModel } from "../data/UserModel";

import { getColorScheme } from "../../theme/colorScheme/profileCards";

const MentionableContainer = styled.div`
    display: inline;

    > a:hover ~ div {
        cursor: pointer;
        opacity: 1;

        animation: makeVisible 0.2s ease-in;

        @keyframes makeVisible {
            0% {
                opacity: 0;
            } 100% {
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
    width: 18em;
    margin: -10em 0 0 6.5em;
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
    ${darkTheme.textFields.border}

    :hover {
        text-decoration: underline;
    }
`;

const NameContainer = styled.div`
    line-height: 5%;
    text-align: left;
    background-color: #373737;

    flex: 1 0 50%;

    ${darkTheme.textFields.border}

`;

const UsernameLabel = styled.label`
    font-size: 0.85em;
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

    background-color: white;
`;

const AccountName = styled.div`
    margin-left: 5.5em;
    margin-top: 2.25em;

    > span {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

`;

const AdminLabel = styled.label`
    background-color: white;
    color: black;

    display: inline !important;
    height: 10px;

    font-size: 0.75em;

    ${darkTheme.textFields.border}
`;

export class Mention extends React.Component< { user: UserModel }> {

    state = {
        cardColor: getColorScheme(this.props.user.user.profile.cardScheme),
        role: "ADMIN"
    }
 
    render() {

        const cardStyle = {
            backgroundColor: this.state.cardColor.cardBackground,
			borderColor: this.state.cardColor.cardBackground,
			color: this.state.cardColor.cardText
        }

        console.log(cardStyle);

        return (
        <MentionableContainer>
            <ProfileLink href={`http://localhost:3000/u/${this.props.user.id}`}>@{this.props.user.user.username}</ProfileLink>
            <ProfileCard>
                <NameContainer style={cardStyle}>
                    <ProfileImage />

                    <AccountName>
                        <span><h3>{this.props.user.user.fullname}</h3> <AdminLabel>Admin</AdminLabel></span>
                        <UsernameLabel>@{this.props.user.user.username}</UsernameLabel>
                    </AccountName>
                    
                </NameContainer>
                <DescriptionField>
                    <label>{this.props.user.user.profile.description}</label>
                </DescriptionField>
            </ProfileCard>
        </MentionableContainer>);
    }
}