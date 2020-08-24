import React, { useState, useRef, useCallback } from 'react'
import useBookSearch from "./TicketSearch";


export default function TicketView() {
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

    function handleSearch(e: { target: { value: React.SetStateAction<string>; }; }) {
        setQuery(e.target.value)
        setPageNumber(1)
    }

    function handleChange(event: any) {
        setQuery(event.target.value)
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        setPageNumber(1)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={query} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>

            {books.map((book, index) => {
                if (books.length === index + 1) {
                    return <div ref={lastBookElementRef} key={book}>{book}</div>
                } else {
                    return <div key={book}>{book}</div>
                }
            })}
            <div>{loading && 'Loading...'}</div>
            <div>{error && 'Error'}</div>
        </>
    )
}