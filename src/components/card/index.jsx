import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import "./styles.css";
console.log(localStorage);

export function Card({ coffeeImg, tags, title, description }) {
  // Estado para controlar a quantidade de itens
  const [quantity, setQuantity] = useState(1);

  // Função para incrementar a quantidade
  const increment = () => setQuantity(prevQuantity => prevQuantity + 1);

  // Função para decrementar a quantidade (não deixa ir abaixo de 1)
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Função para adicionar ao carrinho
  const addToCart = () => {
    // Recupera o carrinho do localStorage, ou cria um novo carrinho vazio
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Verifica se o item já existe no carrinho
    const itemIndex = cart.findIndex(item => item.title === title);

    if (itemIndex >= 0) {
      // Se o item já estiver no carrinho, atualiza a quantidade
      cart[itemIndex].quantity += quantity;
    } else {
      // Se o item não estiver no carrinho, adiciona um novo item
      const newItem = { title, quantity, price: 9.90 };
      cart.push(newItem);
    }

    // Armazena o carrinho atualizado no localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    
    console.log(`Adicionando ${quantity} item(s) de ${title} ao carrinho.`);
    console.log("Carrinho atualizado:", cart);
  };

  // Carrega o carrinho do localStorage ao montar o componente
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
