import React from 'react'
import EventsSectionDumb from './EventsSectionDumb'

interface Props {
    past?: boolean
}

function EventsSectionSmart({ past }: Props) {

    return (
        <EventsSectionDumb past={past}/>
    )
}

export default EventsSectionSmart;
