import { Table, Button, ListGroup, Card, Container, Row, Col, Form, Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Import a cart icon
import { useCart } from './CartContext';

function Header() {
    const [listBrands, setListBrands] = useState([])
    const [listOrigins, setListOrigins] = useState([])
    const { cart } = useCart();
    // lấy data
    useEffect(() => {
        const fetchData = async () => {

            const responseO = await axios.get("http://localhost:9999/Origins");
            const responseB = await axios.get("http://localhost:9999/brands");


            setListOrigins(responseO.data);
            setListBrands(responseB.data);

        };

        fetchData();
    }, []);


    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="/assets/logo/Logo.png"
                        alt="Logo"
                        style={{ width: '50px' }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="">
                        <NavDropdown title={<span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Thương Hiệu</span>} id="men-dropdown">
                            {
                                listBrands.map(b => (
                                    <NavDropdown.Item as={Link} to={`/brand/${b.id}`} key={b.id}>
                                        {b.name}
                                    </NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                    </Nav>
                    <Nav className='text-center'>
                        <Nav.Link as={Link} to="/cart">
                            <FaShoppingCart size={24} className='text-end' />
                            <Badge bg="danger" pill className="ms-1">
                                {cart.length}
                            </Badge>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header