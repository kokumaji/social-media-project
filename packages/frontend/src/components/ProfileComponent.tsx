import * as React from "react";
import { Redirect } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";

import { NotFound } from '../views/NotFound';

import { getMonthYear } from "../api/ReadableDate";
import { getUser } from "../api/users";
import { getColorScheme } from "../theme/colorScheme/profileCards";
import { UserWithCardScheme } from "../types/User";
import { Post } from "./data/Post";

const cardScheme = getColorScheme('cottonCandy');

const Wrapper = styled.div`
    font-family: 'Nunito', sans-serif;
    height: 100vh;
    width 45vw;
    display: flex;
    flex-direction: column;
    justify-content: spread-evenly;

    @media screen and (max-width : 768px) {
        {
            display: flex;
            flex-direction: column;
            width: 100%;
            /* height:200vh; */
        }
    }
`;

const CardWrapper = styled.div`
    width: 100%;
    height: auto;
`;

const PostWrapper = styled.div`
    width: 100%;
    background-color: #22272b;
    padding: 1em;
`;

const ProfileCard = styled.div`
    border-radius: 1em 1em 0 0;
    width: 100%;
    height: 16em;
    background-color: ${cardScheme?.cardBackground};
    padding: 2em;
    display: inline-block;
    line-height: 2px;
    color: ${cardScheme?.cardText};


    > p {
        line-height: normal;
    }

    > img {
        user-select: none;
        display: flex;
        margin-left: auto;
        margin-right: auto;
        margin-top: -8em;
        border-radius: 50%;
        height: 10em;
        width: auto;
        border-style: solid;
        border-width: 0.3em;
        border-color: ${cardScheme?.cardBackground};
    }
`;

const ProfileBanner = styled.div`
    background-color: ${cardScheme?.cardBannerBg};
    width: 100%;
    height: 14em;
    margin-bottom: -2em;
`;

const NameContainer = styled.div`
    p {
        font-size: 0.95em;
        color: ${cardScheme?.cardUserText};
    }
`;

const AboutContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

const AboutField = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0.6em;
`;

const AboutTitle = styled.div`
    padding: 0.2em;
`;

const AboutValue = styled.div`
    padding: 0.2em;
`;

const PostContainer = styled.div`
    width: 100%;
    min-height: 16em;
    border-radius: 1em;
    margin-bottom: 1em;
`;

class ProfileComponent extends React.Component<RouteComponentProps<{ id: string }>, { userData: UserWithCardScheme, notFound: boolean }> {
    state = {
        userData: {
            username: '',
            fullname: '',
            location: '',
            gender: '',
            joined: new Date(0),
            profileImg: '',
            cardScheme: '',
            cardColor: {
                name: 'Minted Green',
                cardBackground: '#c3d8d1',
                cardBannerBg: '#557d68',
                cardText: '#4e4e4e',
                cardUserText: '#7a8e88'        
            }
        },
        notFound: false
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        try {
            const user = await getUser(id);

            this.setState({ userData: {
                username: user.profile.username,
                fullname: user.profile.fullname,
                location: user.profile.location,
                gender: user.profile.gender,
                joined: new Date(user.createdAt),
                profileImg: user.profile.profileImageUrl,
                cardScheme: user.profile.cardScheme,
                cardColor: getColorScheme(user.profile.cardScheme)
            }});
        } catch(err) {
            this.setState({ notFound: true });
        }


    }
    
    render() {
        var bannerBg = {
            backgroundColor: this.state.userData.cardColor.cardBannerBg
        }

        var userNameColor = {
            color: this.state.userData.cardColor.cardUserText
        }

        var style = {
            backgroundColor: this.state.userData.cardColor.cardBackground,
            borderColor: this.state.userData.cardColor.cardBackground,
            color: this.state.userData.cardColor.cardText
        };

        var numberOfPosts = 8;

        var posts = [];
    
        for (var i = 0; i < numberOfPosts; i++) {
            posts[i] = (<Post author={this.state.userData} message='Hello World!'/>);
        }
    
        return !this.state.notFound ? (
            <Wrapper>
                <CardWrapper>
                    <ProfileBanner style={bannerBg} />
                    <ProfileCard style={style}>
                        <img style={style} src={this.state.userData.profileImg === null ? 'https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg' : this.state.userData.profileImg } />
                        <NameContainer>
                            <h2>{this.state.userData.fullname}</h2>
                            <p style={userNameColor}>@{this.state.userData.username}</p>
                        </NameContainer>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum facilisis quam eu consectetur euismod. Mauris ipsum viverra.</p>

                        <AboutContainer>
                            <AboutField title='Location'>
                                <AboutTitle >📍</AboutTitle>
                                <AboutValue>{this.state.userData.location}</AboutValue>
                            </AboutField>
                            <AboutField title='Gender'>
                <               AboutTitle>👤</AboutTitle>
                                <AboutValue>{this.state.userData.gender}</AboutValue>
                            </AboutField>
                            <AboutField title='Joined'>
                <               AboutTitle>📲</AboutTitle>
                                <AboutValue>{getMonthYear(new Date(this.state.userData.joined))}</AboutValue>
                            </AboutField>
                        </AboutContainer>
                    </ProfileCard>
                </CardWrapper>
                <PostWrapper>
                    {posts}
                </PostWrapper>
            </Wrapper>
        ) : <NotFound />;
    }
}

export const ProfileWrapper = withRouter(ProfileComponent);
