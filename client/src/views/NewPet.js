import React, { useState } from "react";

import { Link, navigate } from "@reach/router";
import axios from "axios";

const NewPet = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skillOne, setSkillOne] = useState("");
  const [skillTwo, setSkillTwo] = useState("");
  const [skillThree, setSkillThree] = useState("");
  const [errors, setErrors] = useState(null);

  const handleNewPetSubmit = (event) => {
    event.preventDefault();

    const newPet = {
      name: name,
      type,
      description,
      skillOne,
      skillTwo,
      skillThree,
    };

    axios
      .post("http://localhost:8000/api/pets", newPet)
      .then((res) => {
        navigate("/pets");
      })
      .catch((err) => {
        setErrors(err.response?.data?.errors);
        console.log(err.response);
      });
  };

  return (
    <div className="w-50 p-4 rounded mx-auto shadow">
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top mb-4 d-flex flex-column">
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
          <h3>Know a pet needing a home?</h3>
        </div>
      </nav>

      <form
        onSubmit={(event) => {
          handleNewPetSubmit(event);
        }}
      >
        <div className="form-group">
          <label className="h6">Pet Name:</label>
          {errors?.name && (
            <span className="text-danger"> - {errors?.name?.message}</span>
          )}
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="h6">Pet Type: </label>
          {errors?.type && (
            <span className="text-danger"> - {errors?.type?.message}</span>
          )}
          <input
            onChange={(event) => {
              setType(event.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="h6">Pet Description: </label>
          {errors?.description && (
            <span className="text-danger">
              {" "}
              - {errors?.description?.message}
            </span>
          )}
          <input
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <h5>Skills (optional): </h5>

        <div className="form-group">
          <label className="h6">Skill 1: </label>
          {errors?.skillOne && (
            <span className="text-danger"> - {errors?.skillOne?.message}</span>
          )}
          <input
            onChange={(event) => {
              setSkillOne(event.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="h6">Skill 2: </label>
          {errors?.skillTwo && (
            <span className="text-danger"> - {errors?.skillTwo?.message}</span>
          )}
          <input
            onChange={(event) => {
              setSkillTwo(event.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="h6">Skill 3: </label>
          {errors?.skillThree && (
            <span className="text-danger">
              {" "}
              - {errors?.skillThree?.message}
            </span>
          )}
          <input
            onChange={(event) => {
              setSkillThree(event.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>

        <button className="btn btn-sm btn-outline-success">Add Pet</button>
      </form>
    </div>
  );
};

export default NewPet;
