import React from "react";

function ListComment(props) {
  let { comment } = props;

  function handleReplay(e) {
    e.preventDefault();

    props.getReplay(e.target.id);
  }

  function fetchData() {
    // console.log(comment);
    if (comment && comment.length > 0) {
      return comment.map((value) => {
        if (value.id_comment === 0) {
          // console.log(value);
          return (
            <>
              <li class="media">
                <a class="pull-left" href="#">
                  <img
                    src={
                      "http://localhost/laravel/laravel/public/upload/Blog/image/" +
                      value.image_user
                    }
                    alt=""
                  />
                </a>
                <div class="media-body">
                  <ul class="sinlge-post-meta">
                    <li>
                      <i class="fa fa-user"></i>
                      {value.name_user}
                    </li>
                    <li>
                      <i class="fa fa-clock-o"></i> {value.updated_at}
                    </li>
                    <li>
                      <i class="fa fa-calendar"></i> {value.updated_at}
                    </li>
                  </ul>
                  <p>{value.comment}</p>
                  <a class="btn btn-primary" href="">
                    <i class="fa fa-reply" id={value.id} onClick={handleReplay}>
                      Replay
                    </i>
                  </a>
                </div>
              </li>

              {comment.map((value2) => {
                if (value.id == value2.id_comment) {
                  // console.log(value);
                  return (
                    <li class="media second-media">
                      <a class="pull-left" href="#">
                        <img
                          class="media-object"
                          src="images/blog/man-three.jpg"
                          alt=""
                        />
                      </a>
                      <div class="media-body">
                        <ul class="sinlge-post-meta">
                          <li>
                            <i class="fa fa-user"></i> {value2.name_user}
                          </li>
                          <li>
                            <i class="fa fa-clock-o"></i>
                            {value2.updated_at}
                          </li>
                          <li>
                            <i class="fa fa-calendar"></i> {value2.updated_at}
                          </li>
                        </ul>
                        <p>{value2.comment}</p>
                        <a class="btn btn-primary" href="">
                          <i
                            class="fa fa-reply"
                            id={value2.id}
                            onClick={handleReplay}
                          >
                            Replay
                          </i>
                        </a>
                      </div>
                    </li>
                  );
                }
              })}
            </>
          );
        }
      });
    }
  }

  return (
    <>
      <div class="response-area">
        <h2>3 RESPONSES</h2>
        <ul class="media-list">{fetchData()}</ul>
      </div>
    </>
  );
}
export default ListComment;
