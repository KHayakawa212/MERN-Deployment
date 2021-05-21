import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";

import axios from "axios";

const Pet = (props) => {
  const [thisPet, setThisPet] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets/" + props.id)
      .then((res) => {
        setThisPet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  const handleDelete = () => {
    axios
      .delete("http://localhost:8000/api/pets/" + thisPet._id)
      .then((res) => {
        navigate("/pets");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (thisPet === null) {
    return "Loading...";
  }

  return (
    <div className="w-50 p-4 rounded mx-auto shadow">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 d-flex flex-column">
        <div className="d-flex justify-content-between">
          <div>
            <h1>Pet Shelter</h1>
          </div>
          <div>
            <Link className="mar-left" to="/pets">
              back to home
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <h3>Details about: {thisPet.name}</h3>
          <button
            onClick={(event) => {
              handleDelete();
            }}
            className="btn btn-sm btn-outline-danger mar-left"
          >
            Adopt {thisPet.name}
          </button>
        </div>
      </nav>
      <div className="w-100 mx-auto shadow mb-4 rounded border p-4">
        <h4>Pet Type: {thisPet.type}</h4>
        <h4>Description: {thisPet.description}</h4>
        <h4>Skills:</h4>
        <ul className="list-group mb-4">
          <li className="list-group-item">{thisPet.skillOne}</li>
          <li className="list-group-item">{thisPet.skillTwo}</li>
          <li className="list-group-item">{thisPet.skillThree}</li>
        </ul>
      </div>
    </div>
  );
};

export default Pet;
