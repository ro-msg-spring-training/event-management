import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { ReactSortable } from 'react-sortablejs'
import { Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { useStyle } from '../../../styles/ImagesSectionStyles'
import { EventImage } from '../../../model/EventImage'
import CancelIcon from '@material-ui/icons/Cancel';

interface ImagesSectionProps {
    updateEventImages: (images: EventImage[]) => void,
    eventImages: EventImage[]
}

function ImagesSectionDumb({ updateEventImages, eventImages }: ImagesSectionProps) {
    const classes = useStyle()

    const [images, setImages] = useState<EventImage[]>(eventImages)
    const [open, setOpen] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader()
            reader.readAsDataURL(file);
            reader.onload = () => {
                const byteArr = reader.result
                const id = `image-${file.name}-${file.size}-${Date.now()}` // image id
                const elem = { id: id, name: file.name, byteArr: byteArr }
                setImages(prevState => [...prevState, elem]);
            }
        });
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ accept: 'image/*', onDrop })

    // const deleteImage = (item: EventImage) => {
    //     console.log('deteted', item)
    //     var array = [...images];
    //     var index = array.indexOf(item)
    //     if (index !== -1) {
    //         array.splice(index, 1);
    //         setImages(array);
    //     }
    // }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        updateEventImages(images)
    }, [images, updateEventImages]);

    return (
        <>
            <div {...getRootProps()} className={classes.dragndrop}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>

            {
                images.length !== 0 ?
                    <ReactSortable list={images} setList={setImages} direction="horizontal" animation={150} className={`${classes.imagesContainer} MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3`}>
                        {images.map(item => (
                            <Grid item xs={12} sm={6} md={4} lg={2} key={item.id} className={classes.imageWrapper}>
                                <CancelIcon
                                    onClick={() => handleClickOpen()}
                                    className={classes.deleteButton} />
                                <img alt={item.name} src={item.byteArr} className={classes.image} />
                            </Grid>
                        ))}
                    </ReactSortable> :
                    null
            }

            <Dialog
                open={open}
                onClose={handleClose}>

                <DialogTitle>
                    Do you want to remove this image?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        If you delete the image, you will not be able to recover it later.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>

                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ImagesSectionDumb