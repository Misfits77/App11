import { getDocs, collection, addDoc } from "firestorage";

const seed = () => {
  const smartphone = addDoc(collection("items"), { name: "smartphone" });
  const tablet = addDoc(collection("items"), { name: "tablet" });
  const pc = addDoc(collection("items"), { name: "macbook" });
  const charger = addDoc(collection("items"), { name: "charger" });
  const smartwatch = addDoc(collection("items"), { name: "smartwatch" });
  const socks = addDoc(collection("items"), { name: "socks" });
  const coat = addDoc(collection("items"), { name: "coat" });
  const passport = addDoc(collection("items"), { name: "passport" });
  const toys = addDoc(collection("items"), { name: "toys" });
  const catFood = addDoc(collection("items"), { name: "cat food" });
  const sunscreen = addDoc(collection("items"), { name: "sunscreen" });
  const umbrella = addDoc(collection("items"), { name: "umbrella" });

  addDoc(collection("categories"), {
    name: "Appliances",
    itemIds: [smartphone.id, tablet.id, pc.id, charger.id, smartwatch.id],
  });
  addDoc(collection("categories"), {
    name: "Clothes",
    itemIds: [socks.id, coat.id],
  });
  addDoc(collection("categories"), {
    name: "Documents",
    itemIds: [passport.id],
  });
  addDoc(collection("categories"), { name: "Children", itemIds: [toys.id] });
  addDoc(collection("categories"), {
    name: "Pet",
    itemIds: [catFood.id],
  });
  addDoc(collection("categories"), {
    name: "Toiletries",
    itemIds: [sunscreen.id],
  });
  addDoc(collection("categories"), {
    name: "Miscellaneous",
    itemIds: [umbrella.id],
  });

  // const categories = getDocs(collection("categories"));
  // if (categories.data().length === 0) {
  //   const categoriesRef = collection("categories");
  //   addDoc(categoriesRef, { name: "Appliances" });
  //   addDoc(categoriesRef, { name: "Carry-On" });
  //   addDoc(categoriesRef, { name: "Children" });
  //   addDoc(categoriesRef, { name: "Clothes" });
  //   addDoc(categoriesRef, { name: "Documents" });
  //   addDoc(categoriesRef, { name: "Miscellaneous" });
  //   addDoc(categoriesRef, { name: "Pets" });
  //   addDoc(categoriesRef, { name: "Sports Equipment" });
  //   addDoc(categoriesRef, { name: "Toiletries" });
  // }
  // const items = getDocs(collection("items"));
  // if (items.data().length === 0) {
  //   const itemsRef = collection("items");
  //   addDoc(itemsRef, { name: "Smartphone" });
  //   addDoc(itemsRef, { name: "Charger" });
  //   addDoc(itemsRef, { name: "Socks" });
  //   addDoc(itemsRef, { name: "Coat" });
  //   addDoc(itemsRef, { name: "Passport" });
  //   addDoc(itemsRef, { name: "Toys" });
  //   addDoc(itemsRef, { name: "Cat Food" });
  //   addDoc(itemsRef, { name: "Sunscreen" });
  //   addDoc(itemsRef, { name: "Umbrella" });
  // }
};

export default seed;
