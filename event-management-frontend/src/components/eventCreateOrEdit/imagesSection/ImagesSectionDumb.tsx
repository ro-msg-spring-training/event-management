import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { ReactSortable } from 'react-sortablejs'
import { Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, LinearProgress, Paper } from '@material-ui/core'
import { useStyle } from '../../../styles/ImagesSectionStyles'
import { EventImage } from '../../../model/EventImage'
import CancelIcon from '@material-ui/icons/Cancel';
import { useTranslation } from "react-i18next";

interface ImagesSectionProps {
  isError: boolean;
  isLoading: boolean;
  eventImages: EventImage[];
  updateEventImages: (images: EventImage[]) => void;
}

function ImagesSectionDumb({ isError, isLoading, eventImages, updateEventImages }: ImagesSectionProps) {
  const classes = useStyle();
  const { t, i18n } = useTranslation();

  const [images, setImages] = useState<EventImage[]>(eventImages);
  const [open, setOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<EventImage>();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const byteArr = reader.result;
        const id = `image-${file.size}-${Date.now()}-${file.name}`; // image id
        const elem = { id: id, name: file.name, url: byteArr, file: file };
        setImages((prevState) => [...prevState, elem]);
      };
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ accept: "image/*", onDrop });

  const setImageAsDeleted = (item: EventImage) => {
    var array = [...images];
    var index = array.indexOf(item);
    if (index !== -1) {
      array[index].deleted = true;
      setImages(array);
    }
  };

  const handleClickOpen = (item: EventImage) => {
    setItemToDelete(item)
    setOpen(true);
  };

  const handleCloseConfirm = () => {
    setImageAsDeleted(itemToDelete as EventImage)
    setItemToDelete(undefined)
    setOpen(false);
  };

  const handleCloseDecline = () => {
    setItemToDelete(undefined)
    setOpen(false);
  };

  useEffect(() => {
    updateEventImages(images)
  }, [images, updateEventImages]);

  return (
    <Paper className={classes.imagesArea}>
      <div {...getRootProps()} className={classes.dragndrop}>
        <input {...getInputProps()} />
        <p>{t("welcome.imageDragAndDrop")}</p>
      </div>

      <div className={classes.imagesContainerWrapper}>
        {
          isError ?
            <p>{t("welcome.imageErrorMessage")}</p> :
            isLoading ?
              <LinearProgress /> :
              images.length !== 0 ?
                <ReactSortable
                  list={images}
                  setList={setImages}
                  direction="horizontal"
                  animation={150}
                  className={`${classes.imagesContainer} MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3`}>

                  {images.filter(item => item.deleted === undefined).map(item => (
                    <Grid
                      item
                      xs={12} sm={6} md={4} lg={2}
                      key={item.id}
                      className={classes.imageWrapper}>

                      <CancelIcon
                        onClick={() => handleClickOpen(item)}
                        className={classes.deleteButton} />

                      <img alt={item.name} src={item.url} className={classes.image} />
                    </Grid>
                  ))}

                </ReactSortable> :
                null
        }
      </div>

      <Dialog
        open={open}
        onClose={handleCloseDecline}>

        <DialogTitle>
          {t("welcome.imageDialogTitle")}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {t("welcome.imageDialogContent")}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDecline} color="primary">
            {t("welcome.imageDialogDisagree")}
          </Button>

          <Button onClick={handleCloseConfirm} color="primary" autoFocus>
            {t("welcome.imageDialogAgree")}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

export default ImagesSectionDumb;
