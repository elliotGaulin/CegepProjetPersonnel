import { ReactElement, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 
import useAuth from '../Context/useAuth';

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

