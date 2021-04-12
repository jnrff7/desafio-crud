import React, { useState, FormEvent } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import {
    Link
} from "react-router-dom";
import { UserApi } from '../../services/user-api';
import './styles.css';

function Register() {

    const [user, setUser]
        = useState<{
            email: string,
            password: string,
            confirmPassword: string,
            name: string
        }>({ email: '', password: '', confirmPassword: '', name: '' });

    const handleResgistre = async (event: FormEvent) => {
        event.preventDefault();
        if (user.password !== user.confirmPassword) {
            window.alert('Senhas não conferer');
        } else {
            try {
                await UserApi.create(user);
                setUser({ email: '', password: '', confirmPassword: '', name: '' });
                window.alert('Usuário criado com sucesso!');
            } catch (err: any) {
                window.alert('erro ao criar usuário');
            }
        }
    }

    return (
        <div className="telaRegister">
            <Card>
                <Card.Body>
                    <Card.Title>
                        Cadastre-se
                    </Card.Title>
                    <Form onSubmit={handleResgistre}>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text"
                                placeholder="Nome do usuário"
                                required={true}
                                onInput={(event: any) => setUser({ ...user, name: event.target.value })}
                                value={user.name}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                placeholder="E-mail do usuário"
                                required={true}
                                onInput={(event: any) => setUser({ ...user, email: event.target.value })}
                                value={user.email}
                            />
                            <Form.Text className="text-muted">
                                Não iremos compartilhar seu e-mail com outra pessoa.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password"
                                placeholder="Senha"
                                required={true}
                                onInput={(event: any) => setUser({ ...user, password: event.target.value })}
                                value={user.password}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirmar Senha</Form.Label>
                            <Form.Control type="password"
                                placeholder="Senha"
                                required={true}
                                onInput={(event: any) => setUser({ ...user, confirmPassword: event.target.value })}
                                value={user.confirmPassword}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" block>
                            Registrar
                        </Button>
                    </Form>
                    <hr />
                    <div className="text-center">
                        <Link to="/login">Voltar</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Register;