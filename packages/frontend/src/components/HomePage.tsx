import axios from "axios";
import React from 'react';

import cookie from "react-cookie";
import { getSelf } from "../api/users";
import { getMonthYear } from "../api/ReadableData";
import { UserModel } from "./data/UserModel";
import styled from "styled-components";

import * as Profile from "./decoration/Profile";

import { LoadingContainer } from "./decoration/Loading";

import { darkTheme } from "../theme/colorScheme/colors";

const fieldHeight = "8em";
const fieldWidth = "100%";
const fieldFont = "font-size: 0.85em;";
const fieldFocus = ":focus { background-color: #4b4b4b; outline: none; }";

const TextBox = styled.div`
    text-align: center;
    animation: visible 0.75s;

    @keyframes visible {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    
`;

const PostSection = styled.div`
    ${darkTheme.textFields.border}
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #181818;
    padding: 1em;
`;

const fixPlaceholder = `
    ::placeholder {
        color: white;
    }
`;

const PostLabel = styled.label`
    margin-bottom: 1em;
    background-color: #242424;
    padding: 0.20em;
    ${darkTheme.textFields.border}
    width: auto;
    max-width: fit-content;
`;

const PostField = styled.textarea`
    ${darkTheme.textFields.border}
    color: ${darkTheme.textFields.textColor};
    background-color: ${darkTheme.textFields.fieldColor};
    width: ${fieldWidth};
    height: ${fieldHeight};
    padding: 1em;
    margin: auto;
    resize: none;
    ${fieldFont}

    ${fixPlaceholder}

    ${fieldFocus}
`;

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

class Container extends React.Component {

    state = {
        self: {
            id: "",
            createdAt: new Date(0),
            user: {
                username: "",
                fullname: "",
                age: 0,
                location: "",
                gender: "",
                profile: {
                    imageUrl: "",
                    description: "",
                    bannerUrl: "",
                    cardScheme: ""
                }
            }
        },
        hasError: false
    }

    async componentDidMount() {
        try {
            const userData = await getSelf(document.cookie);
            this.setState({
                self: userData as UserModel
            })

        } catch(err) {
            console.log(err);
            this.setState({ hasError: true });
        }
    }

    render() {  
        if(this.state.hasError) {
            return (<TextBox><h1>:(</h1><p>Something went wrong!</p></TextBox>);
        }
        return (this.state.self.user.username != "" ? 
            <PostSection>
                                <TextBox>
            <p>Welcome Back, <Profile.Mention user={this.state.self as UserModel} /> 🥳</p>
            <p><b>Did you know?</b> You joined KokuMedia in <b>{`${getMonthYear(new Date(this.state.self.createdAt))}`}</b></p></TextBox>

            </PostSection> : <LoadingContainer />);
    }
}

export const HomeContainer = () => (<Container />);

