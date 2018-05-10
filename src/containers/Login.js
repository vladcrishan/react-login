import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { auth, provider } from "../firebase.js";
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            unIsLoading: false,
            googleIsLoading: false
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ unIsLoading: true });
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                alert('Signed in successfully');
                this.props.userHasAuthenticated(this.state.email, true);
                this.props.history.push("/home");
            })
            .catch((error) => {
                alert(error);
                this.setState({ unIsLoading: false });
            });
    }

    googleLogin = event => {
        this.setState({ googleIsLoading: true });
        auth.signInWithPopup(provider)
            .then(() => {
                alert('Signed in successfully');
                this.props.userHasAuthenticated(auth.currentUser.email, true);
                this.props.history.push("/home");
            })
            .catch((error) => {
                alert(error);
                this.setState({ googleIsLoading: false });
            });
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.unIsLoading}
                        text="Login"
                        loadingText="Logging in…"
                    />
                    <div className="text-center text-muted">- or -</div>
                    <LoaderButton
                        // className="blue"
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        onClick={() => this.googleLogin()}
                        isLoading={this.state.googleIsLoading}
                        text="Login with google"
                        loadingText="Logging in…"
                    />
                </form>
            </div>
        );
    }
}