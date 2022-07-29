import axios from "axios";
import React, { useState } from "react";
import FormError from "../Error/FormError";

function Register(props) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    level: "0",
  });
  const [errors, setErrors] = useState({});
  const [getFile, setFile] = useState("");
  const [avatar, setAvatar] = useState("");

  function handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;

    setInputs((state) => ({ ...state, [nameInput]: value }));
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

    if (inputs.password == "") {
      errorSubmit.password = "Nhap pass";
      flag = false;
    }

    if (inputs.phone == "") {
      errorSubmit.phone = "Nhap phone";
      flag = false;
    } else if (!inputs.phone.match("[0-9]{10}")) {
      errorSubmit.phone = "Nhap phone dung dinh dang  ";
    }

    if (inputs.level == "") {
      errorSubmit.level = "Nhap level";
      flag = false;
    } else if (inputs.level >= 2 || inputs.level < 0) {
      errorSubmit.level = "Nhap level 1 hoac 0";
      flag = false;
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
      inputs["avatar"] = avatar;

      axios
        .post("http://localhost/laravel/laravel/public/api/register", inputs)
        .then((response) => {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            alert("ok");
          }
        });
    }
  }

  return (
    <section id="form">
      <div class="row">
        <div class="col-sm-4">
          <div class="signup-form">
            <FormError errors={errors} />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <input
                type="text"
                name="name"
                onChange={handleInput}
                placeholder="Name"
              />
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
              <input
                type="text"
                name="address"
                onChange={handleInput}
                placeholder="Address"
              />
              <input
                type="text"
                name="phone"
                onChange={handleInput}
                placeholder="Phone"
              />
              <input
                type="number"
                name="level"
                onChange={handleInput}
                placeholder="Level"
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
  );
}

export default Register;
