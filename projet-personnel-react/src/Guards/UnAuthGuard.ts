import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Context/useAuth';

/**
 * Guard s'assurant que l'utilisateur n'est pas connecté.
 * Redirige vers la page d'accueil si l'utilisateur n'est pas connecté.
 * 
 * Utilisé pour empêcher l'utilisateur de se connecter ou de s'inscrire lorsqu'il est déjà connecté.
 * 
 * Inspiré de https://romik-mk.medium.com/authguard-react-router-v6-764f049e172d
 * 
 * @param props l'élément à protéger
 * @returns l'élement protégé
 */
export default function UnAuthGuard(props: { element: ReactElement }): ReactElement {
    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        if (user != null) {
            navigate('/');
        }
    })

    return props.element;
}

