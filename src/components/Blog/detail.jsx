import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuLeft from "../Layout/MenuLeft";
import BlogComment from "./comment";
import ListComment from "./listComment";
import Rate from "./rate";

function BlogDetail(props) {
  const [data, setData] = useState();
  const [comment, setComment] = useState();
  const [subComment, setSubComment] = useState("");

  let { paramID } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost/laravel/laravel/public/api/blog/detail/" + paramID)
      .then((res) => {
        setData(res.data.data);
        setComment(res.data.data.comment);
        // console.log(data);
        // console.log(comment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function fetchData() {
    if (data && Object.keys(data).length > 0) {
      return (
        <div class="single-blog-post">
          <h3>{data.title}</h3>
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
          </div>
          <a href="">
            <img
              src={
                "http://localhost/laravel/laravel/public/upload/Blog/image/" +
                data.image
              }
              alt=""
            />
          </a>
          <p>{data.description}</p>

          <div class="pager-area">
            <ul class="pager pull-right">
              <li>
                <a href="#">Pre</a>
              </li>
              <li>
                <a href="#">Next</a>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }

  function getReplay(getReplay) {
    setSubComment(getReplay);
    console.log(getReplay);
  }

  function getComment(getComment) {
    console.log(comment);
    setComment(comment.concat(getComment));
  }
  return (
    <>
      <MenuLeft />

      <div class="col-sm-9">
        <div class="blog-post-area">
          <h2 class="title text-center">Latest From our Blog</h2>
          {fetchData()}
        </div>

        <Rate paramID={paramID} />

        <ListComment comment={comment} getReplay={getReplay} />

        <BlogComment
          paramId={paramID}
          getComment={getComment}
          subComment={subComment}
        />
      </div>
    </>
  );
}

export default BlogDetail;
