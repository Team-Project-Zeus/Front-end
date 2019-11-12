import React from 'react';
import { IonRow, IonContent, IonText, IonSplitPane } from '@ionic/react';
import { SideBar } from '../../utils/sideBar';

export default class Welcome extends React.Component<any, any> {
    render() {
        return (

            <IonContent>
                <IonRow id="toprow">
                    <SideBar location="welcome" />
                </IonRow>
                <IonText>Welcome!</IonText>
            </IonContent>
        )
    }
}