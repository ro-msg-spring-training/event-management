import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from "../../../store/store";
import { fetchTickets, incrementPage } from "../../../actions/TicketsPageActions";


interface Props {
    tickets: any;
    page: number;
    isLoading: boolean;
    isError: boolean;
    fetchTickets: (page: number) => void;
    incrementPage: () => void;
}

const TicketListSmart = (props: Props) => {

    const [hasMore, setHasMore] = useState(false)
    const [concatTickets, setConcatTickets] = useState(Array(0))

    useEffect(() => {
        async function addTicketsTogether() {
            await props.fetchTickets(props.page)
            await setHasMore(props.page === 1 ? true : props.tickets.length > 0)

            await setConcatTickets([...concatTickets, ...props.tickets])
        }
        addTicketsTogether();
    }, [props.page])

    let tickets = props.tickets;

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
        .map((ticket: any, index: number) => {
            if (tickets.length === index + 1) {
                return <div ref={lastTicketRef} key={ticket.id}/>
            } else {
                return <div key={ticket.id}/>
            }
        }) : [];

    return (
            <>
                <p>Tickets</p>
                {ticketReferences}

                { props.isLoading ?
                    <div> Loading... </div> :

                    props.isError ?
                        <div> Error :( </div> :
                            concatTickets.map((ticket: any) => {
                                return <div key={ticket.id}>{ticket.title}</div>
                            })
                }
            </>
    );
}

const mapStateToProps = (state: AppState) => ({
    tickets: state.tickets.allTickets,
    page: state.tickets.page,
    isLoading: state.tickets.isLoading,
    isError: state.tickets.isError
});

export default connect(mapStateToProps,
    { fetchTickets, incrementPage })(TicketListSmart)