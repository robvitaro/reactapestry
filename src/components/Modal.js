import React from "react";

const Modal = props => {
  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

  return(
    <div className={showHideClassName}>
      <section className="modal-main">
        {props.children}
        <button onClick={props.handleClose}>close</button>
      </section>
    </div>
  )
}

export default Modal