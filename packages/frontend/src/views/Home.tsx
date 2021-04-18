import * as React from "react";

// import styled from "styled-components";
import { Footer } from "../components/Footer";
import { HomeContainer } from "../components/HomePage";
import { ProfileWrapper } from "../components/ProfileComponent";

export const HomePage = () => (
	<>
		<p>Welcome Back <b>@kokumaji</b></p>
		<HomeContainer />
		<Footer />
	</>
);