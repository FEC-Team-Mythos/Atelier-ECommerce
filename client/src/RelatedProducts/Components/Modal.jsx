import React, { useRef, useState, useEffect } from 'react';

// this component is for the modal popup
function Modal({ showModal, setShowModal, comparedProduct, currentProduct }) {
  // find like features and create array aligned by characteristic for display
  const features = {};
  if (currentProduct) {
    for (let i = 0; i < currentProduct.features.length; i++) {
      features[currentProduct.features[i].feature] = [currentProduct.features[i].value, null];
    }
    if (comparedProduct) {
      for (let j = 0; j < comparedProduct.features.length; j++) {
        if (features[comparedProduct.features[j].feature]) {
          features[comparedProduct.features[j].feature][1] = (comparedProduct.features[j].value);
        } else {
          features[comparedProduct.features[j].feature] = [null, comparedProduct.features[j].value];
        }
      }
    }
    var featuresArray = [];
    for (const key in features) {
      featuresArray.push([key, features[key][0], features[key][1]]);
    }
  }

  const modalRef = useRef(null);

  return (
    <div className="related-modal-container">
      {showModal ? (
        <div
          className="related-product-modal"
          onClick={(e) => {
            if (modalRef.current.contains(e.target)) { return; }
            setShowModal(false);
          }}
        >
          <div className="related-modal-sq" style={{ backgroundColor: 'white' }} ref={modalRef}>
            <h1  >Compare Products</h1>
            <div className="table">
              <table id="related-table">
                <tbody>
                  <tr>
                    <th id="related-th">{currentProduct.name}</th>
                    <th id="related-th" />
                    <th id="related-th">{comparedProduct.name}</th>
                  </tr>
                  {featuresArray.map((item, index) => (
                    <tr key={index}>
                      <td id="related-td">{item[1]}</td>
                      <td id="related-td">{item[0]}</td>
                      <td id="related-td">{item[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br/>
            <button onClick={() => setShowModal(false)}> close</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
