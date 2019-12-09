import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton, IonButton, IonRow, IonSplitPane, IonPage, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonAlert, IonLabel, IonText } from "@ionic/react";
import { Link } from 'react-router-dom';
import '../../theme/styling.css';
import { SideBar } from '../../utils/sideBar';
import axios from 'axios';
import { environment } from '../../enviroment';
import { createError } from '../../utils/errorCodes';
import store from '../../store/store';

type MyState = {
    showError: boolean,
    error: number,
    items: any,
};

export default class Welcome extends React.Component<any, MyState> {


    constructor(props: any) {
        axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('token')}` }

        super(props);
        this.state = {
            items: <IonList>

            </IonList>,
            showError: false,
            error: 0,
        };
    }

    componentDidMount() {
        axios.get(environment.APPOINTMENT_URL + "/daily").then(response => response.data)
            .then((data) => {
                const items = [];
                if (typeof data === 'string') {
                    return null;
                }
                else {
                    if (localStorage.getItem('role') == "driving_instructor")
                        var oppositeRole = "student"
                    else
                        var oppositeRole = "driving_instructor"

                    for (var x = 0; data.length > x; x++) {
                        //Runs by the data to check if any can be combined into one object
                        for (var y = x + 1; data.length > y; y++) {
                            if (data[x]['end_time'] == data[y]['start_time'] && data[x][oppositeRole] == data[y][oppositeRole]) {
                                data[x]['end_time'] = data[y]['end_time'];
                                data.splice(y, 1);
                                y--;
                                //Because of the splice the next item is now at the spot of the current item on Y,
                                // so to make sure it won't skip it needs to go back 1
                            }
                        }

                        // var name = data[x].user.name ? data[x].user.name : "vrij";

                        var item = {

                            id: data[x]['id'],
                            // name: name,
                            startDateTime: new Date(data[x]['start_time']),
                            endDateTime: new Date(data[x]['end_time']),
                            classes: 'color-2 color-3'
                        }

                        items.push(item)
                    }
                    console.dir(items);
                    const listItems = items.map((item: any) => (
                        <IonItem key={item.id}>
                            <IonLabel>
                                Test
                                {item.id}
                            </IonLabel>
                            <IonText>
                                {item.startDateTime.toLocaleTimeString()} - {item.endDateTime.toLocaleTimeString()}
                            </IonText>
                        </IonItem>
                    )
                    )
                    const list = <IonList>{listItems}</IonList>;
                    console.log(list);
                    this.setState({ 'items': list });

                    return data
                }
            }, (error) => {
                console.error(error.message);
                if (error.message == 'Network Error') {
                    this.setState({ 'error': 404 });
                    this.open("showError");
                }
                else {
                    console.error(error.response.status);
                    this.setState({ 'error': error.response.status });
                    this.open("showError");
                }

            })
    }

    open(item: string) {
        // var key = 'showCreate';
        switch (item) {
            case 'showError':
                this.setState({
                    'showError': true
                })
                break
            default:
                //     this.setState({ 'showMessage': true });
                break;
        }
    }
    redirect(location: string) {
        try {
            this.props.history.push(location);
        }
        catch (e) {
            console.log(e);
        }

    }


    render() {
        return (

            <IonSplitPane contentId='content2'>

                <IonMenu contentId='content2' type='push' >
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
                    <IonContent>


                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Afspraken vandaag</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                {this.state.items}
                            </IonCardContent>
                        </IonCard>
                    </IonContent>
                </IonPage>
                <IonAlert
                    isOpen={this.state.showError}
                    header={'Er is een probleem opgetreden'}
                    message={createError(this.state.error)}
                    buttons={[
                        {
                            text: 'Okay',
                            handler: () => {
                                if (this.state.error) {
                                    this.redirect('login');
                                    axios.defaults.headers.common = {};
                                    localStorage.clear();
                                    //Sends reset to store
                                    store.dispatch({
                                        type: 'RESET'
                                    });
                                }
                                else {

                                }
                            }
                        }
                    ]}
                />
            </IonSplitPane>


        )
    }
}