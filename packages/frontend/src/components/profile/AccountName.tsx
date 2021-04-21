import React from "react";
import styled from "styled-components";
import UserObject from "../../api/models/user/UserObject";
import { UserRole } from "../../api/models/user/UserRoles";
import { UserModel } from "../data/UserModel";
import { RoleBadge } from "../decoration/Labels";

const Wrapper = styled.div`
    margin-left: 5.5em;
    margin-top: 1.25em;

    display: flex;
    flex-direction: column;

    height: 1em;

    > span {
        display: flex;
        flex-direction: row;
    }
`;

const TagWrapper = styled.div`
    font-size: 0.85em;
    opacity: 0.5;
`;

const BadgeContainer = styled.div`
    height: 100%;
    margin-left: 0.5em;

    > label {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export class NameComponent extends React.Component<{ user: UserObject }> {

    state = {
        role: ""
    };

    render() {
        const userRole = this.props.user.data.role ? this.props.user.data.role : "";
        return (
        <Wrapper>
            <span>
                <h3>{this.props.user.data.name}</h3> 
                <BadgeContainer>{ userRole.length > 1 ? <RoleBadge role={userRole as UserRole} /> : "" }</BadgeContainer>
            </span>
            <TagWrapper>@{this.props.user.data.user_name}</TagWrapper>
        </Wrapper>
        );
    }
}

