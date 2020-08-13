import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import ImagesSectionDumb from './ImagesSectionDumb'
import { EventImage } from '../../../model/EventImage';
import { updateEventImages, uploadEventImagesS3, fetchEventImagesS3 } from '../../../actions/ImageActions';
import { Button } from '@material-ui/core';

interface ImagesSectionProps {
    isError: boolean,
    isLoading: boolean,
    eventImages: EventImage[],
    eventId: number,
    updateEventImages: (images: EventImage[]) => void,
    uploadEventImagesS3: (images: EventImage[], eventId: number) => void,
    fetchEventImagesS3: (eventId: number) => void
}


function ImagesSectionSmart({ eventId, isError, isLoading, eventImages, updateEventImages, uploadEventImagesS3, fetchEventImagesS3 }: ImagesSectionProps) {
    useEffect(() => {
        fetchEventImagesS3(eventId) // to move this in the main component
    }, [fetchEventImagesS3, eventId]);
    
    return (
        <>
        <ImagesSectionDumb
            isError={isError}
            isLoading={isLoading}
            eventImages={eventImages}
            updateEventImages={updateEventImages}
            
        />
        <Button onClick={() => uploadEventImagesS3(eventImages, eventId)}>Upload</Button>
        </>
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
