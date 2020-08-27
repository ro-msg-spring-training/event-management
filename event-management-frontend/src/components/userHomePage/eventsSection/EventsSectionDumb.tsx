import React from 'react'
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

interface Props {
    past?: boolean
}

function EventsSectionDumb({ past }: Props) {
    return (
        <Card>
            <CardHeader
                title={past ? 'Past events' : 'Upcoming events'}
            />

            <CardContent>
                
            </CardContent>

            <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
                <NavigateBeforeIcon />
                <NavigateNextIcon />
            </CardActions>
        </Card>
    )
}

export default EventsSectionDumb;
