import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Card, Button, Row, Col, Typography } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState({});
  const { Title } = Typography;

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (product) => {
    setLoading((prev) => ({ ...prev, [product.id]: true }));

    setTimeout(() => {
      dispatch(addToCart({ ...product, quantity: 1 }));
      setLoading((prev) => ({ ...prev, [product.id]: false }));

      toast.success(`${product.title} added to cart!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }, 1000);
  };

  return (
    <div>
      <Title>Products</Title>
      <Row gutter={[16, 16]} className="product-grid">
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={product.title}
              cover={<img src={product.thumbnail} alt={product.title} />}
            >
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>

              <Button
                onClick={() => handleAddToCart(product)}
                type="primary"
                loading={loading[product.id]}
              >
                Add to cart
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <ToastContainer />
    </div>
  );
};

export default Home;
