import { useEffect, useState } from "react";
import "./index.css";
import { FieldValues, useForm } from "react-hook-form";
import { getUser } from "util/local/index";
import { useNavigate } from "react-router-dom";
import { Form, InputRow, InputSubmit, Response } from "components/Form";
// import { useParams } from "react-router-dom";

const AddProduct = () => {
  const [response, setResponse] = useState<Response>({
    success: false,
    loading: false,
    message: null,
  });
  const user = getUser();
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [imageMessage, setImageMessage] = useState("");
  const {
    register,
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
    if (!user.isAdmin) {
      return navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      if (image) {
        setImageURL(URL.createObjectURL(image));
        console.log(URL.createObjectURL(image));
      }
    } catch (error) {
      console.log(error);
    }
  }, [image, imageMessage]);

  const onSubmission = (formData: FieldValues) => {
    const extension = image && image.name ? image?.name.split(".")[1] : "";
    if (extension !== "") {
      if (extension !== "jpg" && extension !== "png" && extension !== "jpeg") {
        console.log("File is in the wrong format");
        setImageMessage("File is in the wrong format");
        return;
      }
    }
    setResponse({ ...response, success: false, loading: true, message: null });
    const bodyData = new FormData();
    bodyData.append("description", formData.description);
    bodyData.append("weight", formData.weight);
    bodyData.append("name", formData.name);
    // bodyData.append("image", (imageURL as string).replace("blob:", ""));
    bodyData.append("type", formData.type ? formData.type : "default");
    bodyData.append("price", formData.price);
    bodyData.append("productImage", image as Blob);
    fetch(`${process.env.REACT_APP_BASE_BACKEND}/admin/products/add`, {
      method: "POST",
      body: bodyData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setResponse({
            ...response,
            success: true,
            loading: false,
            message: "Successfully added product",
          });
        } else {
          setResponse({
            ...response,
            success: false,
            loading: false,
            message: "Unable to add product",
          });
        }
      })
      .catch((error) => {
        setResponse({
          ...response,
          success: false,
          loading: false,
          message: "An unknown error has occured",
        });
      });
  };

  return (
    <div className="Form">
      <Form onSubmission={onSubmission} handleSubmit={handleSubmit}>
        <div className="Form__imageInput">
          <div>
            <img
              style={{ margin: "0 auto", height: "200px" }}
              src={imageURL ? imageURL : "#"}
              alt="No file"
              className="image"
            />
          </div>
          <div>{imageMessage}</div>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files && e.target.files[0]);
            }}
            alt="Not found"
          />
        </div>
        <InputRow
          label="Name"
          name="name"
          required={true}
          pattern={/^[A-Z a-z0-9±()]+$/i}
          register={register}
          errors={errors}
        />
        <InputRow
          label="Description"
          name="description"
          required={true}
          pattern={/^[A-Z a-z0-9±()]+$/i}
          register={register}
          errors={errors}
        />
        <InputRow
          label="Price"
          name="price"
          required={true}
          type={"number"}
          //   pattern={/^[A-Z a-z0-9±()]+$/i}
          register={register}
          errors={errors}
        />
        <InputRow
          label="Weight"
          name="weight"
          required={true}
          pattern={/^[A-Z a-z0-9]+$/i}
          register={register}
          errors={errors}
        />
        <InputSubmit
          text="Add"
          success={response.success}
          loading={response.loading}
          message={response.message}
        />
      </Form>
    </div>
  );
};

export default AddProduct;
