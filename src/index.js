import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
// import Spinner from "./Spinner";
import registerServiceWorker from "./registerServiceWorker";
import firebase from "./firebase";

import "semantic-ui-css/semantic.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "./reducers";
// import { setUser, clearUser } from "./actions";

const store = createStore(() => {}, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log(user);
        // this.props.setUser(user);
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
        // this.props.clearUser();
      }
    });
  }

  render() {
  return   (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(Root);

ReactDOM.render(
    <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
    </Provider>,
  document.getElementById("root")
);
registerServiceWorker();