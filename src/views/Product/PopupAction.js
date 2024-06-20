import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function PopupAction({
  titleAction,
  showPopup,
  handleClosePopup,
  product,
  setProducts,
  setRefetch,
  refetch,
}) {
  const [editingProduct, setEditingProduct] = useState(product);
  const [checkPreview, setCheckPreview] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  useEffect(() => {
    setEditingProduct(product);
    setCurrentImageUrl(product?.image || "");
  }, [product]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editingProduct.name);
      formData.append("due_date", editingProduct.due_date);
      formData.append("price", editingProduct.price);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (titleAction === "Edit") {
        await axios.put(
          `http://127.0.0.1:5000/products/${editingProduct.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        const response = await axios.post(
          "http://127.0.0.1:5000/products",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const newProduct = response.data;
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      }
      setRefetch((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
    handleClosePopup();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setEditingProduct({ ...editingProduct, image: URL.createObjectURL(file) });
    setCheckPreview(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleButtonClick = () => {
    document.getElementById("outlined-image-file").click();
  };

  return (
    <div style={{ width: "80vw", marginTop: "80px" }}>
      {showPopup && (
        <div className="popup">
          <div className="popup-content" style={{ marginTop: "100px" }}>
            <Typography variant="h3" gutterBottom>
              {titleAction}
            </Typography>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <div style={{ flex: 1 }}>
                <TextField
                  id="outlined-name"
                  label="Name"
                  name="name"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={editingProduct?.name || ""}
                  onChange={handleChange}
                  style={{ width: "80%" }}
                />
                <br />
                <br />
                <TextField
                  id="outlined-due-date"
                  label="Due Date"
                  name="due_date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    editingProduct?.due_date
                      ? format(new Date(editingProduct.due_date), "yyyy-MM-dd")
                      : ""
                  }
                  onChange={handleChange}
                  style={{ width: "80%" }}
                />
                <br />
                <br />
                <TextField
                  id="outlined-price"
                  label="Price"
                  name="price"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={editingProduct?.price || ""}
                  onChange={handleChange}
                  style={{ width: "80%" }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {checkPreview && (
                  <img
                    src={editingProduct.image}
                    alt="Preview"
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                  />
                )}
                {!checkPreview && (
                  <img
                    src={`/${currentImageUrl}`}
                    alt="Preview"
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                  />
                )}
              </div>
            </div>
            <br />
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <input
                  id="outlined-image-file"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <Button variant="outlined" onClick={handleButtonClick}>
                  Select Image
                </Button>
              </div>
            </div>
            <br />
            <br />
            <Button
              variant="contained"
              onClick={handleSave}
              style={{ marginRight: "10%" }}
            >
              Save
            </Button>
            <Button variant="contained" onClick={handleClosePopup}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupAction;
