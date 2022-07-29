import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

function Rate(props) {
  const flag = JSON.parse(localStorage.getItem("flag"));
  const userData = JSON.parse(localStorage.getItem("auth"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [rate, setRate] = useState();
  const [getRate, setGetRate] = useState();
  let { paramID } = useParams();

  if (!flag) {
    alert("Vui long dang nhap");
  }

  // get api rate
  useEffect(() => {
    axios
      .get("http://localhost/laravel/laravel/public/api/blog/rate/" + paramID)
      .then((res) => {
        setGetRate(
          res.data.data
            .map((value) => value.rate)
            .reduce((total, amount, index, array) => {
              total += amount;
              if (index === array.length - 1) {
                return total / array.length;
              } else {
                return total;
              }
            })
        );

        let data = res.data.data;
        let tong = 0;
        if (data.length > 0) {
          data.map((value, key) => {
            tong = tong + value.rate;
          });
          let tbc = tong / data.length;
          setGetRate(tbc);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(getRate);
  // duong dan api
  let url = "http://localhost/laravel/laravel/public/api/blog/rate/" + paramID;
  let accessToken = token;

  //config de gui token qua API
  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  const formData = new FormData();

  function ratingChanged(newValue) {
    setRate(newValue);
    if (rate) {
      formData.append("blog_id", paramID);
      formData.append("user_id", userData.id);
      formData.append("rate", rate);
      axios.post(url, formData, config).then((res) => {
        console.log(res);
      });
    }
    console.log(`Example 3: new value is ${newValue}`);
  }
  //   const stars = {
  //     size: 40,
  //     count: 5,
  //     isHalf: false,
  //     value: Math.ceil(getRate),
  //     color: "gray",
  //     activeColor: "orange",
  //     onChange: (newValue) => {
  //       setRate(newValue);
  //       if (rate) {
  //         formData.append("blog_id", paramID);
  //         formData.append("user_id", userData.id);
  //         formData.append("rate", rate);
  //         axios.post(url, formData, config).then((res) => {
  //           console.log(res);
  //         });
  //       }
  //       console.log(`Example 3: new value is ${newValue}`);
  //     },
  //   };
  //   stars.value = Math.ceil(getRate);
  //   console.log(stars.value);

  return (
    <>
      <div class="rating-area">
        <ul class="ratings">
          <li class="rate-this">Rate this item:</li>
          {/* <li>
            <i class="fa fa-star color"></i>
            <i class="fa fa-star color"></i>
            <i class="fa fa-star color"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
          </li> */}
          {/* <ReactStars {...stars} /> */}
          <ReactStars
            count={getRate}
            onChange={ratingChanged}
            size={24}
            activeColor="orange"
          />
          ,<li class="color">(6 votes)</li>
        </ul>
        <ul class="tag">
          <li>TAG:</li>
          <li>
            <a class="color" href="">
              Pink <span>/</span>
            </a>
          </li>
          <li>
            <a class="color" href="">
              T-Shirt <span>/</span>
            </a>
          </li>
          <li>
            <a class="color" href="">
              Girls
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Rate;
