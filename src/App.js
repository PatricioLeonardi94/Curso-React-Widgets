import React from "react";
import Accordion from "./components/Accordion";

const items = [
  {
    title: "Whats is React?",
    content: "React is a front end javascript framework",
  },
  {
    title: "Second Accordion question?",
    content: "something like ansew style",
  },
  {
    title: "How do u use react?",
    content: "Creating components",
  },
];

export default () => {
  return (
    <div>
      <Accordion items={items} />
    </div>
  );
};
