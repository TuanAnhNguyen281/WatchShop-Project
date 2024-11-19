import { Table, Button, ListGroup, Card, Container, Row, Col, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useCart } from './CartContext';

function Home() {

    const [listProducts, setListProducts] = useState([])
    const [listBrands, setListBrands] = useState([])
    const [listOrigins, setListOrigins] = useState([])
    const [listOptions, setListOptions] = useState([])
    const [selectedOrigins, setSelectedOrigins] = useState([]);
    const [textSearch, setTextSearch] = useState("null")
    const { addToCart } = useCart();


    // lấy data
    useEffect(() => {
        const fetchData = async () => {
            const responseP = await axios.get("http://localhost:9999/products");
            const responseO = await axios.get("http://localhost:9999/Origins");
            const responseB = await axios.get("http://localhost:9999/brands");

            setListProducts(responseP.data);
            setListOrigins(responseO.data);
            setListBrands(responseB.data);
        };

        fetchData();
    }, []);

    // xử lý dữ liệu
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get("http://localhost:9999/products");
            let filteredProducts = response.data;

            // Filter by supplier
            if (listOptions.length > 0) {
                filteredProducts = filteredProducts.filter(product => listOptions.includes(product.brand));
            }

            // Filter by origin
            if (selectedOrigins.length > 0) {
                const listBrandByOrigin = listBrands.filter(b => b.origin == selectedOrigins[0]).map(b => parseInt(b.id))
                const listProductByBrand = listProducts.filter(p => listBrandByOrigin.includes(p.brand))
                filteredProducts = listProductByBrand
            }

            // Search by name
            if (textSearch.trim() !== "") {
                filteredProducts = filteredProducts.filter(product =>
                    product.name.toLowerCase().includes(textSearch.toLowerCase())
                );
            }

            setListProducts(filteredProducts);
        };

        fetchProducts();
    }, [textSearch, listOptions, selectedOrigins]);


    const searchByName = (event) => {
        setTextSearch(event.target.value);
    };


    const handleBrandChange = (e) => {
        const { value, checked } = e.target;
        const id = parseInt(value);

        if (checked) {
            setListOptions([...listOptions, id]);
        } else {
            setListOptions(listOptions.filter(option => option !== id));
        }
    };


    const handleOriginChange = (e) => {
        const { value, checked } = e.target;
        const id = parseInt(value);
        console.log(id)

        if (checked) {
            setSelectedOrigins([...selectedOrigins, id]);
            console.log([...selectedOrigins, id])
        } else {
            setSelectedOrigins(selectedOrigins.filter(origin => origin !== id));
            console.log(selectedOrigins)
        }
    };

    const handleClick = (product) => {
        addToCart(product);
        alert("Sản phẩm đã được thêm vào giỏ hàng");
    };

    return (
        <Container>
            <Row>
                <Header></Header>
            </Row>
            <Row style={{ marginTop: '100px' }}>
                <Row className='text-center'>
                    <h1>Shop bán đồng hồ chính hãng</h1>
                </Row>
                <Row>
                    <Col></Col>
                    <Col xs={8}>
                        <Form.Control onChange={searchByName} type="text" placeholder='Tìm Kiếm Đồng hồ bạn muốn' ></Form.Control>
                    </Col>
                    <Col></Col>
                </Row>
                <Col xs={2} className='d-none d-sm-block'>
                    <Card className='py-3'>
                        <h3 className='text-center'>Xuất xứ</h3>
                        <Form >
                            {listOrigins.map(o => (
                                <Form.Check type='checkbox'
                                    label={o.name}
                                    value={o.id}
                                    onChange={handleOriginChange}
                                    key={o.id}
                                ></Form.Check>
                            ))}
                        </Form>
                    </Card>
                    <Card className='py-3 mt-3'>
                        <h3 className='text-center'>Thương Hiệu</h3>
                        <Form >
                            {listBrands.map(b => (
                                <Form.Check type='checkbox'
                                    label={b.name}
                                    value={b.id}
                                    onChange={handleBrandChange}
                                    key={b.id}
                                ></Form.Check>
                            ))}
                        </Form>
                    </Card>
                </Col>
                <Col>
                    <Row>
                        {listProducts.map(p => (
                            <Col xs={3} className='mt-3'>
                                <Card >
                                    <Card.Img style={{ height: "250px" }} variant="top" src={`assets/${p.images[0].name}`} />
                                    <Card.Body>
                                        <Card.Title className='text-center' style={{ fontSize: "14px" }}>{p.name}</Card.Title>
                                        <Card.Text>
                                            <hr></hr>
                                            <div className='text-center'>{p.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                                            <hr></hr>
                                            {listBrands.filter(b => b.id == p.brand).map(b => (
                                                <div className='text-center'>{b.name}</div>

                                            ))}
                                            <hr></hr>
                                            <div className='inline text-center'>Trạng thái: {p.status == true ? <span style={{ color: "green" }}>Còn Hàng</span> : <span style={{ color: "red" }}> Hết hàng </span>}</div>
                                            <hr></hr>
                                        </Card.Text>
                                        <Link to={`/product/${p.id}`}>
                                            <Button variant="danger" className='mx-2'>Xem</Button>
                                        </Link>
                                        <Button variant="success" className='inline' onClick={() => handleClick(p)}>Thêm Giỏ</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row >
        </Container >
    )
}

export default Home