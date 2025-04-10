import React, { useState, useEffect, CSSProperties } from "react";
import Itemcard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import axios from "axios";
import { api } from "../config";
import HashLoader from "react-spinners/HashLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/Find.css"; 


function Find() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    axios
      .get(`${api}/item`)
      .then((res) => {
        setItem(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const override: CSSProperties = {
    display: "block",
    borderColor: "#3f3f97",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  };

  return (
    <main id="findpage">
      <Navbar />
      <section className="find-section">
      <h1 className="lfh1" style={{ color: "#3c0d8d" }}>
  🧭 Lost & Found Items
</h1>


        <div className="item-container">
          <HashLoader
            color="#3f3f97"
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />

          {!loading &&
            item.reverse().map((findItem, index) => (
              <div data-aos="fade-up" key={index}>
                <Itemcard
                  id={findItem._id}
                  title={findItem.title}
                  description={findItem.description}
                  image={findItem.image}
                />
              </div>
            ))}

          {/* Spacers for responsive layout */}
          <div className="extraItem"></div>
          <div className="extraItem"></div>
          <div className="extraItem"></div>
        </div>
      </section>
    </main>
  );
}

export default Find;
