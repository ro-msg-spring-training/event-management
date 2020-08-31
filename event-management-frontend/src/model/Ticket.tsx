import React from 'react';

export interface Ticket {
    ticketId: number;
    bookingId: number;
    bookingDate: string;
    eventName: string;
    ticketCategory: string;
    name: string;
    pdfUrl: string;
}
