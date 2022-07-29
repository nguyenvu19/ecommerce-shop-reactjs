import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext";

function ProductHome(props) {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [list, setList] = useState({});
  const getContext = useContext(CartContext);

  let count = 1;
  useEffect(() => {
    axios
      .get("http://localhost/laravel/laravel/public/api/product")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleMore(e) {
    e.preventDefault();
    // console.log(e.target.id);
    navigate("/product-detail/" + e.target.id);
  }

  function handleAddToCart(e) {
    e.preventDefault();

    const cart = localStorage.getItem("cart");

    let flag = 1;
    let product = {};
    if (cart) {
      product = JSON.parse(cart);
      Object.keys(product).map((key, index) => {
        if (e.target.id === key) {
          product[e.target.id] += 1;
          flag = 2;
        }
      });
    }

    if (flag === 1) {
      product[e.target.id] = 1;
    }
    console.log(Object.keys(product).length);
    getContext.cartCount(Object.keys(product).length);

    localStorage.setItem("cart", JSON.stringify(product));
  }
  console.log(getContext);
  console.log(list);
  return (
    <>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-sm-3">
              <div class="left-sidebar">
                <h2>Category</h2>
                <div class="panel-group category-products" id="accordian">
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a
                          data-toggle="collapse"
                          data-parent="#accordian"
                          href="#sportswear"
                        >
                          <span class="badge pull-right">
                            <i class="fa fa-plus"></i>
                          </span>
                          Sportswear
                        </a>
                      </h4>
                    </div>
                    <div id="sportswear" class="panel-collapse collapse">
                      <div class="panel-body">
                        <ul>
                          <li>
                            <a href="#">Nike </a>
                          </li>
                          <li>
                            <a href="#">Under Armour </a>
                          </li>
                          <li>
                            <a href="#">Adidas </a>
                          </li>
                          <li>
                            <a href="#">Puma</a>
                          </li>
                          <li>
                            <a href="#">ASICS </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a
                          data-toggle="collapse"
                          data-parent="#accordian"
                          href="#mens"
                        >
                          <span class="badge pull-right">
                            <i class="fa fa-plus"></i>
                          </span>
                          Mens
                        </a>
                      </h4>
                    </div>
                    <div id="mens" class="panel-collapse collapse">
                      <div class="panel-body">
                        <ul>
                          <li>
                            <a href="#">Fendi</a>
                          </li>
                          <li>
                            <a href="#">Guess</a>
                          </li>
                          <li>
                            <a href="#">Valentino</a>
                          </li>
                          <li>
                            <a href="#">Dior</a>
                          </li>
                          <li>
                            <a href="#">Versace</a>
                          </li>
                          <li>
                            <a href="#">Armani</a>
                          </li>
                          <li>
                            <a href="#">Prada</a>
                          </li>
                          <li>
                            <a href="#">Dolce and Gabbana</a>
                          </li>
                          <li>
                            <a href="#">Chanel</a>
                          </li>
                          <li>
                            <a href="#">Gucci</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a
                          data-toggle="collapse"
                          data-parent="#accordian"
                          href="#womens"
                        >
                          <span class="badge pull-right">
                            <i class="fa fa-plus"></i>
                          </span>
                          Womens
                        </a>
                      </h4>
                    </div>
                    <div id="womens" class="panel-collapse collapse">
                      <div class="panel-body">
                        <ul>
                          <li>
                            <a href="#">Fendi</a>
                          </li>
                          <li>
                            <a href="#">Guess</a>
                          </li>
                          <li>
                            <a href="#">Valentino</a>
                          </li>
                          <li>
                            <a href="#">Dior</a>
                          </li>
                          <li>
                            <a href="#">Versace</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a href="#">Kids</a>
                      </h4>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a href="#">Fashion</a>
                      </h4>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a href="#">Households</a>
                      </h4>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a href="#">Interiors</a>
                      </h4>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a href="#">Clothing</a>
                      </h4>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a href="#">Bags</a>
                      </h4>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading">
                      <h4 class="panel-title">
                        <a href="#">Shoes</a>
                      </h4>
                    </div>
                  </div>
                </div>

                <div class="brands_products">
                  <h2>Brands</h2>
                  <div class="brands-name">
                    <ul class="nav nav-pills nav-stacked">
                      <li>
                        <a href="#">
                          {" "}
                          <span class="pull-right">(50)</span>Acne
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {" "}
                          <span class="pull-right">(56)</span>Grüne Erde
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {" "}
                          <span class="pull-right">(27)</span>Albiro
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {" "}
                          <span class="pull-right">(32)</span>Ronhill
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {" "}
                          <span class="pull-right">(5)</span>Oddmolly
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {" "}
                          <span class="pull-right">(9)</span>Boudestijn
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {" "}
                          <span class="pull-right">(4)</span>Rösch creative
                          culture
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="price-range">
                  <h2>Price Range</h2>
                  <div class="well text-center">
                    <input
                      type="text"
                      class="span2"
                      value=""
                      data-slider-min="0"
                      data-slider-max="600"
                      data-slider-step="5"
                      data-slider-value="[250,450]"
                      id="sl2"
                    />
                    <br />
                    <b class="pull-left">$ 0</b> <b class="pull-right">$ 600</b>
                  </div>
                </div>

                <div class="shipping text-center">
                  <img src="images/home/shipping.jpg" alt="" />
                </div>
              </div>
            </div>

            <div class="col-sm-9 padding-right">
              <div class="features_items">
                <h2 class="title text-center">Features Items</h2>

                {data &&
                  data.map((value) => {
                    let image = JSON.parse(value.image);
                    return (
                      <div class="col-sm-4">
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center" data-index="1">
                              <img
                                src={`http://localhost/laravel/laravel/public/upload/user/product/${value.id_user}/${image[0]}`}
                              />
                              <h2>${value.price}</h2>
                              <p>{value.name}</p>
                              <a href="#" class="btn btn-default add-to-cart">
                                <i class="fa fa-shopping-cart"></i>Add to cart
                              </a>
                            </div>
                            <div class="product-overlay">
                              <div class="overlay-content">
                                <h2>${value.price}</h2>
                                <p>{value.name}</p>
                                <a
                                  href=""
                                  class="btn btn-default add-to-cart"
                                  onClick={handleAddToCart}
                                  id={value.id}
                                >
                                  <i class="fa fa-shopping-cart"></i>Add to cart
                                </a>
                                <button
                                  class="btn btn-default"
                                  onClick={handleMore}
                                  id={value.id}
                                >
                                  More
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="choose">
                            <ul class="nav nav-pills nav-justified">
                              <li>
                                <a href="#">
                                  <i class="fa fa-plus-square"></i>Add to
                                  wishlist
                                </a>
                              </li>
                              <li>
                                <a href="">
                                  <i class="fa fa-plus-square"></i>Add to
                                  compare
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div class="category-tab">
                <div class="col-sm-12">
                  <ul class="nav nav-tabs">
                    <li class="active">
                      <a href="#tshirt" data-toggle="tab">
                        T-Shirt
                      </a>
                    </li>
                    <li>
                      <a href="#blazers" data-toggle="tab">
                        Blazers
                      </a>
                    </li>
                    <li>
                      <a href="#sunglass" data-toggle="tab">
                        Sunglass
                      </a>
                    </li>
                    <li>
                      <a href="#kids" data-toggle="tab">
                        Kids
                      </a>
                    </li>
                    <li>
                      <a href="#poloshirt" data-toggle="tab">
                        Polo shirt
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="tab-content">
                  <div class="tab-pane fade active in" id="tshirt">
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery4.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane fade" id="blazers">
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery4.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane fade" id="sunglass">
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery4.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane fade" id="kids">
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery4.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="tab-pane fade" id="poloshirt">
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery2.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery4.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery3.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="product-image-wrapper">
                        <div class="single-products">
                          <div class="productinfo text-center">
                            <img src="images/home/gallery1.jpg" alt="" />
                            <h2>$56</h2>
                            <p>Easy Polo Black Edition</p>
                            <a href="#" class="btn btn-default add-to-cart">
                              <i class="fa fa-shopping-cart"></i>Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="recommended_items">
                <h2 class="title text-center">recommended items</h2>

                <div
                  id="recommended-item-carousel"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <div class="carousel-inner">
                    <div class="item active">
                      <div class="col-sm-4">
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend1.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart">
                                <i class="fa fa-shopping-cart"></i>Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend2.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart">
                                <i class="fa fa-shopping-cart"></i>Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend3.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart">
                                <i class="fa fa-shopping-cart"></i>Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="col-sm-4">
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend1.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart">
                                <i class="fa fa-shopping-cart"></i>Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend2.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart">
                                <i class="fa fa-shopping-cart"></i>Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="product-image-wrapper">
                          <div class="single-products">
                            <div class="productinfo text-center">
                              <img src="images/home/recommend3.jpg" alt="" />
                              <h2>$56</h2>
                              <p>Easy Polo Black Edition</p>
                              <a href="#" class="btn btn-default add-to-cart">
                                <i class="fa fa-shopping-cart"></i>Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    class="left recommended-item-control"
                    href="#recommended-item-carousel"
                    data-slide="prev"
                  >
                    <i class="fa fa-angle-left"></i>
                  </a>
                  <a
                    class="right recommended-item-control"
                    href="#recommended-item-carousel"
                    data-slide="next"
                  >
                    <i class="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductHome;
