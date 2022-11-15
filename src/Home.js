import { Link } from "react-router-dom";
import { collection, getDocs } from "firestorage";

function Home() {
  const travelListCol = collection("travelListCol");
  const travelLists = getDocs(travelListCol);

  return (
    <>
      <main>
        <h2>Travel List</h2>
        {travelLists.data().map((travelList) => {
          return (
            <div>
              <Link to={`/seeList/${travelList.id}`}>
                <h1>{travelList.title}</h1>
              </Link>
              <span>{travelList.date}</span>
              <button>Edit</button>
              <button>Duplicate</button>
              <button>Delete</button>
              <hr />
            </div>
          );
        })}
      </main>
      <nav>
        <Link to="/select/categories">
          <button>New List</button>
        </Link>
      </nav>
    </>
  );
}

export default Home;
