
import React from 'react';
// @ts-ignore
import { ReactAgenda, guid, Modal } from 'react-agenda';
import './AgendaStyle.css';
import './DateTimeStyle.css';
import axios from 'axios';
import { environment } from '../../enviroment';

import ModifiedReactAgendaItem from '../../modifiedAgenda/modifiedReactAgendaItem';
import ModifiedReactAgendaCtrl from '../../modifiedAgenda/modifiedReactAgendaCtrl';

import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton, IonButton, IonCol, IonRow, IonSplitPane, IonPage } from "@ionic/react";
import { Link } from 'react-router-dom';
import '../../theme/styling.css';
import { Icon } from 'ionicons/dist/types/icon/icon';


require('moment/locale/nl.js');


type MyProps = { history: History };
type MyState = {
    items: any,
    selected: any,
    cellHeight: 30,
    showEdit: boolean,
    showCreate: boolean,
    locale: "nl",
    rowsPerHour: 2,
    numberOfDays: 5,
    startDate: Date,
    startAtTime: 6,
    endAtTime: 23,
};

var colors = {
    'color-1': "rgba(102, 195, 131 , 1)",
    "color-2": "rgba(242, 177, 52, 1)",
    "color-3": "rgba(235, 85, 59, 1)"
}

var now = new Date();

export default class Dashboard extends React.Component<MyProps, MyState> {

    constructor(props: any) {

        super(props);
        this.state = {
            items: [],
            selected: [],
            cellHeight: 30,
            showEdit: false,
            showCreate: false,
            locale: "nl",
            rowsPerHour: 2,
            numberOfDays: 5,
            startDate: new Date(),
            startAtTime: 6,
            endAtTime: 23,
        };

        this.setState({ 'startDate': now });


        this.handleCellSelection = this.handleCellSelection.bind(this);
        this.handleItemEdit = this.handleItemEdit.bind(this);
        this._openEdit = this._openEdit.bind(this)
        this._closeEdit = this._closeEdit.bind(this)
        this._closeCreate = this._closeCreate.bind(this)

        this.handleRangeSelection = this.handleRangeSelection.bind(this);
    }

    componentDidMount() {
        console.dir(axios.defaults.headers.common);

        axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('token')}` }

        axios.get(environment.APPOINTMENT_URL + "student").then(response => response.data)
            .then((data) => {
                const items = [];
                if (typeof data === 'string') {
                    return null;
                }
                else {
                    for (var x = 0; data.length > x; x++) {
                        var item = {
                            _id: guid(),
                            name: data[x].driving_instructor,
                            startDateTime: new Date(data[x]['start_time']),
                            endDateTime: new Date(data[x]['end_time']),
                            classes: 'color-2 color-3'
                        }

                        items.push(item)
                    }
                    this.setState({ 'items': items });
                    return data
                }
            })
    }

    handleCellSelection(item: any) {
        console.log('handleCellSelection', item);
    }

    handleItemEdit(item: any) {
        if (item && this.state.showEdit === false) {
            this.setState({ 'selected': [item] });
            this._closeEdit("test");
            return this._openEdit();
        }
    }

    _openEdit() {
        this.setState({ 'showEdit': true })
    }
    _closeEdit(e: any) {
        // if (e) {
        //     e.stopPropagation();
        //     e.preventDefault();
        // }
        this.setState({ 'showEdit': false })
    }
    _closeCreate(e: any) {
        // if (e) {
        //     e.stopPropagation();
        //     e.preventDefault();
        // }
        this.setState({ 'showCreate': false })
    }

    handleRangeSelection(item: any) {
        console.log('handleRangeSelection', item);
    }

    render() {
        return (
            <div>
                <IonSplitPane contentId='content2'>

                    <IonMenu contentId='content2' type='push' >
                        <IonContent>
                            <IonHeader>
                                <IonToolbar color="primary">
                                    <IonTitle>Menu</IonTitle>
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

                    <IonPage id='content2'>
                        <IonRow id="toprow">
                            <IonHeader>
                                <IonToolbar color="primary">
                                    <IonTitle>Dashboard</IonTitle>
                                </IonToolbar>
                            </IonHeader>
                            <IonMenuButton></IonMenuButton>

                        </IonRow>
                        <ReactAgenda
                            minDate={now}
                            maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
                            disablePrevButton={false}
                            startDate={this.state.startDate}
                            cellHeight={this.state.cellHeight}
                            locale={this.state.locale}
                            items={this.state.items}
                            numberOfDays={this.state.numberOfDays}
                            rowsPerHour={this.state.rowsPerHour}
                            itemColors={colors}
                            autoScale={false}
                            fixedHeader={true}
                            onItemEdit={this.handleItemEdit.bind(this)}
                            itemComponent={ModifiedReactAgendaItem}
                            onCellSelect={this.handleCellSelection.bind(this)}
                            startAtTime={this.state.startAtTime}
                            endAtTime={this.state.endAtTime}

                            onRangeSelection={this.handleRangeSelection.bind(this)} />
                        <IonButton float-right >
                            Toevoegen
                        </IonButton>
                        {
                            this.state.showEdit ? <Modal clickOutside={this._closeEdit} >
                                <div className="modal-content">
                                    <ModifiedReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} />
                                </div>
                            </Modal> : ''

                        }
                        {
                            this.state.showCreate ? <Modal clickOutside={this._closeCreate} >
                                <div className="modal-content">
                                    <ModifiedReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} />
                                </div>
                            </Modal> : ''

                        }
                    </IonPage>
                </IonSplitPane>

            </div>

        );
    }
}