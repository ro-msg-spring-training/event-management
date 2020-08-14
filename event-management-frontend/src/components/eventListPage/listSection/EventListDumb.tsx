import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Button, TableFooter, TableSortLabel } from "@material-ui/core";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";
import FilterSectionSmart from "../filterSection/FilterSectionSmart";
import { useStyles } from '../../../styles/CommonStyles';
import { EventSortProps } from "../../../types/EventSortProps";
import { useTranslation } from "react-i18next";


interface Props {
    eventsDetails: any[];
    handleSortEvent: (criteria: string, type: string) => void;
    sort: EventSortProps;
    goToPrevPage: () => void;
    goToNextPage: () => void;
}

interface Data {
    title: string;
    subtitle: string;
    location: string;
    date: number;
    hour: number;
    occRate: number;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}




const EventListDumb = (props: Props) => {
    const commonClasses = useStyles()

    const eventsDetails = props.eventsDetails;
    const handleSortEvent = props.handleSortEvent;
    const sort = props.sort;
    const goToPrevPage = props.goToPrevPage;
    const goToNextPage = props.goToNextPage;

    const [criteria, setCriteria] = useState();
    const [type, setType] = useState();
    const [expanded, setExpanded] = useState(false)

    const { t } = useTranslation();


    const headCells: HeadCell[] = [
        { id: 'date', numeric: true, disablePadding: false, label: t("eventList.date") },
        { id: 'hour', numeric: true, disablePadding: false, label: t("eventList.hour") },
        { id: 'occRate', numeric: true, disablePadding: false, label: t("eventList.occupacyRate") },
    ];

    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        setCriteria(property);
        if (type === "asc") {
            setType("desc");
        } else {
            setType("asc");
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    const handleScroll = (e: any) => {
        console.log('scroll event')
        // if ((window.innerHeight + window.scrollY) < document.body.scrollHeight) {
        //     //show loading spinner and make fetch request to api
        // }
        // else {
        //     setExpanded(false)
        // }
    }


    useEffect(() => {
        handleSortEvent(criteria, type);
    }, [criteria, type, handleSortEvent]);

    return (
        <TableContainer component={Paper} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', overflow: 'visible' }}>
            <Link to={`/newEvent`} style={{ textDecoration: 'none' }}>
    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3} ${commonClasses.buttonStyle4}`}>{t("eventList.createNewEventButton")}</Button>
            </Link>
            <div
                style={{ position: 'sticky', top: '50px', backgroundColor: 'white', zIndex: 2 }} >
                <FilterSectionSmart expanded={expanded} setExpanded={setExpanded} />
            </div>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell key={"title"} align={"left"} padding={"default"} size={"medium"}>{t("eventList.title")}</TableCell>
                        <TableCell key={"subtitle"} align={"left"} padding={"default"} size={"medium"}>{t("eventList.subtitle")}</TableCell>
                        <TableCell key={"location"} align={"left"} padding={"default"} size={"medium"}>{t("eventList.location")}</TableCell>
                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? 'right' : 'left'}
                                padding={headCell.disablePadding ? 'none' : 'default'}
                                sortDirection={criteria === headCell.id && headCell.numeric ? type : false}
                                size={"medium"}
                            >
                                <TableSortLabel
                                    hideSortIcon={!headCell.numeric}
                                    active={criteria === headCell.id && headCell.numeric && sort.criteria !== ""}
                                    direction={criteria === headCell.id ? type : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {criteria === headCell.id && headCell.numeric ? (
                                        <span className={`${commonClasses.visuallyHidden}`} >
                                            {type === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}

                    </TableRow>
                </TableHead>

                <TableBody>
                    {eventsDetails}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell className={`${commonClasses.prev}`}>
                            <Button onClick={goToPrevPage}>&nbsp;&laquo; {t("eventList.previous")} &nbsp;</Button>
                        </TableCell>
                        <TableCell className={`${commonClasses.next}`}>
                            <Button onClick={goToNextPage}>&nbsp; {t("eventList.next")} &raquo;</Button>
                        </TableCell>
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default EventListDumb;