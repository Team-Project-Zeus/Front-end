import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from "@ionic/react";

import React, { Component } from 'react';


class sideBar extends Component<any, any> {

  render() {
    return (
      <>
        <IonMenu side="start" menuId="first">
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Start Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent >
            <IonList>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              < IonItem>Menu Item</IonItem>
            </IonList>
          </IonContent>
        </IonMenu>

        <IonMenu side="start" menuId="custom" class="my-custom-menu">
          <IonHeader>
            <IonToolbar color="tertiary">
              <IonTitle>Custom Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent >
            <IonList>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              < IonItem>Menu Item</IonItem>
            </IonList>
          </IonContent>
        </IonMenu>

        <IonMenu side="end" type="push">
          <IonHeader>
            <IonToolbar color="danger">
              <IonTitle>End Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent >
            <IonList>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              < IonItem>Menu Item</IonItem>
            </IonList>
          </IonContent>
        </IonMenu>

      </>)
  }

}
export const SideBar = sideBar;