import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuLeftUser from "../Layout/MenuLeftUser";

function EditProduct(props) {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState();
  const [getFile, setFile] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    status: "",
    sale: "",
    company_profile: "",
    detail: "",
    image: "",
    id_brand: "",
    id_category: "",
  });
  let { paramID } = useParams();

  let url =
    "http://localhost/laravel/laravel/public/api/user/product/" + paramID;
  let accessToken = token;
  //config de gui token qua API
  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        setInputs(res.data.data);
        console.log(res.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(inputs);
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

  function handleFile(e) {
    const file = e.target.files;
    setFile(file);
  }

  const [avatarCheckBox, setAvatarCheckBox] = useState([]);

  function handleCheckBox(e) {
    var updatedList = [...avatarCheckBox];
    console.log(e.target.checked);

    if (e.target.checked) {
      if (!avatarCheckBox.includes(e.target.value)) {
        // setAvatarCheckBox((oldArray) => {
        //   return [...oldArray, e.target.value];
        // });
        updatedList = [...avatarCheckBox, e.target.value];
      }
    } else {
      updatedList.splice(avatarCheckBox.indexOf(e.target.value), 1);
    }
    setAvatarCheckBox(updatedList);

    console.log(avatarCheckBox);
  }
  console.log(avatarCheckBox);

  function handleSubmit(e) {
    e.preventDefault();

    let errorSubmit = {};

    let flag = true;

    if (inputs.name == "") {
      errorSubmit.name = "Nhap name";
      flag = false;
    }

    console.log(inputs.price);
    if (inputs.price == "") {
      errorSubmit.price = "Nhap price";
      flag = false;
    }

    const check = ["jpeg", "png", "jpg", "PNG", "JPG"];

    if (avatarCheckBox.size > 1024 * 1024) {
      errorSubmit.file = "File qua dung luong";
      flag = false;
    } else if (
      check.includes(
        Array.from(getFile).map((value) => value.type.split("/")[1])
      )
    ) {
      errorSubmit.file = "File khong dung dinh dang";
    }

    if (inputs.company_profile == "") {
      errorSubmit.company_profile = "Nhap company_profile";
      flag = false;
    }

    if (inputs.detail == "") {
      errorSubmit.detail = "Nhap detail";
      flag = false;
    }

    console.log(
      // inputs.name,
      // inputs.price,
      // inputs.company_profile,
      // inputs.detail,
      // inputs.status,
      // inputs.sale,
      // getCategory,
      // getBrand,
      avatarCheckBox
    );

    // let newArr = [
    //   ...Object.values(getFile).map((value) => value.name),
    //   ...avatarCheckBox,
    // ];
    // console.log(newArr);
    let formData = new FormData();
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      formData.append("name", inputs.name);
      formData.append("price", inputs.price);
      formData.append("category", inputs.id_category);
      formData.append("brand", inputs.id_brand);
      formData.append("company", inputs.company_profile);
      formData.append("detail", inputs.detail);
      formData.append("status", inputs.status);
      formData.append("sale", inputs.sale ? inputs.sale : "");

      avatarCheckBox.map((value) => {
        formData.append("avatarCheckBox[]", value);
        console.log(value);
      });

      Object.keys(getFile).map((value, i) => {
        console.log(getFile[value]);
        formData.append("file[]", getFile[value]);
      });

      axios
        .post(
          "http://localhost/laravel/laravel/public/api/user/edit-product/" +
            paramID,
          formData,
          config
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      {" "}
      <section id="form">
        <MenuLeftUser />
        <div class="row">
          <div class="col-sm-4">
            <div class="signup-form">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  placeholder="name"
                  value={inputs.name}
                />

                <input
                  type="text"
                  name="price"
                  onChange={handleInput}
                  placeholder="price"
                  value={inputs.price}
                />

                <select
                  name="id_category"
                  value={inputs.id_category}
                  onChange={handleInput}
                >
                  {category &&
                    category.map((value, i) => (
                      <option value={value.id} key={i}>
                        {value.category}
                      </option>
                    ))}
                </select>

                <select
                  value={inputs.id_brand}
                  name="id_brand"
                  onChange={handleInput}
                >
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
                  value={inputs.company_profile}
                />

                <input type="file" name="file" multiple onChange={handleFile} />
                <ul style={{ display: "flex" }}>
                  {inputs.image &&
                    inputs.image.map((value, i) => {
                      return (
                        <li key={i} style={{ padding: "10px" }}>
                          <img
                            src={`http://localhost/laravel/laravel/public/upload/user/product/${inputs.id_user}/${value}`}
                            style={{ width: "50px", height: "50px" }}
                          />
                          <input
                            type="checkbox"
                            onClick={handleCheckBox}
                            value={value}
                          />
                        </li>
                      );
                    })}
                </ul>
                <input
                  type="text"
                  name="detail"
                  onChange={handleInput}
                  placeholder="Detail"
                  value={inputs.detail}
                />

                <button type="submit" class="btn btn-default">
                  Edit product
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditProduct;
