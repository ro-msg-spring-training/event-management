import React from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { Tooltip, CardHeader, CardContent, Card, CircularProgress } from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Booking } from "../../../model/userHome/Booking";
import { useEventCardStyle } from "../../../styles/userHomePage.tsx/EventCardStyle";

interface UserHomePageProps {
    bookings: Booking[],
    isError: boolean,
    isLoading: boolean,
    handleOnClick: () => void
}

function CheckInSectionDumb({ bookings, isError, isLoading, handleOnClick }: UserHomePageProps) {
    const classes = useEventCardStyle();

    const onDateChange = () => {
    };

    const dateFormatter = (str: any) => {
        return str;
    };

    const tooltipTitle = (titles: string[]) => {
        return (
            titles?.length ?
                <> {titles.map(t => <p key={t}><b>{t}</b></p>)} </> : ''
        )
    }

    function renderDay(day: MaterialUiPickersDate, selectedDate: MaterialUiPickersDate, dayInCurrentMonth: any, dayComponent: any) {
        const crrDate = day?.format('YYYY-MM-DD')
        const titles = bookings?.filter(b => b.date === crrDate).map(b => b.title)
        const isEvents = titles?.length > 0

        return (
            <Tooltip arrow title={tooltipTitle(titles)}>
                <div>
                    {React.cloneElement(dayComponent, {
                        style: {
                            border: `${isEvents ? '1px solid' : 'none'}`,
                            backgroundColor: `${crrDate===moment().format('YYYY-MM-DD')? '#f2ac0a' : ''}`
                        },
                        onClick: () => {
                            isEvents && handleOnClick();
                        }
                    })}
                </div>
            </Tooltip>
        )
    }

    return (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            <Card>
                <CardHeader
                    className={classes.header}
                    title='Calendar' />

                <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
                    {isError ?
                        'Error' :
                        isLoading ?
                            <CircularProgress></CircularProgress> :
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
                    }
                </CardContent>
            </Card>
        </MuiPickersUtilsProvider>
    );
}

export default CheckInSectionDumb;
