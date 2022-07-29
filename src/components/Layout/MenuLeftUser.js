import React from "react";

function MenuLeftUser(props) {
  return (
    <>
      <div class="col-sm-3">
        <div class="left-sidebar">
          <h2>Account</h2>
          <div class="panel-group category-products" id="accordian">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordian" href="">
                    <span class="badge pull-right">
                      <i class="fa fa-plus"></i>
                    </span>
                    Account
                  </a>
                </h4>
              </div>
              <div id="sportswear" class="panel-collapse collapse">
                <div class="panel-body">
                  {/* <ul>
                    <li>
                      <a href="">Nike </a>
                    </li>
                    <li>
                      <a href="">Under Armour </a>
                    </li>
                    <li>
                      <a href="">Adidas </a>
                    </li>
                    <li>
                      <a href="">Puma</a>
                    </li>
                    <li>
                      <a href="">ASICS </a>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordian" href="">
                    <span class="badge pull-right">
                      <i class="fa fa-plus"></i>
                    </span>
                    My Product
                  </a>
                </h4>
              </div>
              <div id="mens" class="panel-collapse collapse">
                <div class="panel-body">
                  <ul>
                    <li>
                      <a href="">Fendi</a>
                    </li>
                    <li>
                      <a href="">Guess</a>
                    </li>
                    <li>
                      <a href="">Valentino</a>
                    </li>
                    <li>
                      <a href="">Dior</a>
                    </li>
                    <li>
                      <a href="">Versace</a>
                    </li>
                    <li>
                      <a href="">Armani</a>
                    </li>
                    <li>
                      <a href="">Prada</a>
                    </li>
                    <li>
                      <a href="">Dolce and Gabbana</a>
                    </li>
                    <li>
                      <a href="">Chanel</a>
                    </li>
                    <li>
                      <a href="">Gucci</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuLeftUser;
