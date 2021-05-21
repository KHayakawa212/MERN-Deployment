import React, { useEffect, useState } from "react";

import { Link, navigate } from "@reach/router";
import axios from "axios";

const EditPet = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skillOne, setSkillOne] = useState("");
  const [skillTwo, setSkillTwo] = useState("");
  const [skillThree, setSkillThree] = useState("");
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets/" + props.id)
      .then((res) => {
        setName(res.data.name);
        setType(res.data.type);
        setDescription(res.data.description);
        setSkillOne(res.data.skillOne);
        setSkillTwo(res.data.skillTwo);
        setSkillThree(res.data.skillThree);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  const handleEditPetSubmit = (event) => {
    event.preventDefault();

    const editedPet = {
      name: name,
      type,
      description,
      skillOne,
      skillTwo,
      skillThree,
    };

    axios
      .put("http://localhost:8000/api/pets/" + props.id, editedPet)
      .then((res) => {
        navigate("/pets");
      })
      .catch((err) => {
        setErrors(err.response?.data?.errors);
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
          <h3>Edit {name}</h3>
        </div>
      </nav>

      <form
        onSubmit={(event) => {
          handleEditPetSubmit(event);
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
            value={name}
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
            value={type}
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
            value={description}
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
            value={skillOne}
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
            value={skillTwo}
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
            value={skillThree}
          />
        </div>

        <button className="btn btn-sm btn-outline-success">Edit Pet</button>
      </form>
    </div>
  );
};

export default EditPet;
