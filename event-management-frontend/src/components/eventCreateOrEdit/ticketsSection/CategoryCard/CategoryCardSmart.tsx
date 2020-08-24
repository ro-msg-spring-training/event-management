import React from "react";
import { AppState } from "../../../../store/store";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CategoryCardDumb from "./CategoryCardDumb";
import { EventCrud } from "../../../../model/EventCrud";
import { updateEvent, removeCategoryCard, updateFormErrors } from "../../../../actions/HeaderEventCrudActions";
import { EventFormErrors } from "../../../../model/EventFormErrors";
import { TicketAvailabilityData } from "../../../../model/TicketAvailabilityData";
import { useTranslation } from "react-i18next";
type Props = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  ticketsPerCategory: number;

  ticketData: TicketAvailabilityData[];
  event: EventCrud;
  formErrors: EventFormErrors;
  removeCard: (id: number) => void;
  updateEvent: (event: EventCrud) => void;
  updateFormErrors: (errors: EventFormErrors) => void;
};

const CategoryCardSmart: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;

    // update event
    let newEvent = Object.assign({}, props.event);

    switch (name) {
      case "title":
        newEvent.ticketCategoryDtoList.filter((data) => data.id === props.id)[0].title = value;
        break;

      case "subtitle":
        newEvent.ticketCategoryDtoList.filter((data) => data.id === props.id)[0].subtitle = value;
        break;

      case "description":
        newEvent.ticketCategoryDtoList.filter((data) => data.id === props.id)[0].description = value;
        break;

      case "price":
        newEvent.ticketCategoryDtoList.filter((data) => data.id === props.id)[0].price = value;
        break;

      case "ticketsPerCategory":
        newEvent.ticketCategoryDtoList.filter((data) => data.id === props.id)[0].ticketsPerCategory = value;
        break;

      default:
        break;
    }
    props.updateEvent(newEvent);

    let newFormErrors = Object.assign({}, props.formErrors);
    let index = props.event.ticketCategoryDtoList.findIndex((card) => card.id === props.id);

    switch (name) {
      case "title":
        newFormErrors.ticketCategoryDtoList[index].title = value.length < 3 ? t("categoryCard.lengthError") : "";
        break;

      case "subtitle":
        break;

      case "description":
        newFormErrors.ticketCategoryDtoList[index].description = value.length < 3 ? t("categoryCard.lengthError") : "";
        break;

      case "price":
        newFormErrors.ticketCategoryDtoList[index].price = Number(value) < 0 ? t("categoryCard.priceError") : "";
        break;

      case "ticketsPerCategory":
        let nrOfMaxPeople = props.event.maxPeople;
        let ticketsToSell = 0;
        for (let fields of props.event.ticketCategoryDtoList) {
          ticketsToSell += Number(fields.ticketsPerCategory);
        }
        if (ticketsToSell > nrOfMaxPeople) {
          newFormErrors.ticketCategoryDtoList[index].ticketsPerCategory = t(
            "categoryCard.ticketsPerCategoryExceedsError"
          );
          break;
        }

        let categoryData = props.ticketData.filter((data) => data.title === props.title)[0];

        if (categoryData && categoryData.sold >= value && value > 0) {
          newFormErrors.ticketCategoryDtoList[index].ticketsPerCategory = t(
            "categoryCard.ticketsPerCategoryAlreadySoldError"
          );
        } else {
          newFormErrors.ticketCategoryDtoList[index].ticketsPerCategory =
            Number(value) <= 0 ? t("categoryCard.ticketsPerCategoryTooSmallError") : "";
        }
        break;

      default:
        break;
    }

    props.updateFormErrors(newFormErrors);
  };

  return <CategoryCardDumb {...props} handleChange={handleChange} />;
};

const mapStateToProps = (
  state: AppState,
  ownProps: {
    id: number;
    title: string;
    subtitle: string;
    price: number;
    description: string;
    ticketsPerCategory: number;
  }
) => ({
  ticketData: state.eventCrud.ticketData,
  formErrors: state.eventCrud.formErrors,
  event: state.eventCrud.event,
  id: ownProps.id,
  title: ownProps.title,
  subtitle: ownProps.subtitle,
  price: ownProps.price,
  description: ownProps.description,
  ticketsPerCategory: ownProps.ticketsPerCategory,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeCard: (id: number) => dispatch(removeCategoryCard(id)),
  updateEvent: (event: EventCrud) => dispatch(updateEvent(event)),
  updateFormErrors: (errors: EventFormErrors) => dispatch(updateFormErrors(errors)),
});

const CategoryCard = connect(mapStateToProps, mapDispatchToProps)(CategoryCardSmart);

export default CategoryCard;
