import { CategoryCardItem } from "../../../../types/TicketType";
import React from "react";
import { useStylesCategoryPage } from "../../../../styles/CategoryPageStyle";
import { TextField, Button, Grid } from "@material-ui/core";
import CategoryCard from "../CategoryCard/CategoryCardSmart";
import "../../../../styles/Responsivity.css";
import { EventCrud } from "../../../../model/EventCrud";
import { useTranslation } from "react-i18next";
import { CategoryCardErrors } from "../../../../model/EventFormErrors";

type Props = {
  newEvent: boolean;
  event: EventCrud;
  addCard: () => void;
  handleChange: any;
  formErrors: {
    ticketsPerUser: string;
    ticketCategoryDtoList: CategoryCardErrors[];
  };
};

const CategoryPageDumb: React.FC<Props> = (props: Props) => {
  const classes = useStylesCategoryPage();
  const { t } = useTranslation();

  const addNewCard = () => {
    props.addCard();
  };
  return (
    <div>
      <h1 className={classes.title}>General</h1>
      <Grid className={classes.gridStyleHeader} container spacing={5}>
        <Grid container item xl={8} lg={6} md={6} sm={4} xs={4}>
          <TextField
            required
            name="ticketsPerUser"
            className={classes.maxTickets}
            InputLabelProps={{
              shrink: true,
            }}
            type="number"
            variant="outlined"
            label={t("categoryCard.maxTicketPerUser")}
            error={props.formErrors.ticketsPerUser.length > 0}
            helperText={props.formErrors.ticketsPerUser}
            defaultValue={props.event.ticketsPerUser}
            onChange={props.handleChange}
          />
        </Grid>
        <Grid container item xl={5} lg={3} md={6} sm={7} xs={6}>
          <Button className={`${classes.button} addButtonResponsive`} onClick={addNewCard}>
            {t("categoryCard.addCategory")}
          </Button>
        </Grid>
      </Grid>
      <br /> <br /> <br />
      <Grid className={classes.gridStyle} container spacing={4}>
        {props.event.ticketCategoryDtoList.map((category: CategoryCardItem) => (
          <Grid container item xl={6} lg={6} md={7}>
            <CategoryCard
              key={category.id}
              id={category.id}
              title={category.title}
              subtitle={category.subtitle}
              price={category.price}
              description={category.description}
              ticketsPerCategory={category.ticketsPerCategory}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoryPageDumb;
