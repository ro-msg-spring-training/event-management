export interface EventFormErrors {
  title: string;
  subtitle: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  maxPeople: string;
  ticketsPerUser: string;
  ticketCategoryDtoList: CategoryCardErrors[];
}

export interface CategoryCardErrors {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  ticketsPerCategory: string;
}
