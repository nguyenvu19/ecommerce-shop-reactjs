import axios from "axios";
import React, { useEffect, useState } from "react";
import FormError from "../Error/FormError";
import MenuLeftUser from "../Layout/MenuLeftUser";

function Login(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const auth = [];

  function handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;

    setInputs((state) => ({ ...state, [nameInput]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let errorSubmit = {};
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let flag = true;

    if (inputs.email == "") {
      errorSubmit.email = "Nhap email";
      flag = false;
    } else if (!re.test(inputs.email)) {
      errorSubmit.email = "name khong hop le";
    }

    if (inputs.password == "") {
      errorSubmit.password = "Nhap pass";
      flag = false;
    }

    if (!flag) {
      setErrors(errorSubmit);
    } else {
      axios
        .post("http://localhost/laravel/laravel/public/api/login", inputs)
        .then((response) => {
          // console.log(response.data.success.token);
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            alert("ok");
          }
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.success.token)
          );
          localStorage.setItem("auth", JSON.stringify(response.data.Auth));
        });

      localStorage.setItem("flag", JSON.stringify(flag));
    }
  }
  return (
    <section id="form">
      <div class="container">
        <div class="row">
          <MenuLeftUser />
          <div class="col-sm-4 col-sm-offset-1">
            <div class="login-form">
              <h2>Login to your account</h2>
              <FormError errors={errors} />

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="email"
                  onChange={handleInput}
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="password"
                  onChange={handleInput}
                  placeholder="Password"
                />

                <button type="submit" class="btn btn-default">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
