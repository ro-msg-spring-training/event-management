import React from 'react';

export interface EventCrud {
  id: number | string,
  title: string,
  subtitle: string,
  status: boolean,
  highlighted: boolean,
  description: string,
  observations: string,
  location: string,
  startDate: string,
  endDate: string,
  startHour: string,
  endHour: string,
  maxPeople: number | string,
  picturesUrlSave: any[],
  picturesUrlDelete: any[],
  maxNoTicketsPerUser: number,
  noTicketEvent: boolean
}
