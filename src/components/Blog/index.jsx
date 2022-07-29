import axios from "axios";
import React, { useEffect, useState } from "react";

function BlogComponents(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/laravel/laravel/public/api/blog")
      .then((res) => {
        setData(res.data.blog);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function fetchData() {
    if (Object.keys(data).length > 0) {
      return data.data.map((value, key) => {
        // console.log(value, key);
        return (
          <div class="single-blog-post" key={key} index={key}>
            <h3>{value.title}</h3>
            <div class="post-meta">
              <ul>
                <li>
                  <i class="fa fa-user"></i> Mac Doe
                </li>
                <li>
                  <i class="fa fa-clock-o"></i> 1:33 pm
                </li>
                <li>
                  <i class="fa fa-calendar"></i> DEC 5, 2013
                </li>
              </ul>
              <span>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
              </span>
            </div>
            <a href="">
              <img
                src={
                  "http://localhost/laravel/laravel/public/upload/Blog/image/" +
                  value.image
                }
                alt=""
              />
            </a>
            <p>{value.description}</p>
            <a class="btn btn-primary" href="">
              Read More
            </a>
          </div>
        );
      });
    }
  }
  return (
    <>
      <div class="col-sm-9">
        <div class="blog-post-area">
          <h2 class="title text-center">Latest From Our Blog</h2>
          {fetchData()}
          <div class="pagination-area">
            <ul class="pagination">
              <li>
                <a href="" class="active">
                  1
                </a>
              </li>
              <li>
                <a href="">2</a>
              </li>
              <li>
                <a href="">3</a>
              </li>
              <li>
                <a href="">
                  <i class="fa fa-angle-double-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogComponents;
