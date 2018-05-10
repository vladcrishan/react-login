import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
// Unfortunately, when you click on them they refresh your browser while redirecting to the link. 
// We need it to route it to the new link without refreshing the page since we are building a single page app.
// To fix this we need a component that works with React Router and React Bootstrap called React Router Bootstrap.
// It can wrap around your Navbar links and use the React Router to route your app to the required link without refreshing the browser.
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import { auth } from "./firebase"
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isAuthenticated: false
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isAuthenticated: true });
      }
    });
  }

  userHasAuthenticated = (userName, authenticated) => {
    this.setState({ userName: userName, isAuthenticated: authenticated });
  }

  handleLogout = event => {
    auth.signOut();
    this.userHasAuthenticated('', false);
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      userName: this.state.userName,
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <div>react-login</div>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
