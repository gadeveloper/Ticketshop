import EventItem from "./components/EventItem";
import { useNavigate } from "react-router-dom";

const Events = ( { searchTerm, events } ) => {

    const navigate = useNavigate();

    const handleEventItemClic = (id) => {
        navigate(`/detail/${id}`)
    };

    const renderEvents = () => {
        let eventsFiltered = events;

        if(searchTerm.length > 0){
            eventsFiltered = eventsFiltered.filter((iteam) => iteam.name.toLocaleLowerCase().includes(searchTerm));
        }

        return eventsFiltered.map((eventItem) => (
        <EventItem 
            key={`event-item-${eventItem.id}`} 
            name={eventItem.name}
            info={eventItem.info}
            image={eventItem.images[0].url}
            onEventClic={handleEventItemClic}
            id={eventItem.id}
        /> 
        ));
    };
    
    return (
        <div>
            Eventos
            {renderEvents()}
        </div>
    );
};

export default Events;