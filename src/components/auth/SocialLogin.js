import React, {Component} from "react";
import {GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../../constants/constants.js";
import googleLogo from "../../assets/google-logo.png";
import githubLogo from "../../assets/github-logo.png";
import { Form} from "antd";
const FormItem = Form.Item;

class SocialLogin extends Component {
    render() {
        return ( <FormItem >
                    <FormItem className="social-form">
                        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                            <img src={googleLogo} alt="Google"/>
                        </a>
                        <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                            <img src={githubLogo} alt="Github"/>
                        </a>
                    </FormItem>
                </FormItem>                
        );
    }
}

export default SocialLogin;