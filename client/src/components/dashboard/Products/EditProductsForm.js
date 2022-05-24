import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastProvider, useToasts } from "react-toast-notifications";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";
import { TypeProductContext } from "../../../contexts/contexts";
import { storage } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const EditProductsForm = () => {
  const [button, setButton] = useState(<></>);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState();
  const [progressValue, setProgress] = useState(0);
  //load type product
  const { typeProductState, getTypeProduct } = useContext(TypeProductContext);
  const [isUpload, setIsUpload] = useState(true);
  // review
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result.toString());
      };
      reader.readAsDataURL(image);
      handleUpload();
    }
  }, [image]);

  // upload firebase
  const handleUpload = async () => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setImageUrl(downloadURL);
          setIsUpload(false);
        });
      }
    );
  };

  //LOAD PRODUCT INDFOR
  const [productState, setProductState] = useState({
    isLoading: true,
    product: {
      _id: "undefined",
      itemName: "",
      quantily: "",
      priceImport: "",
      priceExport: "",
      description: "",
      pathImage: "",
      type: "",
    },
  });

  const { addToast } = useToasts();

  let { id } = useParams();
  if (typeProductState.typeProductLoading) {
    return <p>Loading...</p>;
  }
  //get product
  const getProduct = async (id) => {
    const response = await axios.get(`${apiUrl}/items/${id}`);
    if (response.data.success) {
      setProductState({
        isLoading: false,
        product: { ...productState.product, ...response.data.item },
      });
      setImageUrl(response.data.item.pathImage);
      return response.data;
    } else {
      return response.data;
    }
  };

  // get and reder user form
  if (productState.isLoading && id !== "add") {
    getProduct(id);
    return <p>Loading...</p>;
  } else {
    const {
      _id,
      itemName,
      quantily,
      priceImport,
      priceExport,
      description,
      pathImage,
      type,
    } = productState.product;
    let tmp;
    //set form product
    const onChangProduct = (event) => {
      setButton(
        <button style={{ marginBottom: "24px" }} className='update-button'>
          {id === "add" ? "Create" : "Update"}
        </button>
      );
      tmp = productState.product;
      tmp = {
        ...tmp,
        [event.target.name]: event.target.value,
      };
      setProductState({
        ...productState,
        product: tmp,
      });
    };
    //get type
    const types = typeProductState.typeProducts;
    const UpdateProduct = async (event) => {
      event && event.preventDefault();
      if (id === "add") {
        //add product
        try {
          if (image && !isUpload) {
            const response = await axios.post(`${apiUrl}/items`, {
              itemName,
              quantily,
              priceImport,
              priceExport,
              description,
              pathImage: imageUrl,
              type,
            });
            if (response.data.success) {
              addToast("Create Product successfull!", {
                appearance: "success",
              });
            }
          } else {
            addToast("Image Uploading...", { appearance: "warning" });
          }
        } catch (error) {
          if (error.response.data) {
            addToast(error.response.data.message, { appearance: "error" });
          } else {
            return error;
          }
        }
      } else {
        //update product
        try {
          if (image && isUpload) {
            addToast("Image Uploading...", { appearance: "warning" });
          } else {
            const response = await axios.put(`${apiUrl}/items/${id}`, {
              itemName,
              quantily,
              priceImport,
              priceExport,
              description,
              pathImage: imageUrl,
              type,
            });
            if (response.data.success) {
              addToast("Update Product successfull!", {
                appearance: "success",
              });
            }
          }
        } catch (error) {
          if (error.response.data) {
            addToast(error.response.data.message, { appearance: "error" });
          } else {
            return error;
          }
        }
      }
    };

    return (
      <>
        <form className='form-infor' onSubmit={UpdateProduct}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignContent: "center",
              margin: "6px 6px 0px 0px",
            }}>
            <Link to='/dashboard/products'>
              <span className='out-form'>x</span>
            </Link>
          </div>
          <h3>{id === "add" ? "Create Product" : "Edit Product"}</h3>
          <p>{`ID: ${_id}`}</p>
          <div>
            <p>Product Name</p>
            <input
              type='text'
              placeholder='Product Name'
              name='itemName'
              required
              onChange={onChangProduct}
              value={itemName}
            />
          </div>
          <div>
            <p>Quantily</p>
            <input
              type='number'
              placeholder='Quantily'
              name='quantily'
              onChange={onChangProduct}
              value={quantily}
              required
            />
          </div>
          <div>
            <p>Price Import</p>
            <input
              type='number'
              placeholder='Price Import'
              name='priceImport'
              onChange={onChangProduct}
              value={priceImport}
              required
            />
          </div>
          <div>
            <p>Price Export</p>
            <input
              type='number'
              placeholder='Price Export'
              name='priceExport'
              onChange={onChangProduct}
              value={priceExport}
            />
          </div>
          <div>
            <p>Description</p>
            <input
              type='text'
              placeholder='Description'
              name='description'
              onChange={onChangProduct}
              value={description}
            />
          </div>
          <div>
            <p>Type Name</p>
            <select
              className='select-type'
              name='type'
              onChange={onChangProduct}>
              {types.map((type) => {
                return (
                  <>
                    <option
                      value={type._id}
                      selected={
                        type._id == productState.product.type._id
                          ? "selected"
                          : ""
                      }>
                      {type.nameType}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          <br /> {button}
        </form>

        <div style={{ width: "300px", height: "300px", marginLeft: "24px" }}>
          <input
            type='file'
            style={{
              border: "none",
            }}
            accept='image/png, image/jpg, image/jpeg'
            onChange={async (e) => {
              if (!isUpload) {
                const desertRef = ref(storage, `images/${image.name}`);
                deleteObject(desertRef)
                  .then(() => {
                    // File deleted successfully
                  })
                  .catch((error) => {
                    // Uh-oh, an error occurred!
                  });
              }
              let file = e.target.files[0];
              if (file && file.type.substring(0, 5) === "image") {
                setImage(e.target.files[0]);
                setButton(
                  <button
                    style={{ marginBottom: "24px" }}
                    className='update-button'>
                    {id === "add" ? "Create" : "Update"}
                  </button>
                );
              } else {
                setImage(null);
              }
            }}
          />
          <progress
            style={{
              height: "10px",
              width: "300px",
            }}
            value={progressValue}
            max={100}
          />
          <br />
          {imageUrl ? (
            <img
              src={imageUrl}
              style={{ objectFit: "cover", height: "300px", width: "300px" }}
            />
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
};

export default EditProductsForm;
