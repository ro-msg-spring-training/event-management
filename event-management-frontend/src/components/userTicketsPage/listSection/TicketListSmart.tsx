import React, {useCallback, useEffect, useRef, useState} from 'react';
import { connect } from 'react-redux';
import { AppState } from "../../../store/store";
import {fetchAllTickets, updateTickets} from '../../../actions/TicketsPageActions';
import TicketDetailsDumb from "./TicketDetailsDumb";
import TicketListDumb from "./TicketListDumb";
import TicketView from "../filterSection/TicketView";
import useBookSearch from "../filterSection/TicketSearch";


interface Props {
    tickets: any;
    isLoading: boolean;
    isError: boolean;
    fetchAllTickets: () => { type: string; };
    updateTickets: (arg0: any) => {type: string,
        payload: any};
}

const TicketListSmart = (props: Props) => {

    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const {
        books,
        hasMore,
        loading,
        error
    } = useBookSearch(query, pageNumber)

    const observer = useRef<any>()
    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    const handleChange = (event: any) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setPageNumber(1);
    }

    useEffect(() => {
        console.log("fetch")
        props.fetchAllTickets();
    }, [props.tickets === []]);

    const tickets = props.tickets;
    //console.log(tickets)

    // Using the map function, we will get all the tickets from the array
    const ticketDetails = tickets !== undefined ? tickets
        .map((ticket: any, index: number) => {
            if (books.length === index + 1) {
                return <div ref={lastBookElementRef} key={ticket.id}>{ticket.category}</div>
            } else {
                return <div key={ticket.id}>{ticket.category}</div>
            }
        }) : [];

    return (
        <>
            <p>Tickets</p>
            {ticketDetails}
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
        </>
    );
}

const mapStateToProps = (state: AppState) => ({
    tickets: state.tickets.allTickets,
    isLoading: state.tickets.isLoading,
    isError: state.tickets.isError,
});

export default connect(mapStateToProps,
    { fetchAllTickets, updateTickets })(TicketListSmart)