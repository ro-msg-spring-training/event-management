import React from 'react'
import { connect } from 'react-redux';
import ImagesSectionDumb from './ImagesSectionDumb'
import { EventImage } from '../../../model/EventImage';
import { updateEventImages } from '../../../actions/HeaderEventCrudActions'; // to modify import

interface ImagesSectionProps {
    isError: boolean,
    isLoading: boolean,
    eventImages: EventImage[],
    updateEventImages: (images: EventImage[]) => void,
}


function ImagesSectionSmart({ isError, isLoading, eventImages, updateEventImages }: ImagesSectionProps) {
    console.log('in smart images', eventImages)
    return (
        <ImagesSectionDumb
            isError={isError}
            isLoading={isLoading}
            eventImages={eventImages}
            updateEventImages={updateEventImages}
        />
    )
}

const mapStateToProps = ({ eventCrud }: any) => ({
    eventImages: eventCrud.images,
    isError: eventCrud.isError,
    isLoading: eventCrud.isLoading
});

export default connect(
    mapStateToProps,
    { updateEventImages }
)(ImagesSectionSmart);
