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


function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [subName, setSubName] = useState("");
    const [mainImage, setMainImage] = useState("");
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseP = await axios.get(
                    "http://localhost:9999/products/" + id
                );
                setProduct(responseP.data);
                const brand =
                    setMainImage(`/assets/${responseP.data.images[0].name}`);
                const responseB = await axios.get(
                    "http://localhost:9999/brands/" + responseP.data.brand
                );
                setSubName(responseB.data.name);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);

    const handleThumbnailClick = (src) => {
        setMainImage(src);
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
                <Row>
                    <Col>
                        <h1 className="text-center my-3">Mô tả sản phẩm</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to={"/"}>
                            <Button variant="success">Trở về</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col md={5} className="py-3">
                        {product.images && product.images.length > 0 ? (
                            <>
                                <Card style={{ width: "25rem" }}>
                                    <Card.Img variant="top" src={mainImage} />
                                </Card>
                                <hr />
                                <div className="d-flex flex-wrap" style={{ marginTop: "1rem" }}>
                                    {product.images.map((img, index) => (
                                        <Col
                                            key={index}
                                            onClick={() =>
                                                handleThumbnailClick(`/assets/${img.name}`)
                                            }
                                        >
                                            <Card.Img
                                                variant="top"
                                                src={`/assets/${img.name}`}
                                                style={{ width: "5rem", border: "1px solid transparent" }}
                                                onMouseOver={(e) =>
                                                    (e.currentTarget.style.border = "2px solid red")
                                                }
                                                onMouseOut={(e) =>
                                                    (e.currentTarget.style.border = "1px solid transparent")
                                                }
                                            />
                                        </Col>
                                    ))}
                                </div>
                                <hr />
                            </>
                        ) : (
                            <p>No images available</p>
                        )}
                    </Col>
                    <Col md={5}>
                        <Row>
                            <h1 className="text-center">{product.name}</h1>
                            <hr />
                            <div>
                                <h3 className="text-center">Giá: {product.price ? product.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : "Đang tải..."}</h3>
                                <h8>Hãng: {subName}</h8>
                                <h6> Trạng thái: {product.status == true ? <span style={{ color: "green" }}>Còn Hàng</span> : <span style={{ color: "red" }}> Hết hàng </span>}</h6>
                                <h8>{product.description}</h8>
                            </div>
                        </Row>
                        <Row>
                            <Button variant="danger" className='text-center mt-4' onClick={() => handleClick(product)}>Thêm vào giỏ hàng ngay</Button>
                        </Row>
                    </Col>

                </Row>
            </Row>
        </Container>
    )
}

export default Detail