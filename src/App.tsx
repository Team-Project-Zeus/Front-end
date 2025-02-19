import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonPage } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login/Login';

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
import './theme/styling.css';

import Dashboard from './pages/Dashboard/Dashboard';
import LogOut from './pages/Logout/LogOut';
import { PrivateRoute } from './utils/routing';
import { Provider } from 'react-redux';
import store from './store/store';

import Welcome from './pages/Welcome/Welcome';
// 

window.onload = function () {
  if (window.location.protocol === "https:") {
    console.log("https detected forcing http")
    window.location.protocol = "http";
  }

}

const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <IonApp>
      <IonReactRouter >
        <IonPage id='content'>
          <IonRouterOutlet >
            <Route path="/dashboard">
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Route>
            <Route path="/home">
              <PrivateRoute path="/home" component={Welcome} />
            </Route>
            <Route forceRefresh={true} path="/login" component={Login} />

            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route forceRefresh={true} path="/logout" component={LogOut} exact={true} />

          </IonRouterOutlet>
        </IonPage>
      </IonReactRouter>
    </IonApp>
  </Provider >
);

export default App;
