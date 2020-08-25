import React from 'react';

export interface Ticket {
    endDate: string;
    endHour: string;
    id: number;
    location: string;
    occupancyRate: number;
    startDate: string;
    startHour: string;
    subtitle: string;
    title: string;
}