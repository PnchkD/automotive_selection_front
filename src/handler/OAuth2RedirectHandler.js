import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import jwt from 'jwt-decode'
import { ACCESS_TOKEN, USER_ID, USER_LOGIN, USER_ROLES, ISSUED_AT, ERROR, USER_EXPIRES_IN, USER_TOKEN_TYPE } from '../constants/constants.js';

class OAuth2RedirectHandler extends Component {

    constructor(props) {
        super(props);

        this.setTokenAndRedirect = this.setTokenAndRedirect.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
    }


    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    login(token, tokenType) {
        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem(USER_TOKEN_TYPE, tokenType);
        let decodedToken = jwt(token);
        localStorage.setItem(USER_LOGIN, decodedToken.sub);
        localStorage.setItem(USER_ROLES, decodedToken.roles);
        localStorage.setItem(USER_ID, decodedToken.id);
        localStorage.setItem(ISSUED_AT, decodedToken.iat);
        localStorage.setItem(USER_EXPIRES_IN, decodedToken.exp);

        this.props.history.push('/');
    }

    render() {
        const token = this.getUrlParameter('token');
        const tokenType = this.getUrlParameter('tokenType')
        const error = this.getUrlParameter(ERROR);
        
        if (token) {
           this.login(token, tokenType);
            return <Redirect to={{
                pathname: "/",
                state: {from: this.props.location}
            }}/>;
        } else {
            return <Redirect to={{
                pathname: "/auth",
                state: {
                    from: this.props.location,
                    error: error
                }
            }}/>;
        }
    }

    redirectToLogin(error) {
        return <Redirect to={{
            pathname: "/auth",
            state: {
                from: this.props.location,
                error: error
            }
        }}/>;
    }

    setTokenAndRedirect(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        this.props.onLogin();
        return <Redirect to={{
            pathname: "/",
            state: {from: this.props.location}
        }}/>;
    }

}

export default withRouter(OAuth2RedirectHandler);