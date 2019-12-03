import React, { Component } from "react";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonList, IonRow, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";

class sb extends Component<any, any> {

    render() {
        return (
            <>
                <IonContent>
                    <IonHeader>
                        <IonToolbar color="primary">
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonItem color="primary">Ingelogd als: {localStorage.getItem('role')}</IonItem>
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
            </>
        );
    }
}

export const SideBar = sb;