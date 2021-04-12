import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Alert, Container } from 'react-bootstrap';
import { UserApi } from '../../services/user-api';

function Header() {

    const [userName, setUserName] = useState('');
    const [userConfirmed, setUserConfirmed] = useState(false);

    useEffect(() => {
        function refreshUserName() {
            const _userName: string | null = window.localStorage.getItem('user-name');
            _userName && setUserName(_userName);
            const _userConfirmed: any = window.localStorage.getItem('user-name');
            setUserConfirmed(!_userConfirmed);
        }
        refreshUserName();
    }, [setUserName]);

    const handleNewEmail = async (event:any) => {
        event.preventDefault();
        UserApi.newEmailValidator();
    }
    const handleLogout = () => {
        UserApi.logOut();
        window.location.assign('/login')
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">CRUD</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <NavDropdown title={userName} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {
                userConfirmed &&
                <Container>
                    <Alert variant='warning'>
                        Você ainda não confirmou seu e-mail clique <a href="#" onClick={handleNewEmail}>aqui</a> para enviar novamente!
                </Alert>
                </Container>
            }
        </>
    );
}

export default Header;