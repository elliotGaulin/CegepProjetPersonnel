import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Context/useAuth';

export default function UnAuthGuard(props: { element: ReactElement }): ReactElement {
    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        if (user != null) {
            navigate('/home');
        }
    })

    return props.element;
}

