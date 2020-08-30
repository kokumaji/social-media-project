import * as React from "react";
import { Redirect } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";
import styled from "styled-components";

import { NotFound } from '../views/NotFound';

import { getMonthYear } from "../api/ReadableData";
import { getUser } from "../api/users";
import { getColorScheme } from "../theme/colorScheme/profileCards";
import { UserWithCardScheme } from "../types/User";
import { Post } from "./data/Post";

const cardScheme = getColorScheme('defaultDark');

const Wrapper = styled.div`
    height: 100%;
    font-family: 'Nunito', sans-serif;
    width: 45vw;
    display: grid;
    flex-direction: column;
    justify-content: spread-evenly;

    @media screen and (max-width : 800px) {
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
    height: 100%;
    height: 100%;
    background-color: #22272b;
    padding: 1em;

    > h2 {
        text-align: center;
        margin-top: 3em;
        user-select: none;
        color: #363F44;
    }

    > p {
        text-align: center;
        user-select: none;

        color: #363F44;
    }
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
        width: 10em;
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
    margin-bottom: 2em; 
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
            description: '',
            gender: '',
            joined: new Date(0),
            profileImg: '',
            bannerImg: '',
            cardScheme: '',
            cardColor: {
                name: '',
                cardBackground: '',
                cardBannerBg: '',
                cardText: '',
                cardUserText: '',
                cardActionColor: ''       
            }
        },
        notFound: false
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        try {
            var user = await getUser(id);

            console.log(user);

            this.setState({ userData: {
                username: user.user.username,
                fullname: user.user.fullname,
                location: user.user.location,
                description: user.user.profile.description,
                gender: user.user.gender,
                joined: new Date(user.createdAt),
                profileImg: user.user.profile.imageUrl,
                bannerImg: user.user.profile.bannerUrl,
                cardScheme: user.user.profile.cardScheme,
                cardColor: getColorScheme(user.user.profile.cardScheme)
            }});
        } catch(err) {
            this.setState({ notFound: true });
        }


    }
    
    render() {
        var bannerBg = {
            backgroundColor: this.state.userData.cardColor.cardBannerBg,
            backgroundImage: `url(${this.state.userData.bannerImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }

        var userNameColor = {
            color: this.state.userData.cardColor.cardUserText
        }

        var style = {
            backgroundColor: this.state.userData.cardColor.cardBackground,
            borderColor: this.state.userData.cardColor.cardBackground,
            color: this.state.userData.cardColor.cardText
        };

        var numberOfPosts = 0;

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
                        <p>{!this.state.userData.description ? 'No description provided.' : this.state.userData.description }</p>

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
                    {posts.length > 0 ? posts : <><h2>No Posts Found.</h2><p>This user hasn't posted anything.</p></>}
                </PostWrapper>
            </Wrapper>
        ) : <NotFound />;
    }
}

export const ProfileWrapper = withRouter(ProfileComponent);
