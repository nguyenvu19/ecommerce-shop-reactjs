import axios from "axios";
import React, { useState } from "react";
import BlogDetail from "./detail";
import ListComment from "./listComment";

function BlogComment(props) {
  const flag = JSON.parse(localStorage.getItem("flag"));
  const userData = JSON.parse(localStorage.getItem("auth"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [comment, setComment] = useState();

  // console.log(subComment);
  // kiem tra comment da nhap chua
  if (!flag) {
    alert("Vui long dang nhap");
  }

  // duong dan api
  let url =
    "http://localhost/laravel/laravel/public/api/blog/comment/" + userData.id;
  let accessToken = token;

  //config de gui token qua API
  let config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  function handleComment(e) {
    setComment(e.target.value);
  }

  const formData = new FormData();
  function handlePost(e) {
    e.preventDefault();
    if (comment) {
      formData.append("id_blog", props.paramId);
      formData.append("id_user", userData.id);
      formData.append("id_comment", props.subComment ? props.subComment : 0);
      formData.append("comment", comment);
      formData.append("image_user", userData.avatar);
      formData.append("name_user", userData.name);

      axios.post(url, formData, config).then((res) => {
        console.log(res);
        props.getComment(res.data.data);
      });
    }
  }

  return (
    <>
      <div class="replay-box">
        <div class="row">
          <div class="col-sm-12">
            <h2>Leave a replay</h2>

            <div class="text-area">
              <div class="blank-arrow">
                <label>Your Name</label>
              </div>
              <span>*</span>
              <textarea
                name="message"
                rows="11"
                onChange={handleComment}
              ></textarea>
              <button class="btn btn-primary" onClick={handlePost}>
                post comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogComment;
