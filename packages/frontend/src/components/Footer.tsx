import * as React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width:100%;
    background-color:#384853;
    color:white;
    padding-left: 1em;
    font-size:12px;

    a {
        color:white;
        text-decoration: none;
        font-weight:bold;
    }
`;

export const Footer = () => (
    <FooterWrapper>
        <p><a href="#">Kokumaji</a> &copy; 2020</p>
    </FooterWrapper>
);
