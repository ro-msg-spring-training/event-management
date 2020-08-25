import {
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  FormHelperText,
  Grid,
} from "@material-ui/core";
import { useStylesCategoryCard } from "../../../../styles/CategoryCardStyle";
import React from "react";
import "../../../../styles/Responsivity.css";
import { EventCrud } from "../../../../model/EventCrud";
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
  formErrors: {
    ticketCategoryDtoList: CategoryCardErrors[];
  };
  removeThisCard: () => void;
};

const CategoryCardDumb: React.FC<Props> = ({
  event,
  id,
  title,
  subtitle,
  price,
  description,
  ticketsPerCategory,
  handleChange,
  formErrors,
  removeThisCard,
}: Props) => {
  const { t } = useTranslation();
  const classes = useStylesCategoryCard();
  let index = event.ticketCategoryDtoList.findIndex((card) => card.id === id);

  return (
    <div>
      <Grid item xl={12} lg={12} md={10} sm={12} xs={10}>
        <Card variant="outlined" className={classes.root}>
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
                error={formErrors.ticketCategoryDtoList[index].title.length > 0}
                helperText={formErrors.ticketCategoryDtoList[index].title}
                defaultValue={title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xl={4} sm={7} xs={11} className={classes.marginBasic2}>
              <TextField
                variant="outlined"
                className={classes.marginBasic}
                InputProps={{
                  className: classes.inputBasic,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                name="subtitle"
                label={t("categoryCard.subtitle")}
                defaultValue={subtitle}
                onChange={handleChange}
                error={formErrors.ticketCategoryDtoList[index].subtitle.length > 0}
                helperText={formErrors.ticketCategoryDtoList[index].subtitle}
              />
            </Grid>

            <Grid item xl={4} sm={8} xs={11} className={classes.marginBasic3}>
              <FormControl className={classes.marginShortPrice} variant="outlined" required>
                <InputLabel>{t("categoryCard.price")}</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  defaultValue={price}
                  onChange={handleChange}
                  name="price"
                  type="number"
                  endAdornment={<InputAdornment position="end">RON</InputAdornment>}
                  inputProps={{ className: classes.inputPrice }}
                  labelWidth={50}
                  error={formErrors.ticketCategoryDtoList[index].price.length > 0}
                />
                <FormHelperText>{formErrors.ticketCategoryDtoList[index].price}</FormHelperText>
              </FormControl>
            </Grid>
            <br />
            <TextField
              required
              className={classes.marginLong}
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
              defaultValue={description}
              onChange={handleChange}
              error={formErrors.ticketCategoryDtoList[index].description.length > 0}
              helperText={formErrors.ticketCategoryDtoList[index].description}
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
                  defaultValue={ticketsPerCategory === 0 ? "" : ticketsPerCategory}
                  onChange={handleChange}
                  error={formErrors.ticketCategoryDtoList[index].ticketsPerCategory.length > 0}
                  helperText={formErrors.ticketCategoryDtoList[index].ticketsPerCategory}
                />
              </Grid>

              <Grid item lg={3} md={3} sm={3} xs={4}>
                <Button className={classes.removeButton} onClick={removeThisCard} size="small">
                  {t("categoryCard.remove")}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default CategoryCardDumb;
