import React, {FormEvent, useState} from 'react'
import UserTicketsFilterDumb from "./UserTicketsFilterDumb";
import {Container} from "@material-ui/core";
import {TicketFilters} from "../../../model/TicketFilters";
import {AppState} from "../../../store/store";
import {fetchTickets, resetFilters, updateFilters, resetPage} from "../../../actions/TicketsPageActions";
import {connect} from "react-redux";


interface Props {
    expanded: boolean,
    setExpanded: (exp: boolean) => void,
    filters: TicketFilters,
    page: number,
    resetFilters: () => void,
    updateFilters: (filters: TicketFilters) => void,
    fetchTickets: (page: number, filters: TicketFilters) => void
    resetPage: () => void,
}

const UserTicketsFilterSmart = ({ expanded, setExpanded, filters, page, resetFilters, updateFilters, fetchTickets, resetPage }: Props) => {
    const [errorDate, ] = useState('')

    const handleChange = () => {
        const newFilters = Object.assign({}, filters)
        updateFilters(newFilters)
    }

    const handleChangeTitle = (title: string) => {
        filters.title = title
        handleChange()
    }

    const handleChangeDate = (date: string) => {
        filters.date = new Date(date)
        handleChange()
    }

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setExpanded(false)
        handleChange()
        resetPage()
        fetchTickets(page, filters)
    }

    const toggle = () => {
        setExpanded(!expanded)
    }

    const clear = () => {
        resetFilters()
        resetPage()
        fetchTickets(1, { title: '', date: undefined })
    }

    return (
        <Container>
            <UserTicketsFilterDumb
                isExpanded={expanded}
                filters={filters}
                errorDate={errorDate}
                clear={clear}
                updateFilters={updateFilters}
                toggle={toggle}
                submitForm={submitForm}
                handleChangeTitle={handleChangeTitle}
                handleChangeDate={handleChangeDate}/>
        </Container>
    );
}

const mapStateToProps = (state: AppState) => ({
    filters: state.tickets.filters,
    page: state.tickets.page
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateFilters: (filters: TicketFilters) => dispatch(updateFilters(filters)),
        resetFilters: () => dispatch(resetFilters()),
        fetchTickets: (page: number, filters: TicketFilters) => dispatch(fetchTickets(page, filters)),
        resetPage: () => dispatch(resetPage())
    }
}


export default connect( mapStateToProps, mapDispatchToProps )(UserTicketsFilterSmart)
