import axios from "axios";
import * as React from "react";

export class AxiosTest extends React.Component<
	{},
	{
		successful: boolean;
		content: string;
	}
> {
	render() {
		return (
			<>
				<h1>successful: {this.state.successful}</h1>
				<h2>content: {this.state.content}</h2>
			</>
		);
	}

	async componentDidMount() {
		const { data } = await axios.get("localhost:8080");
		this.setState(data);
	}
}
