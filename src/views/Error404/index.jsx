import { useRouteError } from 'react-router-dom';
import styles from './Error404.module.css';

const Error404 = () =>{
    const error = useRouteError();

    return(
        <div className={styles.container}>
            <h3 className={styles.title}>{error.status} Ops!</h3>
            <p className={styles.description}>No hemos encontrado la ruta que buscas</p>
            <p><i>{ error.data}
                </i>
            </p>
        </div>
    );
};

export default Error404;