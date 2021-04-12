import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { UserApi } from '../../services/user-api';

function EmailValidator(props: any) {

    const history = useHistory();
    const {code} = props.match.params;
    
    useEffect(() => {
        function validateEmail() {
            try {
                UserApi.validateEmal(code);
                history.replace('/login');

            } catch (error: any) {
                alert(error);
            }
        }
        validateEmail();
    }, [history, code]);


    return <div className="text-center">
        <br />
        <h1>Validando e-mail</h1>
        <br />
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>
}

export default EmailValidator;