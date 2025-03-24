import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import "./styles.css";
console.log(localStorage);

export function Card({ coffeeImg, tags, title, description }) {
  
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity(prevQuantity => prevQuantity + 1);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
 const addToCart = () => {
    
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    
    const itemIndex = cart.findIndex(item => item.title === title);

    if (itemIndex >= 0) {
      
      cart[itemIndex].quantity += quantity;
    } else {
      const newItem = { title, quantity, price: 9.90 };
      cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

   console.log(`Adicionando ${quantity} item(s) de ${title} ao carrinho.`);
    console.log("Carrinho atualizado:", cart);
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      console.log("Carrinho carregado do localStorage:", cart);
    }
  }, []);

  return (
    <div id="card">
      <img src={coffeeImg} alt={title} id="coffeeImg" />
      <div className="tags-container">
        {tags.map((tag, index) => (
          <div className="tag" key={index}>
            <span>{tag}</span>
          </div>
        ))}
      </div>

      <h1>{title}</h1>
      <p className="description">{description}</p>

      <div id="details">
        <div className="price">
          <p>
            R$ <strong>9,90</strong>
          </p>
        </div>

        <div id="quantityButtons">
          <button type="button" onClick={decrement}>-</button>
          <span>{quantity}</span>
          <button type="button" onClick={increment}>+</button>
        </div>

        <button type="button" className="shoppingBtn" onClick={addToCart}>
          <ShoppingCart color="#F3F2F2" fill="#F3F2F2" size={20} />
        </button>
      </div>
    </div>
  );
}
