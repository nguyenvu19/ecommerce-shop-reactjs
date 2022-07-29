import React from "react";

function FormError(props) {
  let { errors } = props;
  function renderError() {
    if (Object.keys(errors).length > 0) {
      return Object.keys(errors).map((key, index) => {
        return <li key={index}>{errors[key]}</li>;
      });
    }
  }
  return <div>{renderError()}</div>;
}

export default FormError;
