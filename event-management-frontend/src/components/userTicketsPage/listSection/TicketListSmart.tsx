import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from "../../../store/store";
import { fetchTickets, incrementPage, resetPage } from "../../../actions/TicketsPageActions";
import { Ticket } from "../../../model/Ticket"
import TicketListDumb from "./TicketListDumb";
import {TicketFilters} from "../../../model/TicketFilters";


interface Props {
    tickets: [];
    filters: TicketFilters;
    page: number;
    isLoading: boolean;
    isError: boolean;
    fetchTickets: (page: number, filters: TicketFilters) => void;
    incrementPage: () => void;
    resetPage: () => void;
}

const TicketListSmart = ({tickets, filters, page, isLoading, isError, fetchTickets, incrementPage, resetPage}: Props) => {

    const [hasMore, setHasMore] = useState(false)
    const [concatTickets, setConcatTickets] = useState(Array(0))

    useEffect(() => {
        fetchTickets(page, filters)
        setHasMore(page === 1 ? true : tickets.length > 0)

        if (tickets.length > 0) {
            setConcatTickets([...concatTickets, ...tickets])
        } else {
            setConcatTickets([])
            resetPage();
        }
    }, [page])

    const observer = useRef<any>()
    const lastTicketRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                // Increment page in redux
                incrementPage();
            }
        })
        if (node) observer.current.observe(node)
    }, [hasMore])

    const ticketReferences = tickets !== undefined ? tickets
        .map((ticket: Ticket, index: number) => {
            if (tickets.length === index + 1) {
                return <div ref={lastTicketRef} key={ticket.ticketId}/>
            } else {
                return <div key={ticket.ticketId}/>
            }
        }) : [];

    return (
            <>
                {ticketReferences}
                <TicketListDumb isError={isError}
                                isLoading={isLoading}
                                ticketsDetails={concatTickets} />
            </>
    );
}

const mapStateToProps = (state: AppState) => ({
    tickets: state.tickets.allTickets,
    filters: state.tickets.filters,
    page: state.tickets.page,
    isLoading: state.tickets.isLoading,
    isError: state.tickets.isError
});


export default connect(mapStateToProps,
    { fetchTickets, incrementPage, resetPage })(TicketListSmart)
