import React from 'react';

export interface Ticket {
    bookingId: number;
    bookingDate: string;
    eventName: string;
    ticketCategory: string;
    name: string;
    pdfUrl: string;
}