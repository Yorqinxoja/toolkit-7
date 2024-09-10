import { Link } from "react-router-dom";
import { Menu } from "antd";
import { useState, useEffect } from "react";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Menu
      mode="horizontal"
      className={`nav-bar ${isScrolled ? "nav-bar-fixed" : ""}`}
      style={{
        backgroundColor: "#001529",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "500",
        position: isScrolled ? "fixed" : "relative",
        top: 0,
        width: "100%",
        zIndex: 1000,
        transition: "1.8s",
        boxShadow: isScrolled ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <Menu.Item key="home">
        <Link to="/" style={{ color: "#fff" }}>
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="cart">
        <Link to="/cart" style={{ color: "#fff" }}>
          Cart
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
