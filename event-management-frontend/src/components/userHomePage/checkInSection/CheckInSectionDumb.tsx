import React, { Fragment, useState } from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { Tooltip, CardHeader, CardContent, Card, CardActions } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const bookings_server = [
    { id: 1, list: ['2020-08-14', '2020-08-15', '2020-08-26'], title: 'electricccccccccccc' },
    { id: 2, list: ['2020-08-26', '2020-08-27', '2020-08-28'], title: 'untold' },
]

let bookings: any[] = [];
bookings_server.forEach(b => {
    const rez = b.list.map((da) => {
        return {
            date: da,
            title: b.title
        }
    })
    bookings = bookings.concat(rez)
})


function CheckInSectionDumb() {

    const onDateChange = () => {
    };

    const dateFormatter = (str: any) => {
        return str;
    };

    const tooltipTitle = (titles: string[]) => {
        return (
            titles.length ?
                <> {titles.map(t => <p key={t}><b>{t}</b></p>)} </> : ''
        )
    }

    function renderDay(day: MaterialUiPickersDate, selectedDate: MaterialUiPickersDate, dayInCurrentMonth: any, dayComponent: any) {
        const crrDate = day?.format('YYYY-MM-DD')
        const titles = bookings.filter(b => b.date === crrDate).map(b => b.title)
        const isEvents = titles.length > 0

        return (
            <Tooltip arrow title={tooltipTitle(titles)}>
                <div>
                    {React.cloneElement(dayComponent, {
                        style: {
                            border: `${isEvents ? '1px solid' : 'none'}`,
                        },
                        onClick: () => {
                            isEvents && alert('hello')
                        }
                    })}
                </div>
            </Tooltip>
        )
    }

    return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            <Card>
                <CardHeader title='Calendar'/>
                
                <CardContent style={{display:'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                        <KeyboardDatePicker
                            disableToolbar
                            showTodayButton={true}
                            value={moment()}
                            format="YYYY-MM-DD"
                            variant="static"
                            onChange={onDateChange}
                            rifmFormatter={dateFormatter}
                            renderDay={renderDay}
                        />
                </CardContent>
            </Card>
        </MuiPickersUtilsProvider>
    );
}

export default CheckInSectionDumb;
