
import React, { Key } from 'react';
// @ts-ignore
import { ReactAgenda, guid, Modal } from 'react-agenda';
import './AgendaStyle.css';
import './DateTimeStyle.css';
import axios from 'axios';
import { environment } from '../../enviroment';

import ModifiedReactAgendaItem from '../../modifiedAgenda/modifiedReactAgendaItem';
import ModifiedReactAgendaCtrl from '../../modifiedAgenda/modifiedReactAgendaCtrl';

import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuButton, IonButton, IonRow, IonSplitPane, IonPage, IonFab, IonIcon, IonModal, IonAlert, IonLabel, IonCheckbox, IonPopover, IonFabList } from "@ionic/react";
import '../../theme/styling.css';
import { add, list } from 'ionicons/icons';
import { createError } from '../../utils/errorCodes';
import { SideBar } from '../../utils/sideBar';


require('moment/locale/nl.js');


type MyState = {
    items: any,
    selected: any,
    cellHeight: 30,
    showEdit: boolean,
    showCreate: boolean,
    showError: boolean,
    showMessage: boolean,
    messageTitle: string,
    messageContent: string,

    error: number,
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
var modalContent: any;

var now = new Date();

export default class Dashboard extends React.Component<any, MyState> {

    constructor(props: any) {
        axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('token')}` }

        super(props);
        this.state = {
            items: [],
            selected: [],
            cellHeight: 30,
            showEdit: false,
            showCreate: false,
            showError: false,
            showMessage: false,
            error: 0,
            messageTitle: "",
            messageContent: "",
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
        this._closeEdit = this._closeEdit.bind(this)
        this._closeCreate = this._closeCreate.bind(this)
        this.handleRangeSelection = this.handleRangeSelection.bind(this);
    }


    componentDidMount() {
        const userRole = localStorage.getItem('role');
        if (userRole == "driving_instructor") {
            var location = "/instructor";
        }
        else {
            var location = "/student";

        }
        axios.get(environment.APPOINTMENT_URL + location).then(response => response.data)
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
                        // console.dir(data[x]);
                        for (var y = x + 1; data.length > y; y++) {
                            if (data[x]['end_time'] == data[y]['start_time'] && data[x][oppositeRole] == data[y][oppositeRole]) {
                                data[x]['end_time'] = data[y]['end_time'];
                                data.splice(y, 1);
                                y--;
                                //Because of the splice the next item is now at the spot of the current item on Y,
                                // so to make sure it won't skip it needs to go back 1
                            }
                        }

                        var name = data[x].user.name ? data[x].user.name : "vrij";

                        var item = {
                            _id: guid(),
                            name: name,
                            startDateTime: new Date(data[x]['start_time']),
                            endDateTime: new Date(data[x]['end_time']),
                            classes: 'color-2 color-3'
                        }

                        items.push(item)
                    }
                    this.setState({ 'items': items });
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

    handleCellSelection(item: any) {
        console.log('handleCellSelection', item);
    }

    handleItemEdit(item: any) {
        if (item && this.state.showEdit === false) {
            this.setState({ 'selected': [item] });
            this._closeEdit("test");
            return this.open("showEdit");
        }
    }

    handleRangeSelection(item: any) {
        console.log('handleRangeSelection', item);
    }


    open(item: string) {
        // var key = 'showCreate';
        switch (item) {
            case 'showError':
                this.setState({
                    'showError': true
                })
                break;
            case 'showEdit':
                this.setState({ 'showEdit': true });
                break;
            default:
                this.setState({ 'showMessage': true });
                break;
        }
    }

    async _openCreate() {

        modalContent = await this.retrieveAvailable();
        if (modalContent != null) {
            this.setState({ 'showCreate': true });
        }
    }

    _closeEdit(e: any) {
        this.setState({ 'showEdit': false })
    }
    _closeCreate(e: any) {
        this.setState({ 'showCreate': false })
    }
    _closeMessage(e: any) {
        // this.setState({ 'showMessage': false })
    }
    _closeError(e: any) {
        // this.setState({ 'showError': false })
    }




    redirect(location: string) {
        try {
            this.props.history.push(location);
        }
        catch (e) {
            console.log(e);
        }

    }


    async retrieveAvailable() {
        var response;
        await axios.get(environment.APPOINTMENT_URL + "/availability").then(response => response.data)
            .then((data) => {
                if (typeof data === 'string') {
                    // this.setState({ 'error': "er zijn geen beschikbaren afspraken!" });
                    // this._openError();
                    return null;
                }
                else {
                    const listItems = data.map((data: any) => (
                        <IonItem key={data.id} >
                            <IonLabel>{data['start_time']} - {data['end_time']}</IonLabel>
                            <IonCheckbox slot="end" value={data.id} class="checkboxes" />
                        </IonItem >
                    )
                    );
                    response = <IonList>{listItems}</IonList>;



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

        return response;

    }

    async reserve() {
        var selected: Array<Number> = [];

        for (var x = 0; x < document.getElementsByClassName("checkboxes").length; x++) {
            var checkbox = document.getElementsByClassName('checkboxes')[x] as HTMLInputElement
            if (checkbox.checked) {
                selected.push(parseInt(checkbox.value));
            }
        }

        var JSONresponse = {
            "id": selected
        }

        await axios.patch(environment.APPOINTMENT_URL, JSONresponse).then(response => response.data)
            .then((data) => {
                this.setState({ 'messageTitle': "Succesvol toegevoegd" });
                this.open("showMessage");
                this.setState({ 'messageContent': "U heeft nu een paar afspraken met de gebruiker" });
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

    render() {
        return (
            <div>

                <IonFab vertical="bottom" horizontal="end" >
                    <IonButton onClick={() => this._openCreate()}>
                        <IonIcon icon={add} />
                    </IonButton>
                </IonFab >

                <IonSplitPane contentId='content2'>

                    <IonMenu contentId='content2' type='push' >
                        <SideBar />
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


                        <IonFab vertical="bottom" horizontal="end" >
                            <IonButton onClick={() => this._openCreate()}>
                                <IonIcon icon={add} />
                            </IonButton>
                        </IonFab>


                        <IonPopover isOpen={this.state.showCreate} id="popOver">
                            <IonContent id="popOver">
                                <IonList class="modalList">
                                    {modalContent}
                                </IonList>
                            </IonContent>
                            <IonRow >
                                <IonButton onClick={() => this.reserve()}>afspraak aanvragen</IonButton>
                                <IonButton onClick={() => this._closeCreate(this)}>sluiten</IonButton>
                            </IonRow>
                        </IonPopover>
                        {
                            this.state.showEdit ? <Modal clickOutside={this._closeEdit} >
                                <div className="modal-content">
                                    <ModifiedReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} />
                                </div>
                            </Modal> : ''

                        }

                        <IonAlert
                            isOpen={this.state.showError}
                            onDidDismiss={this._closeError}
                            header={'Er is een probleem opgetreden'}
                            message={createError(this.state.error)}
                            buttons={[
                                {
                                    text: 'Okay',
                                    handler: () => {
                                        if (this.state.error) {
                                            this.redirect('login');
                                        }
                                        else {

                                        }
                                    }
                                }
                            ]}
                        />

                        <IonAlert
                            isOpen={this.state.showMessage}
                            onDidDismiss={this._closeMessage}
                            header={this.state.messageTitle}
                            message={this.state.messageContent}
                            buttons={[
                                {
                                    text: 'Okay',
                                    handler: () =>
                                        this._closeMessage
                                }
                            ]}
                        />
                    </IonPage>
                </IonSplitPane>

            </div >

        );
    }
}