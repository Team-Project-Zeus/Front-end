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
import { PrivateRoute } from './utils/routing';
import { Provider } from 'react-redux';
import store from './store/store';

interface IProps {
  component: any,
  loggedIn: any,
  path: string,

  // any other props that come into the component
}

// const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }: IProps) => {
//   console.dir(localStorage);
//   console.log(loggedIn);
//   // if (loggedIn == "true" || true == true) {
//   //   loggedIn = true;
//   // }
//   // else {
//   //   loggedIn = false;
//   // }
//   console.log(loggedIn);

//   if (loggedIn == "true") {
//     return (
//       <Route
//         path={path}
//         {...rest}
//         component={Comp} exact={true}
//       // render={props => {
//       //   return
//       //   <Comp {...props} />
//       // }
//       />
//     )
//   }
//   else {
//     return (
//       <Route exact path="/dashboard" render={() => <Redirect to="/home" />} />
//     )

//   }

//  (
//         );
//     }}
//   />
// );
// };



const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <IonApp>
      <IonReactRouter >
        {/* <IonPage> */}
        <IonRouterOutlet >
          <Route path="/dashboard">
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Route>
          <Route forceRefresh={true} path="/login" component={Login} />

          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route forceRefresh={true} path="/logout" component={LogOut} exact={true} />

        </IonRouterOutlet>
        {/* </IonPage> */}
      </IonReactRouter>
    </IonApp>
  </Provider>
);

export default App;
