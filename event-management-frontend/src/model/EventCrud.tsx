import React from 'react';

export interface EventCrud {
  id: number | string,
  title: string,
  subtitle: string,
  status: string,
  highlighted: boolean,
  description: string,
  observations: string,
  location: string,
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
  maxPeople: number | string,
  images: any[],
  maxNoTicketsPerUser: number,
}
