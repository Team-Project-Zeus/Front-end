import { IonHeader, IonToolbar, IonTitle, IonText, IonContent } from "@ionic/react";
import React from 'react';
import store from "../store/store";





export default class LogOut extends React.Component {


  constructor(props: any) {
    super(props);
    //Clears token from localstorage
    localStorage.clear();
    //Sends reset to store
    store.dispatch({
      type: 'RESET'
    })
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
          <IonText>Logged out!</IonText>
        </IonContent>
      </>
    );
  }
}