import React from "react";

const Item = () => {
  return (
    <div className='info-item'>
      <div className='info-layout'>
        <img src='' className='info-img' />
      </div>
      <div className='info'>
        <p>Thông tin sản phẩm</p>
        <div className='info-name'></div>
        <div className='info-price'></div>
        <div className='info-sale'></div>
      </div>
    </div>
  );
};

export default Item;
