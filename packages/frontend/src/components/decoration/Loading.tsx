import React from "react";
import styled from "styled-components";
import { getMonthYear } from "../../api/ReadableData";
import { UserModel } from "../data/UserModel";

const CenterContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

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

const LoadingSpinner = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;

	div {
		position: absolute;
		top: 33px;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: #fff;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}

	div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}
`;

export class LoadingContainer extends React.Component<{
	text?: string | null;
}> {
	state = {
		randomItem: "Loading...",
		intervalId: 0,
	};

	randomString = [
		"Tidying up Database...",
		"Baking Cookies... 🍪",
		"Oh look, a Bird! 🐦",
		"Why is it taking so long?",
		"Almost there!",
	];

	randomItemPicker = () =>
		this.randomString[Math.floor(Math.random() * this.randomString.length)];

	componentDidMount() {
		const id = setInterval(() => {
			this.setState({ randomItem: this.randomItemPicker() });
		}, 2000);
		this.setState({ intervalId: id });
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	render() {
		return (
			<CenterContainer>
				<TextBox>
					<h3>{!this.props.text ? this.state.randomItem : this.props.text}</h3>
				</TextBox>
				<LoadingSpinner>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</LoadingSpinner>
			</CenterContainer>
		);
	}
}
