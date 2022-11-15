import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, getDoc } from "firestorage";
import { useEffect, useState } from "react";

function CategoriesSelect({ categories, onClick }) {
  return (
    <>
      <ul>
        {categories.map((category) => {
          return (
            <li
              onClick={(e) => {
                onClick(category);
              }}
            >
              {category.selected ? (
                <strong>{category.name}</strong>
              ) : (
                <span>{category.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

//Break down into two different components the categories and the the create list form

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const initialCategories = getDocs(collection("categories"))
      .data()
      .map((category) => {
        return { id: category.id, name: category.name, selected: false };
      });
    setCategories(initialCategories);
  }, []);

  const createTravelList = () => {
    const travelListCol = collection("travelListCol");
    const selectedIds = categories
      .filter((category) => category.selected)
      .map((category) => category.id);
    return addDoc(travelListCol, {
      title,
      date,
      place,
      categories: selectedIds,
    });
  };

  const toggleCategory = (category) => {
    const categoriesCopy = categories.map((c) => {
      if (c.id === category.id) {
        const copy = { ...c };
        copy.selected = !copy.selected;
        return copy;
      } else {
        return c;
      }
    });
    setCategories(categoriesCopy);
  };

  const addCustomCategory = () => {
    const ref = addDoc(collection("categories"), { name: customCategory });
    const newCategory = getDoc(ref).data();
    setCustomCategory("");
    setCategories([
      ...categories,
      { id: newCategory.id, name: newCategory.name, selected: true },
    ]);
  };

  return (
    <>
      <main>
        <h2>Select your categories</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const ref = createTravelList();
            navigate(`/travelList/${ref.id}/create`);
          }}
        >
          <label>
            Title
            <input
              required
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </label>
          <label>
            Date
            <input
              required
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
          </label>
          <label>
            Place
            <input
              required
              type="text"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            ></input>
          </label>
          <button>Create</button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCustomCategory();
          }}
        >
          <label>
            Add your own Category
            <input
              required
              type="text"
              value={customCategory}
              onChange={(e) => {
                setCustomCategory(e.target.value);
              }}
            ></input>
          </label>
          <button>Add</button>
        </form>
        <CategoriesSelect categories={categories} onClick={toggleCategory} />
      </main>
      <nav>
        <Link to="/">
          <button>Back</button>
        </Link>
      </nav>
    </>
  );
}

export default CategoriesPage;
