import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Brandfilter from "./components/Brandfilter";
import Cart from "./components/Cart";
import { CartProvider } from './components/CartContext';



function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Home></Home>
          }></Route>
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/brand/:id" element={<Brandfilter />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
