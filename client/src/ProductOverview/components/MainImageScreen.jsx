/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { RxEnterFullScreen } from "react-icons/rx";
import { RxExitFullScreen } from "react-icons/rx";

function MainImageScreen({
  productInformation, mainImage, setMainImage, expand, setExpand,
}) {
  const [imageSelection, setImageSelection] = useState({
    indexSet: 0,
    productInfoList: productInformation.photos.slice(0, 7),
  });
  const [zoomImage, setZoomImage] = useState('');
  const [zoomIn, setZoomIn] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setImageSelection({
      indexSet: 0,
      productInfoList: productInformation.photos.slice(0, 7),
    });
    setSelectedIndex(0);
  }, [productInformation]);

  useEffect(() => {
    setZoomImage(document.getElementById('overview-mainImage-clicked'));
  }, [expand]);

  const mouseMove = (e) => {
    if (zoomIn) {
      const xPosition = e.clientX - (1.45) * e.target.offsetLeft;
      const yPosition = 0.80 * e.clientY;

      zoomImage.style.transformOrigin = `${xPosition}px ${yPosition}px`;
      zoomImage.style.transform = 'scale(2.5)';
    }
  };

  const zoom = () => {
    if (zoomIn) {
      zoomImage.style.transformOrigin = 'center';
      zoomImage.style.transform = 'scale(1)';
      zoomImage.style.cursor = 'zoom-in';
    } else {
      zoomImage.style.cursor = 'zoom-out';
    }
    setZoomIn(!zoomIn);
  };

  const setList = (direction) => {
    const currentSetIndex = imageSelection.indexSet;
    if (direction === 'up') {
      if (productInformation.photos[currentSetIndex - 7]) {
        setImageSelection({
          indexSet: currentSetIndex - 7,
          productInfoList: productInformation.photos.slice(currentSetIndex - 7, 7),
        });
      } else {
        setImageSelection({
          indexSet: 0,
          productInfoList: productInformation.photos.slice(0, 7),
        });
      }
    } else if (direction === 'down') {
      if (productInformation.photos[currentSetIndex + 7]) {
        setImageSelection({
          indexSet: currentSetIndex + 7,
          productInfoList: productInformation.photos.slice(currentSetIndex + 7, currentSetIndex + 14),
        });
      }
    }
  };

  const changeImage = (direction) => {
    const currentPhotoIndex = mainImage.index;
    if (direction === 'left') {
      setSelectedIndex(currentPhotoIndex - 1);
      setMainImage({
        url: productInformation.photos[currentPhotoIndex - 1].url,
        index: currentPhotoIndex - 1,
      });
      if (currentPhotoIndex - 1 < imageSelection.indexSet) {
        setList('up');
      }
    } else if (direction === 'right') {
      setSelectedIndex(currentPhotoIndex + 1);
      setMainImage({
        url: productInformation.photos[currentPhotoIndex + 1].url,
        index: currentPhotoIndex + 1,
      });
      if (currentPhotoIndex + 1 > imageSelection.indexSet + 6) {
        setList('down');
      }
    }
  };

  return (
    <div className={expand ? 'overview-imagesContainer-clicked' : 'overview-imagesContainer'}>
      <ul className="overview-sideImages">
        {productInformation.photos[imageSelection.indexSet - 1]
          ? (
            <button type="submit" id="overview-upButton" onClick={() => { setList('up'); }}>
              <span id="overview-upArrow" />
            </button>
          )
          : null }
        {imageSelection.productInfoList.map((photo, index) => (
          <img
            id={imageSelection.indexSet + index === selectedIndex ? 'overview-sideImage-selected' : 'overview-sideImage'}
            src={photo.thumbnail_url}
            key={photo.url}
            alt="Product View Options"
            data-testid={`image-${index}`}
            onClick={() => {
              setMainImage({ url: photo.url, index: imageSelection.indexSet + index });
              setSelectedIndex(imageSelection.indexSet + index);
            }}
          />
        ))}
        {productInformation.photos[imageSelection.indexSet + 7]
          ? (
            <button type="submit" id="overview-downButton" onClick={() => { setList('down'); }}>
              <span id="overview-downArrow" />
            </button>
          )
          : null }
      </ul>
      <div className="overview-mainImageContainer">
        {productInformation.photos[mainImage.index - 1]
          ? (
            <button type="submit" id="overview-leftButton" onClick={() => { changeImage('left'); }}>
              <span id="overview-leftArrow" />
            </button>
          )
          : null }
        <div className="overview-zoomContainer">
          {expand
            ? (
              <img
                src={mainImage.url}
                alt="Main Product"
                id="overview-mainImage-clicked"
                style={zoomIn ? { cursor: 'zoomIn' } : { cursor: 'zoomOut' }}
                onClick={zoom}
                onMouseMove={mouseMove}
              />
            ) : (
              <img src={mainImage.url} alt="Main Product" id="overview-mainImage" />
            )}
        </div>
        {productInformation.photos[mainImage.index + 1]
          ? (
            <button type="submit" id="overview-rightButton" onClick={() => { changeImage('right'); }}>
              <span id="overview-rightArrow" />
            </button>
          )
          : null }
        <button type="submit" id="overview-expand" onClick={() => { setExpand(!expand); zoom(); setZoomIn(false); }}>
          {expand ? <RxExitFullScreen id="overview-fullScreenButton" /> : <RxEnterFullScreen id="overview-fullScreenButton" />}
        </button>
      </div>
    </div>
  );
}

export default MainImageScreen;
