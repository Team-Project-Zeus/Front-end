import { IonHeader, IonToolbar, IonTitle, IonText, IonContent } from "@ionic/react";
import React from 'react';





export default class LogOut extends React.Component {


  constructor(props: any) {
    super(props);
    // localStorage.clear();
    // localStorage.removeItem('useremail')
    // //TODO ADD USER ROLE localStorage.setItem('userRole', user.role)
    // localStorage.removeItem("authToken")
    localStorage.setItem("loggedIn", 'false')
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