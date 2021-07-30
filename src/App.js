import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

// Containers
const Login = React.lazy(() => import('./views/customers/login/Login'));
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
// const ChangePassWord = React.lazy(() => import('./views/customers/changePassWord/ChangePassWord'));
// const CreateCustomer = React.lazy(() => import('./views/customers/createCustomer/CreateCustomer'));

class App extends Component {

  render() {
    return (
        <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              {/*<Route exact path="/change-password" name="Change PassWord" render={props => <ChangePassWord {...props}/>} />*/}
              {/*<Route exact path="/create-customer" name="Create Customer Page" render={props => <CreateCustomer {...props}/>} />*/}
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
    );
  }
}

export default App;
