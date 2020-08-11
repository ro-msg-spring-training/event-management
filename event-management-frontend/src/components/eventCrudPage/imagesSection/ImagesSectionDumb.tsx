import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { ReactSortable } from 'react-sortablejs'
import { Grid } from '@material-ui/core'
import { useStyle } from '../../../styles/ImagesSectionStyles'
import { EventImage } from '../../../model/EventImage'

interface ImagesSectionProps {
    updateEventImages: (images: EventImage[]) => void,
    eventImages: EventImage[] 
}

function ImagesSectionDumb({ updateEventImages, eventImages }: ImagesSectionProps) {
    const [images, setImages] = useState<EventImage[]>(eventImages)
    const classes = useStyle()

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = () => {
                const byteArr = reader.result
                const id = `image-${file.name}-${file.size}` // image id
                const elem = { id: id, name: file.name, byteArr: byteArr }
                setImages(prevState => [...prevState, elem]);
            }
        });
    }, [])

    useEffect(() => {
        updateEventImages(images)
    }, [images, updateEventImages]);

    const { getRootProps, getInputProps } = useDropzone({ accept: 'image/*', onDrop })

    return (
        <>
            <div {...getRootProps()} className={classes.dragndrop}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>

            {
                images.length !== 0 ?
                    <ReactSortable list={images} setList={setImages} direction="horizontal" animation={150} className={`${classes.imageContainer} MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3`}>
                        {images.map(item => (
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <img alt={item.name} key={item.id} src={item.byteArr} className={classes.image} />
                            </Grid>
                        ))}
                    </ReactSortable> :
                    null
            }
        </>
    )
}

export default ImagesSectionDumb