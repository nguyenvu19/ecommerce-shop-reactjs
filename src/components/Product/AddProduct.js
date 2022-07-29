import React, { useEffect, useState } from "react";
import MenuLeftUser from "../Layout/MenuLeftUser";
import axios from "axios";
import FormError from "../Error/FormError";

function AddProduct(props) {
  const [errors, setErrors] = useState({});
  const [getFile, setFile] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    company: "",
    detail: "",
    status: "",
    sale: "",
  });
  const [getCategory, setGetCategory] = useState();
  const [getBrand, setGetBrand] = useState();

  useEffect(() => {
    axios
      .get("http://localhost/laravel/laravel/public/api/category-brand")
      .then((res) => {
        setBrand(res.data.brand);
        setCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleInput(e) {
    const nameInput = e.target.name;
    const value = e.target.value;

    setInputs((state) => ({ ...state, [nameInput]: value }));
  }

  function handleCategory(e) {
    console.log(e.target.value);
    setGetCategory(e.target.value);
  }
  function handleBrand(e) {
    console.log(e.target.value);
    setGetBrand(e.target.value);
  }
  function handleFile(e) {
    const file = e.target.files;
    setFile(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let errorSubmit = {};

    let flag = true;

    if (inputs.name == "") {
      errorSubmit.name = "Nhap name";
      flag = false;
    }

    if (inputs.price == "") {
      errorSubmit.price = "Nhap price";
      flag = false;
    } else if (!inputs.price.match("[0-9]{10}")) {
      errorSubmit.price = "Nhap price dung dinh dang  ";
    }

    const check = ["jpeg", "png", "jpg", "PNG", "JPG"];

    if (getFile == "") {
      errorSubmit.pass = "Nhap file";
      flag = false;
    } else {
      if (getFile.size > 1024 * 1024) {
        errorSubmit.file = "File qua dung luong";
        flag = false;
      } else if (
        check.includes(
          Array.from(getFile).map((value) => value.type.split("/")[1])
        )
      ) {
        errorSubmit.file = "File khong dung dinh dang";
      }
    }

    if (inputs.company == "") {
      errorSubmit.price = "Nhap price";
      flag = false;
    }

    if (inputs.detail == "") {
      errorSubmit.price = "Nhap detail";
      flag = false;
    }
    console.log(
      inputs.name,
      inputs.price,
      inputs.company,
      inputs.detail,
      inputs.status,
      inputs.sale,
      getCategory,
      getBrand,
      getFile
    );

    // "message": "SQLSTATE[22007]: Invalid datetime format: 1366 Incorrect integer value: 'New' for column `laravel-api`.`product`.`status` at row 1
    // (SQL: insert into `product`
    // (`name`, `price`, `detail`, `status`, `sale`, `image`, `id_category`, `id_brand`, `company_profile`, `id_user`, `updated_at`, `created_at`) values
    // (Admin, 123, 111, New, ?, [\"1656379410_gallery3.jpg\"], Category2, Brand2, DUT, 14, 2022-06-28 08:23:30, 2022-06-28 08:23:30))",

    let formData = new FormData();
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      let url = "http://localhost/laravel/laravel/public/api/user/add-product";
      let accessToken = token;

      let config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      formData.append("name", inputs.name);
      formData.append("price", inputs.price);
      formData.append("category", getCategory);
      formData.append("brand", getBrand);
      formData.append("company", inputs.company);
      formData.append("detail", inputs.detail);
      formData.append("status", inputs.status);
      formData.append("sale", inputs.sale ? inputs.sale : "");

      Object.keys(getFile).map((value, i) => {
        console.log(getFile[value]);
        formData.append("file[]", getFile[value]);
      });

      axios
        .post(url, formData, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div>
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
                  placeholder="name"
                />

                <input
                  type="text"
                  name="price"
                  onChange={handleInput}
                  placeholder="price"
                />

                <select onChange={handleCategory}>
                  {category &&
                    category.map((value, i) => (
                      <option value={value.id} key={i}>
                        {value.category}
                      </option>
                    ))}
                </select>

                <select onChange={handleBrand}>
                  {brand &&
                    brand.map((value, i) => (
                      <option value={value.id} key={i}>
                        {value.brand}
                      </option>
                    ))}
                </select>

                <select name="status" onChange={handleInput}>
                  <option value={1}>New</option>
                  <option value={0}>Sale</option>
                </select>
                {inputs.status == 0 ? (
                  <input type="text" name="sale" onChange={handleInput} />
                ) : null}

                <input
                  type="text"
                  name="company"
                  onChange={handleInput}
                  placeholder="Company Profile"
                />

                <input type="file" name="file" multiple onChange={handleFile} />

                <input
                  type="text"
                  name="detail"
                  onChange={handleInput}
                  placeholder="Detail"
                />
                <button type="submit" class="btn btn-default">
                  Add product
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddProduct;
