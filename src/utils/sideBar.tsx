import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton, IonButton, IonCol, IonRow, IonSplitPane } from "@ionic/react";

import React, { Component } from 'react';
import { Link } from "react-router-dom";



type Props = {
  location: string;
}

class sideBar extends Component<Props, any> {

  constructor(props: any) {
    super(props);
    console.log(this.props.location);
    // !.setAttribute('disabled', 'disabled');
    // var element = <HTMLInputElement> document.getElementById("btnExcel");

  }
  componentDidMount() {

    console.log(this.props.location);
    console.dir();
    document.getElementById(this.props.location)!.setAttribute("disabled", "true");
  }
  render() {
    console.log("test");
    return (
      <>
        <IonMenuButton></IonMenuButton>
        {/* <IonSplitPane> */}
        <IonMenu menuId="first" contentId='content' >
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Start Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent id='content' >
            <IonList>
              <IonRow>
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
        </IonMenu>
        {/* </IonSplitPane> */}

      </>)
  }

}
export const SideBar = sideBar;