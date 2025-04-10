import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { api } from "../config";
import "../styles/Post.css"; 

export default function Post() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [btn, setBtn] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const submitData = async (e) => {
    e.preventDefault();
    setBtn(false);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("phoneno", phone);
    formData.append("email", email);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("file", file);

    await axios
      .post(`${api}/item`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        enqueueSnackbar("Item Posted Successfully", { variant: "success" });
        navigate("/find");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error", { variant: "error" });
        setBtn(true);
      });
  };

  return (
    <main id="postItem">
      <Navbar />
      <section className="post-section">
        <div className="post-header">
          <h1>📦 Post a Found Item</h1>
          <p>Help others reclaim what they’ve lost — fill in the details below.</p>
        </div>

        <form className="post-form" onSubmit={submitData} encType="multipart/form-data">
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} required />
          </div>

          <div className="form-group file">
            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
          </div>

          <div className="form-group submit">
            <button type="submit" disabled={!btn} className="submitbtn">
              {btn ? "Post Item" : "Posting..."}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
