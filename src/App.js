import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

// Containers
const Login = React.lazy(() => import('./views/users/login/Login'));
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const ChangePassWord = React.lazy(() => import('./views/users/changePassWord/ChangePassWord'));
const Register = React.lazy(() => import('./views/users/register/Register'));

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/change-password" name="Change PassWord" render={props => <ChangePassWord {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
    );
  }
}

export default App;
