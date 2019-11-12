import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton, IonButton, IonCol, IonRow, IonSplitPane } from "@ionic/react";

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../theme/styling.css';




type Props = {
  location: string;
}

class sideBar extends Component<Props, any> {

  componentDidMount() {
    document.getElementById(this.props.location)!.setAttribute("disabled", "true");
  }

  render() {
    return (
      <>
        <IonMenuButton></IonMenuButton>
        <IonMenu menuId="first" contentId='content' >
          <IonContent>
            <IonHeader>
              <IonToolbar color="primary">
                <IonTitle>Start Menu</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonList>
              <IonRow >
                <Link to="/home">
                  <IonButton id="welcome">home</IonButton>
                </Link>
              </IonRow>
              <IonRow>
                <Link to="/dashboard">
                  <IonButton id="dashboard">dashboard</IonButton>
                </Link>
              </IonRow>

            </IonList>

          </IonContent>
          <IonRow>
            <Link id="logout" to="/logout">
              <IonButton>logout</IonButton>
            </Link>
          </IonRow>
        </IonMenu>


      </>)
  }

}
export const SideBar = sideBar;