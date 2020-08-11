import React from 'react'
import { connect } from 'react-redux';
import ImagesSectionDumb from './ImagesSectionDumb'
import { EventImage } from '../../../model/EventImage';
import { updateEventImages } from '../../../actions/ImageActions';

interface ImagesSectionProps {
    eventImages: EventImage[],
    updateEventImages: (images: EventImage[]) => void,
}


function ImagesSectionSmart({ eventImages, updateEventImages }: ImagesSectionProps) {
    return (
        <ImagesSectionDumb
            eventImages={eventImages}
            updateEventImages={updateEventImages}/>
    )
}

const mapStateToProps = ({ eventCrud }: any) => ({
    eventImages: eventCrud.images
});


export default connect(
    mapStateToProps,
    {updateEventImages}
)(ImagesSectionSmart);
