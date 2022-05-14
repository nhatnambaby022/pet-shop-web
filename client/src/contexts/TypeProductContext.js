import axios from "axios";
import { useReducer, useEffect } from "react";
import { TypeProductReducer } from "../producers/TypeProductReducer";
import {
  apiUrl,
  TYPE_PRODUCT_LOADED_FAIL,
  TYPE_PRODUCT_LOADED_SUCCESS,
} from "./constants";
import { TypeProductContext } from "./contexts";
const TypeProductContextProvider = ({ children }) => {
  //useProducer
  const [typeProductState, dispatch] = useReducer(TypeProductReducer, {
    typeProductLoading: true,
    typeProducts: [],
  });

  //get all item type
  const getTypeProduct = async () => {
    try {
      const response = await axios.get(`${apiUrl}/types/`);
      if (response.data.success) {
        const types = response.data.itemtypes;
        dispatch({ type: TYPE_PRODUCT_LOADED_SUCCESS, payload: types });
      } else {
        dispatch({ type: TYPE_PRODUCT_LOADED_FAIL, payload: [] });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  //load item type once
  useEffect(() => {
    async function fetchData() {
      try {
        getTypeProduct();
      } catch (error) {
        return error;
      }
    }
    fetchData();
  }, []);

  //return item type context data
  const typeProductContextData = { typeProductState, getTypeProduct };
  return (
    <TypeProductContext.Provider value={typeProductContextData}>
      {children}
    </TypeProductContext.Provider>
  );
};
export default TypeProductContextProvider;
