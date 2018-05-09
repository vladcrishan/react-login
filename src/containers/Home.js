import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>react-login</h1>
                    <p>A simple app that handles login with firebase</p>
                </div>
            </div>
        );
    }
}