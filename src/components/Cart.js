import React from "react";
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from './CartContext';

function Cart() {
    const { cart, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const vat = total * 0.08;
    const totalWithVat = total + vat;

    const handleClearCart = () => {
        clearCart();
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="text-center my-3">Giỏ hàng của bạn</h2>
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
                <Col>
                    <Button
                        variant="warning"
                        className="float-end"
                        onClick={handleClearCart}
                    >
                        xóa giỏ hàng
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Ảnh</th>
                                <th>Giá (VNĐ)</th>
                                <th>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <Card style={{ width: "10rem" }}>
                                            <Card.Img
                                                variant="top"
                                                src={`assets/${item.images[0].name}`}
                                            />
                                        </Card>
                                    </td>
                                    <td>{item.price.toLocaleString()} VNĐ</td>
                                    <td>{item.price.toLocaleString()} VNĐ</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="float-end">
                        <h3>VAT: 8%</h3>
                        <h3>Tổng: {total.toLocaleString()} VNĐ</h3>
                        <h3>Tổng sau (VAT 8%): {totalWithVat.toLocaleString()} VNĐ</h3>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;