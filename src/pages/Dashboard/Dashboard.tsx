
import React from 'react';
// @ts-ignore
import { ReactAgenda, guid, Modal } from 'react-agenda';
import './AgendaStyle.css';
import './DateTimeStyle.css';
import axios from 'axios';
import { environment } from '../../enviroment';

import ModifiedReactAgendaItem from '../../modifiedAgenda/modifiedReactAgendaItem';
import ModifiedReactAgendaCtrl from '../../modifiedAgenda/modifiedReactAgendaCtrl';

import { SideBar } from '../../utils/sideBar';
import { IonRow } from '@ionic/react';

require('moment/locale/nl.js');


type MyProps = { history: History };
type MyState = {
    items: any,
    selected: any,
    cellHeight: 30,
    showModal: boolean,
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
            showModal: false,
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
        this._openModal = this._openModal.bind(this)
        this._closeModal = this._closeModal.bind(this)
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
        if (item && this.state.showModal === false) {
            this.setState({ 'selected': [item] });
            this._closeModal("test");
            return this._openModal();
        }
    }

    _openModal() {
        this.setState({ 'showModal': true })
    }
    _closeModal(e: any) {
        // if (e) {
        //     e.stopPropagation();
        //     e.preventDefault();
        // }
        this.setState({ 'showModal': false })
    }

    handleRangeSelection(item: any) {
        console.log('handleRangeSelection', item);
    }

    render() {
        return (
            <div>
                <IonRow id="toprow">
                    <SideBar location='dashboard' />
                    <p>Title</p>
                </IonRow>
                <ReactAgenda
                    minDate={now}
                    maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
                    disablePrevButton={false}
                    startDate={this.state.startDate}
                    startAtTime={this.state.startAtTime}
                    endAtTime={this.state.endAtTime}

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
                    onRangeSelection={this.handleRangeSelection.bind(this)} />
                {
                    this.state.showModal ? <Modal clickOutside={this._closeModal} >
                        <div className="modal-content">
                            <ModifiedReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} />

                        </div>
                    </Modal> : ''
                }
            </div>

        );
    }
}