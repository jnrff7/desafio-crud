import React, { FormEvent, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import {
    Link, useHistory
} from "react-router-dom";
import { UserApi } from '../../services/user-api';

import './styles.css';

function Login() {

    const history = useHistory();
    const [credentials, setCredentials] 
        = useState<{email: string, password: string}>({email: '', password: ''});

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        try {
            await UserApi.login(credentials);
            history.replace('/');
        } catch (err : any) {
            window.alert('erro ao tentar efetuar login');
        }
    }

    return (
        <div className="telaLogin">
            <Card>
                <Card.Body>
                    <Card.Title>
                        Login
                    </Card.Title>
                    <Form onSubmit={handleLogin}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="E-mail do usuário"
                                onInput={(event: any) => setCredentials({...credentials, email: event.target.value})}
                                value={credentials.email}
                            />
                            <Form.Text className="text-muted">
                                Não iremos compartilhar seu e-mail com outra pessoa.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Senha"
                                onInput={(event: any) => setCredentials({...credentials, password: event.target.value})}
                                value={credentials.password}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" block>
                            Acessar
                        </Button>
                    </Form>
                    <hr />
                    <div className="text-center">
                        <Link to="/signin">Cadastre-se</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;