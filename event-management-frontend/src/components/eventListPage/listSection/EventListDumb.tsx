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
import { EventSortProps } from "../../../model/EventSort";
import { useTranslation } from "react-i18next";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useListStyles } from '../../../styles/eventListStyles';

interface Props {
    sort: EventSortProps;
    eventsDetails: any[];
    handleSortEvent: (criteria: string, type: string) => void;
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
    const classes = useListStyles()

    const sort = props.sort;
    const eventsDetails = props.eventsDetails;
    const handleSortEvent = props.handleSortEvent;
    const goToPrevPage = props.goToPrevPage;
    const goToNextPage = props.goToNextPage;

    const [criteria, setCriteria] = useState();
    const [type, setType] = useState();
    const [expanded, setExpanded] = useState(false)
    const [t] = useTranslation();

    const stickyDiv: React.RefObject<HTMLInputElement> = React.createRef()

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
        handleSortEvent(criteria, type);
    }, [criteria, type, handleSortEvent]);


    useScrollPosition(
        ({ prevPos, currPos }) => {

            // compute the height of the sticky area
            const elementHeight = stickyDiv.current ? stickyDiv.current.offsetHeight : 0

            // get the maximum value between sticky area height and window height
            const height = elementHeight < window.outerHeight ? elementHeight : window.outerHeight

            // collapse on scrolling up or on a quick scroll down
            if ((prevPos.y > currPos.y + height) || (prevPos.y < currPos.y)) {
                setExpanded(false)
            }
        },
        [expanded],
        undefined,
        false,
        300
    )

    return (
        <TableContainer component={Paper} className={classes.pageContainer}>
            <div
                className={classes.stickyArea}
                ref={stickyDiv}>

                <Link to={`/newEvent`} style={{ textDecoration: 'none' }}>
                    <Button className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3} ${commonClasses.buttonStyle4}`}>{t("eventList.createNewEventButton")}</Button>
                </Link>

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
                                size={"medium"}>

                                <TableSortLabel
                                    hideSortIcon={!headCell.numeric}
                                    active={criteria === headCell.id && headCell.numeric && sort.criteria !== ""}
                                    direction={criteria === headCell.id ? type : 'asc'}
                                    onClick={createSortHandler(headCell.id)}>

                                    {headCell.label}

                                    {
                                        criteria === headCell.id && headCell.numeric ?
                                            (
                                                <span className={`${commonClasses.visuallyHidden}`} >
                                                    {type === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </span>
                                            ) : null
                                    }
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