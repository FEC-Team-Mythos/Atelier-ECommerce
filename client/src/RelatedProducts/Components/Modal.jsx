import React, { useRef, useState, useEffect } from "react";

// this component is for the modal popup
function Modal({ related, showModal, setShowModal, comparedProduct, currentProduct }) {

  // find like features and create array aligned by characteristic for display
  var features = {};
  if (currentProduct) {
    for (var i = 0; i < currentProduct.features.length; i++) {
      features[currentProduct.features[i].feature] = [currentProduct.features[i].value, null];
    }
    if (comparedProduct) {
      for (var j = 0; j < comparedProduct.features.length; j++) {
        if (features[comparedProduct.features[j].feature]) {
          features[comparedProduct.features[j].feature][1] = (comparedProduct.features[j].value);
        } else {
          features[comparedProduct.features[j].feature] = [null, comparedProduct.features[j].value]
        }
      }
    }
    var featuresArray = [];
    for (var key in features) {
      featuresArray.push([key, features[key][0], features[key][1]]);
    }
  }

  const modalRef = useRef(null);

  return (
    <>
      {showModal ? (
        <div className="related-product-modal"
          onClick={(e) => { if (modalRef.current.contains(e.target)) { return; }
          setShowModal(false); }}>
          <div style={{ backgroundColor: "white" }} ref={modalRef}>
            <h1>Compare Products</h1>
            <div className="table">
              <table>
                <tbody>
                  <tr>
                  <th>{currentProduct.name}</th>
                  <th></th>
                  <th>{comparedProduct.name}</th>
                  </tr>
                  {featuresArray.map((item, index) => (
                    <tr key={index}><td>{item[1]}</td><td>{item[0]}</td><td>{item[2]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => setShowModal(false)}> close</button>
          </div>
        </div>
      ) : null}
      </>
  );
}

export default Modal;