import React, { useLayoutEffect, useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import {Button, Container, Typography} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles/CommonStyles";
import { useTranslation } from "react-i18next";
import { useListStyles} from "../../styles/eventListStyles";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";


interface Props {
    page: number;
    incrementPage: () => void;
    decrementPage: () => void;

    eventsDetails: any[];
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


const HomeEventListDumb = (props: Props) => {
    const commonClasses = useStyles()

    const eventsDetails = props.eventsDetails;
    const goToPrevPage = props.goToPrevPage;
    const goToNextPage = props.goToNextPage;

    const [width, setWidth] = useState(window.innerWidth);
    const [t] = useTranslation();

    useLayoutEffect(() => {
        function updateSize() {
            setWidth(window.innerWidth);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);


    return (
        <Container>
            <TableBody className={commonClasses.floatRight}>
                <Card className={commonClasses.cardRoot} variant="outlined">
                    <CardContent>
                        <Typography variant="h2" component="h2">
                            Events
                        </Typography>
                    </CardContent>
                </Card>
                {eventsDetails}
                <Card className={commonClasses.cardRoot} variant="outlined">
                    <CardContent>
                        <Link to={`/admin/newEvent`} style={{textDecoration: 'none'}}>
                            <Button
                                className={`${commonClasses.buttonStyle2} 
                                ${commonClasses.buttonStyle3} 
                                ${commonClasses.buttonStyle4}`}>{t("eventList.createNewEventButton")}</Button>
                        </Link>
                    </CardContent>
                </Card>
            </TableBody>
        </Container>
    );
}

export default HomeEventListDumb;