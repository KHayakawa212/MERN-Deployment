import React, { useEffect, useState } from "react";

import { Link } from "@reach/router";
import axios from "axios";

const Pets = (props) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then((res) => {
        // setPets(res.data);
        let petsArray = res.data.sort(function (a, b) {
          var textA = a.type.toUpperCase();
          var textB = b.type.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        setPets(petsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pets]);

  return (
    <div className="w-50 mx-auto text-center">
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top mb-4 d-flex flex-column">
        <div className="d-flex justify-content-between">
          <div>
            <h1>Pet Shelter</h1>
          </div>
          <div>
            <Link className="mar-left" to="/pets/new">
              Add a pet to the shelter
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <h3>These pets are looking for a good home</h3>
        </div>
      </nav>
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => {
            return (
              <tr>
                <td>
                  <span>{pet.name}</span>
                  {/* <Link to={`/pets/${pet._id}/edit`}>{pet.name}</Link> */}
                </td>
                <td>
                  <span>{pet.type}</span>
                </td>
                <td>
                  <Link to={`/pets/${pet._id}`}>details</Link>
                  &nbsp; &nbsp; | &nbsp; &nbsp;
                  <Link to={`/pets/${pet._id}/edit`}>edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Pets;
