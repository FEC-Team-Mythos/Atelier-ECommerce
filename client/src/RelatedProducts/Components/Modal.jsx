import React, { useRef, useState } from "react";

// this component is for the modal popup
function Modal({ showModal, setShowModal }) {

  const modalRef = useRef(null);

  return (
    <>
      {showModal ? (
        <div className="related-product-modal"
          onClick={(e) => { if (modalRef.current.contains(e.target)) { return; }
          setShowModal(false); }}>
          <div style={{ backgroundColor: "white" }} ref={modalRef}>
            <h1>Compare Products</h1>
            <button onClick={() => setShowModal(false)}> close</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;