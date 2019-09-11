
import React, { FormEvent, useState } from 'react';
// @ts-ignore
import { ReactAgenda, ReactAgendaCtrl, guid, Modal } from 'react-agenda';
import './AgendaStyle.css';
import './DateTimeStyle.css';
import axios from 'axios';
import { environment } from '../enviroment';


require('moment/locale/nl.js');




type MyProps = { history: History };
type MyState = {
    items: any,
    selected: [],
    cellHeight: 30,
    showModal: false,
    locale: "nl",
    rowsPerHour: 2,
    numberOfDays: 5,
    startDate: Date,
};

var colors = {
    'color-1': "rgba(102, 195, 131 , 1)",
    "color-2": "rgba(242, 177, 52, 1)",
    "color-3": "rgba(235, 85, 59, 1)"
}

var now = new Date();
var items = [
    {
        _id: guid(),
        name: 'Meeting , dev staff!',
        startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
        endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
        classes: 'color-1'
    },
    {
        _id: guid(),
        name: 'Working lunch , Holly',
        startDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 0),
        endDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 13, 0),
        classes: 'color-2 color-3'
    },

];

export default class Dashboard extends React.Component<MyProps, MyState> {
    config = {
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'Authorization', '': 'Bearer ' + localStorage.getItem('authToken') }
    };

    constructor(props: any) {
        super(props);
        this.state = {
            items: items,
            selected: [],
            cellHeight: 30,
            showModal: false,
            locale: "nl",
            rowsPerHour: 2,
            numberOfDays: 5,
            startDate: new Date(),
        };

        this.handleCellSelection = this.handleCellSelection.bind(this);
        this.handleItemEdit = this.handleItemEdit.bind(this);
        this.handleRangeSelection = this.handleRangeSelection.bind(this);
    }

    componentDidMount() {
        const data = axios.post(environment.API_URL + "/" + localStorage.getItem('useremail'), this.config).then(response => response.data)
            .then((data) => {
                console.dir(data)
                return data
            })
    }

    handleCellSelection(item: any) {
        console.log('handleCellSelection', item);
    }
    handleItemEdit(item: any) {

        console.log('handleItemEdit', item);
    }
    handleRangeSelection(item: any) {
        console.log('handleRangeSelection', item);
    }
    render() {
        return (
            <div>
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
                    onCellSelect={this.handleCellSelection.bind(this)}
                    onRangeSelection={this.handleRangeSelection.bind(this)} />
            </div>
        );
    }
}