import React, {useState, useEffect} from 'react';

const PurchaseOptions = ({product, productInformation, setProductInformation, productStyles, setMainImage, cartItems, setCartItems, setOutfits, outfits}) => {

  const [selectedSize, setSelectedSize] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedSku, setSelectedSku] = useState('');
  const [favorited, setFavorited] = useState(false);

  useEffect(()=> {
    if (localStorage.getItem('outfits')) {
      let outfitList = JSON.parse(localStorage.getItem('outfits'));
      for (var outfitItem of outfitList) {
        if (outfitItem.productName === product.name && outfitItem.styleName === productInformation.name) {
          setFavorited(true);
          return;
        }
      }
    }
    setFavorited(false);
  }, [outfits, productInformation])

  const getSelectedSize = () => {
    var e = document.getElementById('overview_productSize');
    setSelectedSize(productInformation.skus[e.value]);
    setSelectedSku(e.value);
  }

  const getSelectedQuantity = () => {
    var e = document.getElementById('overview_productQuantity');
    setSelectedQuantity(Number(e.value));
  }

  const addToCart = () => {
    if (cartItems.length) {
      let updatedCart = [...cartItems];
      for (var item of updatedCart) {
        if (item.sku_id === selectedSku && item.size === selectedSize.size) {
          item.quantity += selectedQuantity;
          setCartItems(updatedCart);
          return;
        }
      }
        // updatedCart.push({product_id: product.id, style_id: productInformation.style_id, sku_id: selectedSku, size: selectedSize.size, quantity: selectedQuantity});
        updatedCart.push({productName: product.name, productPhoto: productInformation.photos[0].thumbnail_url, styleName: productInformation.name,
          productCost: (productInformation.sale_price || productInformation.original_price || product.default_price), sku_id: selectedSku,
          size: selectedSize.size, quantity: selectedQuantity});
        setCartItems(updatedCart);
    } else {
      // let item = [{product_id: product.id, style_id: productInformation.style_id, sku_id: selectedSku, size: selectedSize.size, quantity: selectedQuantity}]
      let item = [{productName: product.name, productPhoto: productInformation.photos[0].thumbnail_url, styleName: productInformation.name,
        productCost: (productInformation.sale_price || productInformation.original_price || product.default_price), sku_id: selectedSku,
        size: selectedSize.size, quantity: selectedQuantity}];
      setCartItems(item);
    }
  }


  const outfitButtonHandler = () => {

    let updatedOutfits = [...outfits];

    if (favorited) {
      for (let i = 0; i < outfits.length; i++) {
        if (updatedOutfits[i].productName === product.name && updatedOutfits[i].styleName === productInformation.name) {
          updatedOutfits.splice(i, 1);
          break;
        }
      }
    } else {
      if (updatedOutfits.length) {
        updatedOutfits.push({productName: product.name, productPhoto: productInformation.photos[0].thumbnail_url, styleName: productInformation.name,
          productCost: (productInformation.sale_price || productInformation.original_price || product.default_price), productCategory: product.category})
      } else {
        updatedOutfits = [{productName: product.name, productPhoto: productInformation.photos[0].thumbnail_url, styleName: productInformation.name,
          productCost: (productInformation.sale_price || productInformation.original_price || product.default_price), productCategory: product.category}];
      }
    }
    if (!updatedOutfits.length) {
      localStorage.removeItem('outfits');
    } else {
      localStorage.setItem('outfits', JSON.stringify(updatedOutfits));
    }
    setOutfits(updatedOutfits);
  }


  return (
    <div>
      <ul>
        {productStyles.map(product => (
          <img src={product.photos[0].thumbnail_url} key={product.photos[0].thumbnail_url} onClick={()=>{
            setProductInformation(product);
            setMainImage(product.photos[0].url)
          }}/>
        ))}
      </ul>

      <select id="overview_productSize" onChange={getSelectedSize}>
        <option value='0'>SELECT SIZE</option>
        {Object.keys(productInformation.skus).map((style, index) => (
          <option key={index} value={style}>{productInformation.skus[style].size}</option>
        ))}
      </select>

      <select id="overview_productQuantity" onChange={getSelectedQuantity}>
        <option value='0'>SELECT QUANTITY</option>
        {(Object.keys(selectedSize).length && selectedSize.quantity < 5) ?
        Array.from({length: selectedSize.quantity}, (_, index) => index + 1).map(quantity => (
          <option value={quantity} key={quantity}>{quantity}</option>
        ))
        : [1,2,3,4,5].map(quantity => (
          <option value={quantity} key={quantity}>{quantity}</option>
        ))}
      </select>
      <button onClick={addToCart}>Add to Bag</button>
      <button onClick={outfitButtonHandler}>Favorite</button>
    </div>
  )
}

export default PurchaseOptions;