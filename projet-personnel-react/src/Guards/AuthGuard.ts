import { ReactElement, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 
import useAuth from '../Context/useAuth';

/**
 * Guard s'assurant que l'utilisateur est connecté.
 * Redirige vers la page de connexion si l'utilisateur n'est pas connecté.
 * 
 * Inspiré de https://romik-mk.medium.com/authguard-react-router-v6-764f049e172d
 * 
 * @param props l'élément à protéger
 * @returns l'élement protégé
 */
export default function AuthGuard(props: { element: ReactElement }): ReactElement {
    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        if (user == null) {
            navigate('/login');
        }
    })

    return props.element;
}

