import * as React from "react";
import * as Icon from "react-bootstrap-icons";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import * as users from "../api/users";
import { UserContext, UserStateProvider } from "../components/data/UserManager";
import * as Form from "./forms/Account";

const LoginContainer = styled.div`
	background-color: #384853;
	width: 80vh;
	max-width: 400px;
	height: 70vh;
	max-height: 500px;
	border-radius: 0.75em;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	a {
		color: white;
		font-weight: bold;
		text-decoration: none;
	}

	@media screen and (max-width: 800px) {
		width: 100vh;
	}
`;

class LoginFormWrapper extends React.Component<
	{ userState: UserStateProvider },
	{ username: string; password: string; loginFailed: boolean; showPwd: boolean }
> {
	state = {
		username: "",
		password: "",
		loginFailed: false,
		showPwd: false
	};

	/**
	 * Update the component's username state.
	 */
	private handleUsernameInput(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ username: e.target.value });
	}

	/**
	 * Update the component's password state.
	 */
	private handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ password: e.target.value });
		if (e.target.value === "") this.setState({ loginFailed: false });
	}

	/**
	 * Update component's pb  assword field style.
	 */
	private handlePasswordVisibility(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		this.setState({ showPwd: !this.state.showPwd });
	}

	/**
	 * Attempt a user login by authenticating with the API.
	 */
	private async tryLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		try {
			let successful = await this.props.userState.authenticate(
				this.state.username,
				this.state.password
			);
			this.setState({ loginFailed: !successful });
		} catch (err) {
			console.error(err);
		}
	}

	render() {
		const fieldType = this.state.showPwd ? "text" : "password";
		const borderStyle = this.state.loginFailed ? "solid" : "none";
		const borderColor = this.state.loginFailed ? "#ff3d3d" : "#fff";
		const pwdStyle = {
			borderStyle: `${borderStyle}`,
			borderColor: `${borderColor}`,
			color: `${borderColor}`,
			transition: "0.1s"
		};

		return !this.props.userState.authed ? (
			<LoginContainer>
				{this.state.loginFailed && (
					<Form.Error>Login Failed. Please try again later.</Form.Error>
				)}
				<h1>Social Media WIP</h1>

				<Form.InputField
					maxLength={20}
					value={this.state.username}
					placeholder="Username"
					onChange={this.handleUsernameInput.bind(this)}
				/>
				<Form.FieldRow>
					<Form.PasswordField
						style={pwdStyle}
						maxLength={50}
						value={this.state.password}
						placeholder="Password"
						type={fieldType}
						onChange={this.handlePasswordInput.bind(this)}
					/>
					<Form.HideSensitive
						type="submit"
						onClick={this.handlePasswordVisibility.bind(this)}
					>
						{this.state.showPwd ? "Hide" : "Show"}
					</Form.HideSensitive>
					<Icon.Eye />
				</Form.FieldRow>
				<Form.ConfirmButton onClick={this.tryLogin.bind(this)}>
					login
				</Form.ConfirmButton>
				<p>
					Don't have an account yet? <a href="/register">Sign up!</a>
				</p>
			</LoginContainer>
		) : (
			<Redirect to="/home" />
		);
	}
}

export const LoginForm = () => (
	<UserContext.Consumer>
		{state => <LoginFormWrapper userState={state} />}
	</UserContext.Consumer>
);
// <LoginContainer>
//     <h1>Social Media WIP</h1>
//     <InputField id="username" placeholder="Username"/>
//     <InputField id="password" placeholder="Password" type="password" />
//     <LoginButton>login</LoginButton>
//     <LoginButton onClick={(e) => fetchData(e)}>Click For Data</LoginButton>
// </LoginContainer>
