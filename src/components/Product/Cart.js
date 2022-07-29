import axios from "axios";
import React, { useEffect, useState } from "react";

function Cart(props) {
  const [data, setData] = useState();
  // const cart =
  //   localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"));

  const cart =
    localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"));

  let cartCount = localStorage.getItem("cartCount");
  // const [newCart, setNewCart] = useState();
  useEffect(() => {
    axios
      .post("http://localhost/laravel/laravel/public/api/product/cart", cart)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUp(e) {
    e.preventDefault();

    let newData = [...data];
    newData.map((value, key) => {
      if (value.id == e.target.id) {
        newData[key].qty += 1;
        // console.log(newData);
        cart[e.target.id] = newData[key].qty;
        // console.log(cart);
      }
    });
    setData(newData);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  function handleDown(e) {
    e.preventDefault();
    let newData = [...data];
    newData.map((value, key) => {
      if (value.id == e.target.id) {
        newData[key].qty -= 1;
        console.log(value.qty);
        cart[e.target.id] = newData[key].qty;
      }
    });
    setData(newData);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  function handleQuantity(e) {
    console.log(e);
  }

  function handleDelete(e) {
    e.preventDefault();
    Object.keys(cart).map((key) => {
      if (key == e.target.id) {
        delete cart[key];
      }
      const filter = data.filter((value) => value.id != e.target.id);
      setData(filter);
      // console.log(cart);
    });
    localStorage.setItem("cart", JSON.stringify(cart));

    if (cartCount) {
      cartCount -= 1;
      localStorage.setItem("cartCount", JSON.stringify(cartCount));
    }
  }

  // console.log(data);
  return (
    <>
      <section id="cart_items">
        <div class="container">
          <div class="breadcrumbs">
            <ol class="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li class="active">Shopping Cart</li>
            </ol>
          </div>
          <div class="table-responsive cart_info">
            <table class="table table-condensed">
              <thead>
                <tr class="cart_menu">
                  <td class="image">Item</td>
                  <td class="description"></td>
                  <td class="price">Price</td>
                  <td class="quantity">Quantity</td>
                  <td class="total">Total</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((value) => {
                    return (
                      <tr>
                        <td class="cart_product">
                          <a href="">
                            <img src="images/cart/one.png" alt="" />
                          </a>
                        </td>
                        <td class="cart_description">
                          <h4>
                            <a href="">{value.name}</a>
                          </h4>
                          <p>Web ID: {value.id}</p>
                        </td>
                        <td class="cart_price">
                          <p>${value.price}</p>
                        </td>
                        <td class="cart_quantity">
                          <div class="cart_quantity_button">
                            <a
                              class="cart_quantity_up"
                              href=""
                              onClick={handleUp}
                              id={value.id}
                            >
                              {" "}
                              +{" "}
                            </a>
                            <input
                              class="cart_quantity_input"
                              type="text"
                              name="quantity"
                              value={value.qty}
                              // onChange={handleQuantity}
                              onChange={(e) => handleQuantity(e)}
                              autocomplete="off"
                              size="2"
                            />
                            <a
                              class="cart_quantity_down"
                              href=""
                              onClick={handleDown}
                              id={value.id}
                            >
                              {" "}
                              -{" "}
                            </a>
                          </div>
                        </td>
                        <td class="cart_total">
                          <p class="cart_total_price">
                            ${value.price * value.qty}
                          </p>
                        </td>
                        <td class="cart_delete">
                          <a class="cart_quantity_delete" href="">
                            <i
                              class="fa fa-times"
                              onClick={handleDelete}
                              id={value.id}
                            ></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="do_action">
        <div class="container">
          <div class="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="chose_area">
                <ul class="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping & Taxes</label>
                  </li>
                </ul>
                <ul class="user_info">
                  <li class="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li class="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li class="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a class="btn btn-default update" href="">
                  Get Quotes
                </a>
                <a class="btn btn-default check_out" href="">
                  Continue
                </a>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="total_area">
                <ul>
                  <li>
                    Cart Sub Total{" "}
                    <span>
                      $
                      {data &&
                        data
                          .map((value) => value.qty * value.price)
                          .reduce(
                            (total, currentValue) => total + currentValue
                          )}
                    </span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span>$61</span>
                  </li>
                </ul>
                <a class="btn btn-default update" href="">
                  Update
                </a>
                <a class="btn btn-default check_out" href="">
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
