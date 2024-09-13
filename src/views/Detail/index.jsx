import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import styles from './Detail.module.css';

const Detail = () => {
    const { eventId } = useParams();
    const [ eventData, setEventData ] = useState({});
    const [ error, setError ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
     const fetchEventData = async () =>{
          try {
               const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=4PVJZ2FBkHioh1fYAceGOIc0A89JSgr9`);
               const data = await response.json();
               setEventData(data);
               setIsLoading(false);
          } catch (error) {
               setEventData({});
               setError(error);
               setIsLoading(false);
          }
     };
     fetchEventData();
    },[]);

    if( isLoading && Object.keys(eventData) === 0){
      return <div>Cargando evento...</div>
    }
    if( Object.keys(error) > 0 ) {
      return <div>Ha ocurrido un error</div>
    }

    console.log(eventData);
   
   return(  
        <div className={styles.container}>
          <div className={styles.mainInfoContainer}>
               <img src={eventData.images?.[0].url} className={styles.eventImage} alt={eventData.name} />
               <h4 className={styles.eventName}> { eventData.name } </h4>
               <p className={styles.infoParagraph}>{eventData.info} </p>
               {eventData.dates?.start.dateTime ? <p className={styles.dateParagraph}>{format( new Date(eventData.dates?.start.dateTime), 'd LLLL yyyy H:mm', { locale: es } )}</p> : null }
          </div>
          <div className={styles.seatInfoContainer}>
               <h5>Mapa del Evento</h5>
               <img src={eventData.seatmap?.staticUrl} alt="Seatmap Event" />
               <p>{eventData.pleaseNote}</p>
               <p>{eventData.priceRanges?.[0].min} - {eventData.priceRanges?.[0].max}</p>
          </div>
        </div>
   );
}

export default Detail;