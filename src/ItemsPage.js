import { Link, useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firestorage";
import { useEffect, useState } from "react";

function ItemsSelect({ items, onClick }) {
  return (
    <>
      <ul>
        {items.map((item) => {
          return (
            <li
              onClick={(e) => {
                onClick(item);
              }}
            >
              {item.selected ? (
                <strong>{item.name}</strong>
              ) : (
                <span>{item.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [customItem, setCustomItem] = useState("");
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const travelList = getDoc(doc("travelListCol", id));
    const q = query(
      collection("travelListCol"),
      where("id", "in", travelList.data().categories)
    );
    console.log(travelList.data().categories);
    const categories = getDocs(q);
    console.log(categories.data());
    const initialItems = getDocs(collection("items"))
      .data()
      .map((item) => {
        return { id: item.id, name: item.name, selected: false };
      });
    setItems(initialItems);
  }, []);

  const toggleItem = (item) => {
    const itemsCopy = items.map((i) => {
      if (i.id === item.id) {
        const copy = { ...i };
        copy.selected = !copy.selected;
        return copy;
      } else {
        return i;
      }
    });
    setItems(itemsCopy);
  };

  const addCustomItem = () => {
    const ref = addDoc(collection("items"), { name: customItem });
    const newItem = getDoc(ref).data();
    setCustomItem("");
    setItems([
      ...items,
      { id: newItem.id, name: newItem.name, selected: true },
    ]);
  };

  return (
    <>
      <main>
        <h1>Choose some items for your categories</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addCustomItem();
          }}
        >
          <label>
            Add your custom item
            <input
              required
              type="text"
              value={customItem}
              onChange={(e) => {
                setCustomItem(e.target.value);
              }}
            ></input>
          </label>
          <button>Add</button>
        </form>
        <ItemsSelect items={items} onClick={toggleItem} />
        <nav>
          <Link to="/select/categories">
            <button>Back</button>
          </Link>
        </nav>
      </main>
    </>
  );
}

export default ItemsPage;
