import React, { useState } from "react";
import FormError from "../Error/FormError";
import MenuLeftUser from "../Layout/MenuLeftUser";
import axios from "axios";
function UserUpdate(props) {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const [inputs, setInputs] = useState({
    name: userData.name,
    email: userData.email,
    password: "",
    address: userData.address,
    phone: userData.phone,
  });
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState("");
  const [getFile, setFile] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  function handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;

    console.log(nameInput, value);
    setInputs((state) => ({ ...state, [nameInput]: value }));
    // setInputs(...inputs);
  }

  function handleFile(e) {
    const file = e.target.files;
    console.log(file);
    // send file to api server
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result);
      setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  }

  let url =
    "http://localhost/laravel/laravel/public/api/user/update/" + userData.id;
  let accessToken = token;
  console.log(userData.id);
  //config de gui token qua API
  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  const formData = new FormData();
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

    if (inputs.name == "") {
      errorSubmit.name = "Nhap name";
      flag = false;
    }

    if (inputs.address == "") {
      errorSubmit.address = "Nhap address";
      flag = false;
    }

    if (inputs.phone == "") {
      errorSubmit.phone = "Nhap phone";
      flag = false;
    } else if (!inputs.phone.match("[0-9]{10}")) {
      errorSubmit.phone = "Nhap phone dung dinh dang  ";
    }

    const check = ["jpeg", "png", "jpg", "PNG", "JPG"];
    if (getFile == "") {
      errorSubmit.pass = "Nhap file";
      flag = false;
    } else {
      if (getFile.size > 1024 * 1024) {
        errorSubmit.file = "File qua dung luong";
        flag = false;
      } else if (check.includes(getFile.type.split("/")[1])) {
        errorSubmit.file = "File khong dung dinh dang";
      }
    }

    if (!flag) {
      setErrors(errorSubmit);
    } else {
      formData.append("name", inputs.name);
      formData.append("email", inputs.email);
      formData.append("password", inputs.password);
      formData.append("address", inputs.address);
      formData.append("phone", inputs.phone);

      axios.post(url, formData, config).then((res) => {
        console.log(res);
      });

      localStorage.setItem("auth", JSON.stringify(inputs));
    }
  }

  return (
    <>
      <section id="form">
        <MenuLeftUser />
        <div class="row">
          <div class="col-sm-4">
            <div class="signup-form">
              <FormError errors={errors} />
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  value={inputs.name}
                  placeholder="name"
                />
                <input
                  type="text"
                  name="email"
                  onChange={handleInput}
                  value={inputs.email}
                  readOnly
                />
                <input
                  type="password"
                  name="password"
                  onChange={handleInput}
                  placeholder="Password"
                />
                <input
                  type="text"
                  name="address"
                  onChange={handleInput}
                  value={inputs.address}
                  placeholder="Address"
                />
                <input
                  type="text"
                  name="phone"
                  onChange={handleInput}
                  value={inputs.phone}
                  placeholder="Phone"
                />

                <input type="file" name="file" onChange={handleFile} />

                <button type="submit" class="btn btn-default">
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserUpdate;
