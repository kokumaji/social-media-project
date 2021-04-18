import axios from "axios";
import React from 'react';

import Cookie from 'universal-cookie';

const cookie = new Cookie();

class Container extends React.Component {

    state = { token: cookie.get('apiToken')}

    render() {  
        return (<p>Test: {testMeRoute(this.state.token)}</p>);
    }
}

function testMeRoute(token: string): React.ReactNode {
    console.log("cookie " + token);
    return axios.post("http://localhost:3000/api/api/@me/debug", { token });
}

export const HomeContainer = () => (<Container />);

