import axios from "axios";
import { useReducer, useEffect } from "react";
import { ProductReducer } from "../producers/ProductReducer";
import {
  apiUrl,
  PRODUCT_LOADED_FAIL,
  PRODUCT_LOADED_SUCCESS,
} from "./constants";

import { ProductContext } from "./contexts";
const ProductContextProvider = ({ children }) => {
  //userReducer
  const [productState, dispatch] = useReducer(ProductReducer, {
    productLoading: true,
    products: [],
  });

  //find product by name
  const findProductByName = async (stringName) => {
    try {
      const response = await axios.post(`${apiUrl}/items/findItems/`, {
        name: stringName,
      });
      const productsFound = response.data.itemsByName;
      if (response.data.success) {
        if (response.data.itemsByName) {
          dispatch({ type: PRODUCT_LOADED_SUCCESS, payload: productsFound });
          return {
            success: true,
            message: "Find item by name successfull",
          };
        } else {
          dispatch({ type: PRODUCT_LOADED_SUCCESS, payload: [] });
          return { success: false, message: "Item not found" };
        }
      } else {
        return response.data;
      }
    } catch (error) {
      return { success: false, message: error };
    }
  };

  // get all products
  const getAllproduct = async () => {
    try {
      const response = await axios.get(`${apiUrl}/items/`);
      if (response.data.success) {
        const products = response.data.allItems;
        dispatch({ type: PRODUCT_LOADED_SUCCESS, payload: products });
      } else {
        dispatch({ type: PRODUCT_LOADED_FAIL, payload: [] });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Sever error" };
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        getAllproduct();
      } catch (error) {
        return error;
      }
    }
    fetchData();
  }, []);

  //get product by ID type
  const getProductByID = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/items/type/${id}`);
      if (response.data.success) {
        const products = response.data.items;
        dispatch({ type: PRODUCT_LOADED_SUCCESS, payload: products });
      } else {
        dispatch({ type: PRODUCT_LOADED_FAIL, payload: [] });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Sever error" };
    }
  };

  //Sort product
  const sortProduct = (key, option) => {
    // option=1 is asc, option=-1 desc
    return function sortValue(a, b) {
      if (a[key] < b[key]) {
        return -1 * option;
      } else if (a[key] > b[key]) {
        return 1 * option;
      } else {
        return 0;
      }
    };
  };
  //Sort
  const sortby = (key, option) => {
    let product = productState.products;
    product.sort(sortProduct(key, option));
    dispatch({ type: PRODUCT_LOADED_SUCCESS, payload: product });
  };

  //return ContextData
  const productContextData = {
    productState,
    getAllproduct,
    getProductByID,
    sortby,
    findProductByName,
  };

  return (
    <ProductContext.Provider value={productContextData}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
