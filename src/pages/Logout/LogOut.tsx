import { IonHeader, IonToolbar, IonTitle, IonText, IonContent, IonRow } from "@ionic/react";
import React from 'react';
import store from "../../store/store";





export default class LogOut extends React.Component {


  constructor(props: any) {
    super(props);
    //Clears token from localstorage
    localStorage.clear();
    //Sends reset to store
    store.dispatch({
      type: 'RESET'
    });
    window.setTimeout(function () {
      // Move to a new location or you can do something else
      props.history.push('login');
    }, 3000);
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>LogOut</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonRow>
            <IonTitle>Logged out!</IonTitle>
          </IonRow>
        </IonContent>
      </>
    );
  }
}