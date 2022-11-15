import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import CategoriesPage from "./CategoriesPage";
import ItemsPage from "./ItemsPage";

function ListPage() {
  return (
    <>
      <main>
        <h2></h2>
      </main>
      <nav>
        <Link to="/">
          <button>Back</button>
        </Link>
      </nav>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="seeList/:id" element={<ListPage />} />
        <Route path="select/categories" element={<CategoriesPage />} />
        <Route path="travelList/:id/create" element={<ItemsPage />} />
      </Routes>
    </div>
  );
}

export default App;
