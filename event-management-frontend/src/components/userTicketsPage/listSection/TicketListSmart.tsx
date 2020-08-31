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

const TicketListSmart = (props: Props) => {

    const [hasMore, setHasMore] = useState(false)
    const [concatTickets, setConcatTickets] = useState(Array(0))

    useEffect(() => {
        props.fetchTickets(props.page, props.filters)
        setHasMore(props.page === 1 ? true : props.tickets.length > 0)

        if (props.tickets.length > 0) {
            setConcatTickets([...concatTickets, ...props.tickets])
        } else {
            setConcatTickets([])
            props.resetPage();
        }
    }, [props.page])

    let tickets = props.tickets

    const observer = useRef<any>()
    const lastTicketRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                // Increment page in redux
                props.incrementPage();
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
                <TicketListDumb isError={props.isError}
                                isLoading={props.isLoading}
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
