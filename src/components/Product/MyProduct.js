import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuLeftUser from "../Layout/MenuLeftUser";
function MyProduct(props) {
  const token = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState();
  const [id, setId] = useState("");
  const navigate = useNavigate();

  let url = "http://localhost/laravel/laravel/public/api/user/my-product";
  let accessToken = token;

  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(
          `http://localhost/laravel/laravel/public/api/user/delete-product/${id}`,
          config
        )
        .then((res) => {
          setData(res.data.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  function handleDelete(e) {
    e.preventDefault();
    // console.log(e.target.id);
    setId(e.target.id);
  }
  console.log(id);

  function handleEdit(e) {
    e.preventDefault();

    navigate("/edit-product/" + e.target.id);
    console.log(e.target.id);
  }
  return (
    <>
      <MenuLeftUser />
      <section id="cart_items" class="col-sm-8">
        <div class="container-fluid">
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
                  <td class="id">id</td>
                  <td class="name">name</td>
                  <td class="image">image</td>
                  <td class="price">price</td>
                  <td class="total">Action</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  Object.values(data).map((value, i) => {
                    // console.log(JSON.parse(value.image)[0].slice(11));
                    return (
                      <tr id={value.id}>
                        <td class="cart_id">{value.id}</td>
                        <td class="cart_name">{value.name}</td>
                        <td class="cart_image">
                          <img
                            src={
                              `http://localhost/laravel/laravel/public/product/${value.id_user}/` +
                              JSON.parse(value.image)[0].slice(11)
                            }
                            alt=""
                          />
                        </td>

                        <td class="cart_price">${value.price}</td>

                        <td>
                          <ul class="list-inline m-0">
                            <li class="list-inline-item">
                              <button
                                class="btn btn-success btn-sm rounded-0"
                                type="button"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                              >
                                <i
                                  class="fa fa-edit fa-2x"
                                  onClick={handleEdit}
                                  id={value.id}
                                ></i>
                              </button>
                            </li>
                          </ul>
                        </td>

                        <td
                          class="cart_action_delete"
                          onClick={handleDelete}
                          id={value.id}
                        >
                          <a class="cart_quantity_delete" href="">
                            <i class="fa fa-times fa-8x"></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })}{" "}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyProduct;
