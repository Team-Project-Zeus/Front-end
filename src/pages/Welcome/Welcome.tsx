import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton, IonButton, IonRow, IonSplitPane, IonPage } from "@ionic/react";
import { Link } from 'react-router-dom';
import '../../theme/styling.css';
import { SideBar } from '../../utils/sideBar';


export default class Welcome extends React.Component<any, any> {
    render() {
        return (

            <IonSplitPane contentId='content2'>

                <IonMenu contentId='content2' type='push' >
                    {/* <IonContent>
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
                    </IonRow> */}
                    <SideBar />
                </IonMenu>

                <IonPage id='content2'>

                    <IonRow id="toprow">
                        <IonMenuButton></IonMenuButton>
                        <IonHeader>
                            <IonToolbar color="primary">
                                <IonTitle>Home</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                    </IonRow>
                    <IonRow>
                        <IonTitle>Welcome!</IonTitle>
                    </IonRow>
                </IonPage>
            </IonSplitPane>

        )
    }
}