import React from 'react'
import { connect } from 'react-redux';
import ImagesSectionDumb from './ImagesSectionDumb'
import { EventImage } from '../../../model/EventImage';

function ImagesSectionSmart({ eventImages }: { eventImages: EventImage[] }) {

    const updateEventImages = (newImages: EventImage[]) => {
        console.log(newImages)
    }

    return (
        <ImagesSectionDumb
            eventImages={eventImages}
            updateEventImages={updateEventImages}></ImagesSectionDumb>
    )
}

const mapStateToProps = ({ eventCrud }: any) => ({
    eventImages: eventCrud.images
});

const mapDispatchToProps = (dispatch: any) => {
    return {
    }
}

export default connect(
    mapStateToProps
)(ImagesSectionSmart);
