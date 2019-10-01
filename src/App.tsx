import React, { Component, ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import fakeAuth from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';



/* Theme variables */
import './theme/variables.css';
import Dashboard from './pages/Dashboard';
import LogOut from './pages/LogOut';

interface IProps {
  component: any,
  loggedIn: any,
  path: string,

  // any other props that come into the component
}

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }: IProps) => {
  console.log(loggedIn);
  if (loggedIn == "true") {
    loggedIn = true;
  }
  else {
    loggedIn = false;
  }
  console.log(loggedIn);

  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  prevLocation: '/home',
                  error: "You need to login first!",
                },
              }}
            />
          );
      }}
    />
  );
};



const App: React.FunctionComponent = () => (
  <IonApp>
    <IonReactRouter>
      <IonPage>
        <IonRouterOutlet>
          <Route path="/home" component={Login} exact={true} />
          <ProtectedRoute path="/dashboard" loggedIn={localStorage.getItem('loggedIn')} component={Dashboard} />

          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/logout" component={LogOut} exact={true} />

        </IonRouterOutlet>
      </IonPage>
    </IonReactRouter>
  </IonApp>
);

export default App;
