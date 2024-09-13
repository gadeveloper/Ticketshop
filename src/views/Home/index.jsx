import { useEffect, useRef, useState } from 'react';
import useEventsData from "../../hooks/useEventsData";
import Navbar from '../../components/Navbar';
import Events from '../../components/Events';
import ReactPaginate from 'react-paginate';
import styles from './Home.module.css';

const Home = () => {
    const { events, isLoading, error, fetchEvents, page } = useEventsData();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect( () => {
        fetchEvents();
    },[]);

    const handleNavbarSearch = (term) => {
        setSearchTerm(term);
        fetchEvents(`&keyword=${term}`);
    };

    const handlePageClick = ( { selected }) => {
        fetchEvents(`&keyword=${searchTerm}&page=${selected}`);
    };

    const renderEvents = () => {
        if(isLoading){
            return <div>Cargando datos...</div>;
        } 
        if(error){
            return <div>Ha ocurrido un error !</div>;
        }
        return (
            <div>
                <Events searchTerm={searchTerm} events={events} />
                <ReactPaginate
                    className={styles.pagination}
                    nextClassName={styles.next}
                    previousClassName={styles.previous}
                    pageClassName={styles.page}
                    activeClassName={styles.activePage}
                    disabledClassName={styles.disabledPage}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={page.totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null} 
                />
            </div>
        );        
    };

    return (
        <>
            <Navbar onSearch={handleNavbarSearch} />
            {renderEvents()}
        </>
    );
};

export default Home;