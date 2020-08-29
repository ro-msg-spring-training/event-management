export interface TicketsStepFormErrors {
  ticketCategoryTitle: string,
  error: string
}

export interface TicketAvailabilityData {
  title: string;
  remaining: number;
  sold: number;
}

export interface EmailStepFormErrors {
  error: string
}
