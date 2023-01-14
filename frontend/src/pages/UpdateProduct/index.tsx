import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "util/local/index";
import { Product, Response } from "types";
import { Form, InputRow, InputSubmit } from "components/Form";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "./index.scss";

const UpdateProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();

  const [image, setImage] = useState<any>(null);
  const [imageURL, setImageURL] = useState<Blob | MediaSource | string | null>(null);
  const [fileFormatStatus, setFileFormatStatus] = useState<boolean>(false);
  // const [imageMessage, setImageMessage] = useState("");

  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: null,
  });

  const user = getUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !user.isAdmin) {
      return navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setResponse((prevState) => ({ ...prevState, loading: true, message: null }));
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/products/details/${productId}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json.results);
        setImage(json.results.image);
        setResponse({
          success: true,
          loading: false,
          message: "",
        });
      })
      .catch((error) => {
        setResponse({
          success: false,
          loading: false,
          message: "An unknown error has occured",
        });
        console.log(error);
      });
  }, [productId]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      image: "",
      price: "",
      weight: "",
    },
  });

  useEffect(() => {
    reset({
      name: product && product.name ? product.name : "",
      description: product && product.description ? product.description : "",
      price: product && product.price ? (product.price as string) : "",
      weight: product && product.weight ? product.weight : "",
    });
  }, [product, reset]);

  // const token = user && user.access_token;

  useEffect(() => {
    try {
      const extension = image && image.name ? image?.name.split(".")[1] : "";
      console.log(extension);
      if (extension === "") {
        return;
      }
      if (extension !== "jpg" && extension !== "png" && extension !== "jpeg") {
        // console.log("File is in the wrong format");
        // setImageMessage("File is in the wrong format");
        setResponse({
          success: false,
          loading: false,
          message: "File is in the wrong format",
        });

        setFileFormatStatus(false);
        return;
      }
      setResponse({
        success: false,
        loading: false,
        message: "",
      });
      setFileFormatStatus(true);
      setImageURL(URL.createObjectURL(image));
    } catch (error) {
      setResponse({
        success: false,
        loading: false,
        message: "An unknown error has occured",
      });
      console.log(error);
    }
  }, [image, product]);

  const updateImage = () => {
    const formData = new FormData();
    formData.append("productId", (product && product._id) as string);
    formData.append("productImage", image);
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/admin/products/update-image`, {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user && user.access_token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        setResponse({
          success: true,
          loading: false,
          message: "File uploaded successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        setResponse({
          success: true,
          loading: false,
          message: "File failed to upload",
        });
      });
  };

  const onSubmit = (data: FieldValues) => {
    const editData = {
      ...data,
      productId: productId,
      type: product?.type,
    };
    axios
      .put(`${process.env.REACT_APP_BASE_BACKEND}/admin/products/edit`, editData, {
        headers: {
          Authorization: `Bearer ${user && user.access_token}`,
        },
      })
      .then((response) => {
        setResponse({
          ...response,
          success: true,
          loading: false,
          message: "Successfully updated data",
        });
        console.log(response);
      })
      .catch((error) => {
        setResponse({
          ...response,
          success: false,
          loading: false,
          message: "An unknown error has occured",
        });
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Navbar />
      <div>
        <Form title="Update product" onSubmission={onSubmit} handleSubmit={handleSubmit}>
          <div>
            <div>
              <img
                className="imageproduct"
                src={
                  (imageURL as string)
                    ? (imageURL as string)
                    : product && product.image
                    ? `${process.env.REACT_APP_BASE_BACKEND}${product.image.replace(/\\/g, "/")}`
                    : "https://www.tazzadesign.com/wp-content/uploads/sites/65/2013/11/dummy-image-square-300x300.jpg"
                }
                alt="Not found"
              />
            </div>
            <input
              className="updateproduct__formbody__fileinput"
              type="file"
              onChange={(e) => {
                if (e && e.target && e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              alt="Not found"
            />
          </div>
          <label>{errors.weight ? errors.weight.message : null}</label>
          {fileFormatStatus ? (
            <button className="imageview" onClick={() => updateImage()}>
              <img src="/images/upload-icon.png" alt="Not found" />
            </button>
          ) : null}
          {/* </form> */}
          <InputRow
            label="Name"
            name="name"
            errors={errors}
            register={register}
            required={true}
            pattern={/^[A-Z a-z0-9±()]+$/i}
          />
          <InputRow
            label="Description"
            name="description"
            errors={errors}
            register={register}
            required={true}
            pattern={/^[A-Z a-z0-9±(),.]+$/i}
          />
          <InputRow
            label="Price"
            name="price"
            errors={errors}
            register={register}
            required={true}
            pattern={/^[0-9]+$/i}
            type="number"
          />
          <InputRow
            label="Weight"
            name="weight"
            errors={errors}
            register={register}
            required={true}
            pattern={/^[A-Z a-z0-9]+$/i}
          />
          <InputSubmit
            text="Submit"
            success={response.success}
            loading={response.loading}
            message={response.message}
          />
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProduct;
