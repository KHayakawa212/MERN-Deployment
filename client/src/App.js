import "./App.css";
import { Link, Redirect, Router } from "@reach/router";

import NotFound from "./views/NotFound";
import Pets from "./views/Pets";
import Pet from "./views/Pet";
import NewPet from "./views/NewPet";
import EditPet from "./views/EditPet";

function App() {
  return (
    <div className="container">
      <Router>
        <Pets path="/pets" />
        <Pet path="/pets/:id" />
        <EditPet path="/pets/:id/edit" />
        <NewPet path="/pets/new" />
        <Redirect from="/" to="/pets" noThrow="true" />
        <NotFound default />
      </Router>
    </div>
  );
}

export default App;
