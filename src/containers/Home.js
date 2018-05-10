import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>React Login with Firebase</h1>
                    <p>you are logged in as <b>{this.props.userName}</b></p>
                </div>
            </div>
        );
    }
}