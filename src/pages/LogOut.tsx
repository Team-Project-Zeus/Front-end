import { IonHeader, IonToolbar, IonTitle, IonText, IonContent } from "@ionic/react";
import React from 'react';
import store from "../store/store";





export default class LogOut extends React.Component {


  constructor(props: any) {
    super(props);
    localStorage.clear();
    // localStorage.removeItem('useremail')
    // //TODO ADD USER ROLE localStorage.setItem('userRole', user.role)
    // localStorage.removeItem("authToken")
    // localStorage.setItem("loggedIn", 'false')
    console.dir(store.getState());
    store.dispatch({
      type: 'RESET'
    })
    console.dir(store.getState());
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