import {
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormHelperText,
  Grid,
} from "@material-ui/core";
import { useState } from "react";
import { useStylesCategoryCard } from "../../../../styles/CategoryCardStyle";
import React from "react";
import "../../../../styles/Responsivity.css";
import { EventCrud } from "../../../../model/EventCrud";
import { TicketAvailabilityData } from "../../../../model/TicketAvailabilityData";
import { useTranslation } from "react-i18next";
import { CategoryCardErrors } from "../../../../model/EventFormErrors";

type Props = {
  event: EventCrud;
  id: number;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  ticketsPerCategory: number;
  handleChange: any;
  ticketData: TicketAvailabilityData[];
  formErrors: {
    ticketCategoryDtoList: CategoryCardErrors[];
  };
  removeCard: (id: number) => void;
};

const CategoryCardDumb: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [disableMessage, setDisableMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");

  const { t } = useTranslation();
  const classes = useStylesCategoryCard();

  let categoryData = props.ticketData.filter((data) => data.title === props.title)[0];
  let index = props.event.ticketCategoryDtoList.findIndex((card) => card.id === props.id);

  const removeThisCard = () => {
    if (categoryData && categoryData.sold !== 0) {
      setDisableMessage("Disable");
      setDialogTitle(t("categoryCard.removeTitle"));
      setDialogDescription(t("categoryCard.removePurchased"));
      setOpen(true);
    } else if (
      props.title.trim() !== "" ||
      props.subtitle.trim() !== "" ||
      props.price !== 0 ||
      props.description.trim() !== "" ||
      props.ticketsPerCategory !== 0
    ) {
      setDisableMessage("");
      setDialogTitle(t("categoryCard.removeTitle"));
      setDialogDescription(t("categoryCard.removeEmpty"));
      setOpen(true);
    } else {
      removalApproved();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removalApproved = () => {
    props.removeCard(props.id);
    console.log("torles: ", props.event.ticketCategoryToDelete);
  };

  return (
    <div>
      <Grid item xl={12} lg={12} md={10} sm={12} xs={10}>
        <Card variant="outlined" className={`${classes.root} `}>
          <CardContent className={classes.cardStyle}>
            <Grid item xl={4} sm={7} xs={11} className={classes.marginBasic2}>
              <TextField
                required
                className={classes.marginBasic}
                InputProps={{
                  className: classes.inputBasic,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                name="title"
                variant="outlined"
                label={t("categoryCard.title")}
                error={props.formErrors.ticketCategoryDtoList[index].title.length > 0}
                helperText={props.formErrors.ticketCategoryDtoList[index].title}
                defaultValue={props.title}
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xl={4} sm={7} xs={11} className={classes.marginBasic2} justify="center" alignItems="center">
              <TextField
                variant="outlined"
                className={`${classes.marginBasic}`}
                InputProps={{
                  className: classes.inputBasic,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                name="subtitle"
                label={t("categoryCard.subtitle")}
                defaultValue={props.subtitle}
                onChange={props.handleChange}
                error={props.formErrors.ticketCategoryDtoList[index].subtitle.length > 0}
                helperText={props.formErrors.ticketCategoryDtoList[index].subtitle}
              />
            </Grid>

            <Grid item xl={4} sm={8} xs={11} className={classes.marginBasic3}>
              <FormControl className={classes.marginShortPrice} variant="outlined" required>
                <InputLabel>{t("categoryCard.price")}</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  defaultValue={props.price}
                  onChange={props.handleChange}
                  name="price"
                  type="number"
                  endAdornment={<InputAdornment position="end">RON</InputAdornment>}
                  inputProps={{ className: classes.inputPrice }}
                  labelWidth={50}
                  error={props.formErrors.ticketCategoryDtoList[index].price.length > 0}
                />
                <FormHelperText>{props.formErrors.ticketCategoryDtoList[index].price}</FormHelperText>
              </FormControl>
            </Grid>
            <br />
            <TextField
              required
              className={`${classes.marginLong}`}
              InputProps={{
                className: classes.inputLong,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              name="description"
              multiline
              rows="3"
              fullWidth
              rowsMax="4"
              variant="outlined"
              label={t("categoryCard.description")}
              defaultValue={props.description}
              onChange={props.handleChange}
              error={props.formErrors.ticketCategoryDtoList[index].description.length > 0}
              helperText={props.formErrors.ticketCategoryDtoList[index].description}
            />
            <Grid item container spacing={1}>
              <Grid item lg={9} md={9} sm={9} xs={7}>
                <TextField
                  required
                  className={classes.marginShort}
                  InputProps={{
                    className: classes.inputShort,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="ticketsPerCategory"
                  variant="outlined"
                  label={t("categoryCard.nrOfTickets")}
                  type="number"
                  defaultValue={props.ticketsPerCategory === 0 ? "" : props.ticketsPerCategory}
                  onChange={props.handleChange}
                  error={props.formErrors.ticketCategoryDtoList[index].ticketsPerCategory.length > 0}
                  helperText={props.formErrors.ticketCategoryDtoList[index].ticketsPerCategory}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={4}>
                <Button className={classes.removeButton} onClick={removeThisCard} size="small">
                  {t("categoryCard.remove")}
                </Button>
              </Grid>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">{dialogDescription}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={removalApproved} disabled={disableMessage.length > 0} color="primary">
                    {t("categoryCard.remove")}
                  </Button>
                  <Button onClick={handleClose} color="primary" autoFocus>
                    {t("categoryCard.nevermind")}
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default CategoryCardDumb;
