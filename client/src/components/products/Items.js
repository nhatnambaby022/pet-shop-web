import { Link } from "react-router-dom";
import { CartContext, ProductContext } from "../../contexts/contexts";
import { useContext, useState } from "react";
import { TypeProductContext } from "../../contexts/contexts";
import { useToasts } from "react-toast-notifications";

const Items = () => {
  //useContext
  const { productState, getProductByID, getAllproduct, sortby } =
    useContext(ProductContext);
  var { productLoading, products } = productState;
  const { typeProductState } = useContext(TypeProductContext);
  const { typeProductLoading, typeProducts } = typeProductState;

  const { cartState, addItemToCart } = useContext(CartContext);

  //message when product is empty
  let productsEmpty = <></>;
  if (products.length == 0) {
    productsEmpty = <div>Không tìm thấy sản phẩm nào!</div>;
  } else {
    productsEmpty = <></>;
  }

  //change products list
  const changeProducts = (e) => {
    if (e.target.value == "all") {
      getAllproduct();
    } else {
      getProductByID(e.target.value);
    }
  };
  //sort productlist
  const selectSortProducts = (e) => {
    const key = e.target.value;
    if (key == "A-Z") {
      sortby("itemName", 1);
    } else if (key == "Z-A") {
      sortby("itemName", -1);
    } else if (key == "price-up") {
      sortby("priceExport", 1);
    } else if (key == "price-down") {
      sortby("priceExport", -1);
    }
  };
  return (
    <div className='container'>
      <div className='container-menu'>
        <p className='header-menu'>Loại hàng</p>
        <select
          className='select-container-menu'
          onChange={(e) => changeProducts(e)}>
          <option value='all'>Tất cả</option>

          {typeProducts.map((type) => (
            <option value={type._id} key={type._id}>
              {type.nameType}
            </option>
          ))}
        </select>
        <p className='header-menu'>Sắp xếp</p>
        <select
          className='select-container-menu'
          onChange={(e) => selectSortProducts(e)}>
          <option value='A-Z'>A-Z</option>
          <option value='Z-A'>Z-A</option>
          <option value='price-up'>Giá tăng dần</option>
          <option value='price-down'>Giá giảm dần</option>
        </select>
      </div>
      <div className='container-items'>
        {products.map((product, index) => {
          let button = (
            <button
              id={product._id}
              className='addCart'
              value={product._id}
              onClick={async (e) => {
                await addItemToCart(e.target.value);
              }}>
              Thêm vào giỏ
            </button>
          );

          const checkItemInCart = (itemId) => {
            var i;
            const items = cartState.items;
            for (i = 0; i < items.length; i++) {
              if (items[i].item == itemId) {
                return { exist: true, index: i };
              }
            }
            return { exist: false };
          };
          const itemInCart = checkItemInCart(product._id);
          //if maximum of quantily disabled button
          if (
            (itemInCart.exist &&
              cartState.items[itemInCart.index].quantily == product.quantily) ||
            product.quantily == 0
          )
            button = (
              <button
                disabled
                id={product._id}
                className='addCart'
                value={product._id}>
                Maximum
              </button>
            );
          return (
            <div className='item' key={index}>
              <Link to={`/product/${product._id}`} className='item-link'>
                <div className='item-image'>
                  <img className='it-image' src={`${product.pathImage}`} />
                </div>

                <div className='item-name'>{product.itemName}</div>
              </Link>

              <div className='item-price'>{product.priceExport}</div>
              {button}
              <div className='item-quantily'>{`Số lượng: ${product.quantily}`}</div>
            </div>
          );
        })}
        {productsEmpty}
      </div>
    </div>
  );
};

export default Items;
