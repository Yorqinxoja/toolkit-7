import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { Table, Button, InputNumber, Card, Row, Col } from "antd";
import { useMemo } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);

  const handleQuantityChange = (product, quantity) => {
    if (quantity > 0) {
      dispatch(addToCart({ ...product, quantity }));
    } else {
      dispatch(removeFromCart(product));
    }
  };

  const subtotal = useMemo(() => {
    return cartProducts.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  }, [cartProducts]);

  const tax = useMemo(() => subtotal * 0.12, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const columns = [
    { title: "Product", dataIndex: "title", key: "title" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, product) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(product, value)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, product) => (
        <Button onClick={() => handleQuantityChange(product, 0)} danger>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center">
        <Col span={18}>
          <h2>Cart</h2>
          <Table
            dataSource={cartProducts}
            columns={columns}
            rowKey="id"
            pagination={false}
            bordered
          />
          <Card style={{ marginTop: 20 }}>
            <p>
              <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
            </p>
            <p>
              <strong>Tax (12%):</strong> ${tax.toFixed(2)}
            </p>
            <p>
              <strong>Total:</strong> ${total.toFixed(2)}
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
