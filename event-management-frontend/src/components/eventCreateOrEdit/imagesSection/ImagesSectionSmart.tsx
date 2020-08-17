import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import ImagesSectionDumb from './ImagesSectionDumb'
import { EventImage } from '../../../model/EventImage';
import { updateEventImages } from '../../../actions/ImageActions';

interface ImagesSectionProps {
    isError: boolean,
    isLoading: boolean,
    eventImages: EventImage[],
    updateEventImages: (images: EventImage[]) => void,
}


function ImagesSectionSmart({ isError, isLoading, eventImages, updateEventImages }: ImagesSectionProps) {
    return (
        <ImagesSectionDumb
            isError={isError}
            isLoading={isLoading}
            eventImages={eventImages}
            updateEventImages={updateEventImages}
        />
    )
}

const mapStateToProps = ({ eventImages }: any) => ({
    eventImages: eventImages.images,
    isError: eventImages.isError,
    isLoading: eventImages.isLoading
});

export default connect(
    mapStateToProps,
    { updateEventImages }
)(ImagesSectionSmart);
