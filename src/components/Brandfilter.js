import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Button,
    ListGroup,
    Card,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import { useCart } from './CartContext';

function Brandfilter() {
    const { id } = useParams();
    const [brand, setbrand] = useState({});
    const [listProducts, setListProducts] = useState([])
    const { addToCart } = useCart();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseB = await axios.get(
                    "http://localhost:9999/brands/" + id
                );
                setbrand(responseB.data)
                const responseP = await axios.get(
                    "http://localhost:9999/products/"
                );
                const productsData = responseP.data
                console.log(productsData)
                const filteredProducts = productsData.filter(
                    (product) => product.brand == id || product.brand == parseInt(id)
                );
                console.log(filteredProducts)
                setListProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);

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
                <Row className="text-center"><h1>Các sản phẩm thuộc thương hiệu {brand.name}</h1></Row>
                <Row>
                    <Col>
                        <Link to={"/"}>
                            <Button variant="success">Trở về</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    {listProducts.length > 0 ? (listProducts.map(p => (
                        <Col xs={3} className='mt-3'>
                            <Card >
                                <Card.Img style={{ height: "250px" }} variant="top" src={`/assets/${p.images[0].name}`} />
                                <Card.Body>
                                    <Card.Title className='text-center' style={{ fontSize: "14px" }}>{p.name}</Card.Title>
                                    <Card.Text>
                                        <hr></hr>
                                        <div className='text-center'>{p.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                                        <hr></hr>

                                        <div className='inline text-center'>Trạng thái: {p.status == true ? <span style={{ color: "green" }}>Còn Hàng</span> : <span style={{ color: "red" }}> Hết hàng </span>}</div>
                                        <hr></hr>
                                    </Card.Text>
                                    <Link to={`/product/${p.id}`}>
                                        <Button variant="danger" className='mx-2'>Xem</Button>
                                    </Link>
                                    <Button variant="success" className='inline' onClick={() => handleClick(p)}>Thêm vào giỏ</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                    )) : (
                        <p>No products found for this brand.</p>
                    )}
                </Row>
            </Row>
        </Container>
    )
}

export default Brandfilter