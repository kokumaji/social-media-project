import * as React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import * as users from "../api/users";
import { UserContext, UserStateProvider } from "../components/data/UserManager";
import * as Form from "./forms/Account";

//import * as 

const SignUpContainer = styled.div`
    background-color: #384853;
    width: 80vh;
    max-width: 800px;
    /* height: 70vh; */
    /* max-height: 800px; */
    border-radius:0.75em;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    
    padding: 2em;

    box-shadow: 0px 0px 5px 5px #0002;

    a {
        color: white;
        font-weight: bold;
        text-decoration: none;
    }

    @media screen and (max-width : 800px) {
        {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 1.5em;
            /* height:200vh; */
        }

        > h1 {
            margin-top: 1em;
        }

        * {
            width: 100%;
        }

        > div {
            display: flex;
            flex-direction: column;
            margin-bottom: 0.75em;
        }

        > div > span {
            display: none;
        }
    }
`;

class SignUpWrapper extends React.Component<{ userState: UserStateProvider }, { username: string, password: string, passwordConfirm: string, email: string, emailConfirm: string }> {
    state = {
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        emailConfirm: ''
    }

    private handleUsernameInput(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ username: e.target.value })
    }

    private handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: e.target.value })
    }

    private handlePasswordConfirmInput(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ passwordConfirm: e.target.value })
    }

    private handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ email: e.target.value })
    }

    private handleEmailConfirmInput(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ emailConfirm: e.target.value })
    }

    private passwordMatch() {
        return this.state.password === this.state.passwordConfirm;
    }

    private emailMatch() {
        return this.state.email === this.state.emailConfirm;
    }

    private validatePassword() {

        var regexStrong = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
        var regexMedium = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

        if(regexStrong.test(this.state.password)) return true;
        else if(regexMedium.test(this.state.password)) return true;

        return false;
    }

    private validateEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.state.email.toLowerCase());
    }

    private async registerUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            if(!this.validatePassword()) {
                console.log("password did not match regex");
                return;
            };
            
            if(!this.passwordMatch()) {
                console.log("passwords did not match");
                return;
            }

            if(!this.validateEmail()) {
                console.log("email did not match regex");
                return;
            }
            
            if(!this.emailMatch()) {
                console.log("emails did not match");
                return;
            }
            
            let res = await this.props.userState.register( this.state.username, this.state.email, this.state.password );
            console.log(res);
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        
        return !this.props.userState.authed ? (
            <SignUpContainer>
                <h1>Create an Account</h1>
                <Form.InputField value={this.state.username} onChange={this.handleUsernameInput.bind(this)} placeholder="Username" />
                <Form.FieldRow>
                    <Form.InputField value={this.state.email} onChange={this.handleEmailInput.bind(this)} placeholder="E-Mail Address" />
                    <Form.Spacer />
                    <Form.InputField value={this.state.emailConfirm} onChange={this.handleEmailConfirmInput.bind(this)} placeholder="Confirm E-Mail Address" />
                </Form.FieldRow>
                <Form.FieldRow>
                    <Form.PasswordField value={this.state.password} onChange={this.handlePasswordInput.bind(this)} type='password' placeholder="Password" />
                    <Form.Spacer />
                    <Form.PasswordField value={this.state.passwordConfirm} onChange={this.handlePasswordConfirmInput.bind(this)} type='password' placeholder="Confirm Password" />
                </Form.FieldRow>
                <Form.ConfirmButton onClick={this.registerUser.bind(this)}>sign up 🔥</Form.ConfirmButton>
            </SignUpContainer>
        ) : <Redirect to="/home" />;
    }
}

export const SignUpForm = () => (<UserContext.Consumer>{(state) => <SignUpWrapper userState={state}/>}</UserContext.Consumer>);
