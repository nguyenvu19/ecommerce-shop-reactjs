import "./App.css";
import Footer from "./components/Layout/Footer";
import Head from "./components/Layout/Head";
import MenuLeft from "./components/Layout/MenuLeft";
import { CartContext } from "./CartContext";
import { useState } from "react";

function App(props) {
  const [data, setData] = useState();
  function cartCount(data1) {
    console.log(data1);
    if (data1) {
      setData(data1);
      if (data) {
        localStorage.setItem("cartCount", JSON.stringify(data));
      }
    }
  }

  console.log(data);
  return (
    <>
      <CartContext.Provider value={{ cartCount: cartCount }}>
        <Head />

        <section>
          <div className="container">
            <div className="row">{props.children}</div>
          </div>
        </section>

        <Footer />
      </CartContext.Provider>
    </>
  );
}

export default App;
