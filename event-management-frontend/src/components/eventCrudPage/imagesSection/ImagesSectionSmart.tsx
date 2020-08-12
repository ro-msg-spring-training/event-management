import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import ImagesSectionDumb from './ImagesSectionDumb'
import { EventImage } from '../../../model/EventImage';
import { updateEventImages, uploadEventImagesS3, fetchEventImagesS3 } from '../../../actions/ImageActions';

interface ImagesSectionProps {
    isError: boolean,
    isLoading: boolean,
    eventImages: EventImage[],
    updateEventImages: (images: EventImage[]) => void,
    uploadEventImagesS3: (images: EventImage[]) => void,
    fetchEventImagesS3: () => void
}


function ImagesSectionSmart({ isError, isLoading, eventImages, updateEventImages, uploadEventImagesS3, fetchEventImagesS3 }: ImagesSectionProps) {
    useEffect(() => {
        fetchEventImagesS3() // to move this in the main component
    }, [fetchEventImagesS3]);
    return (
        <ImagesSectionDumb
            isError={isError}
            isLoading={isLoading}
            eventImages={eventImages}
            updateEventImages={updateEventImages}
            uploadEventImagesS3={uploadEventImagesS3}
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
    { updateEventImages, uploadEventImagesS3, fetchEventImagesS3 }
)(ImagesSectionSmart);
