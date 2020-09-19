import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";
import Translate from './components/Translate'
import Route from './components/Route'
import Header from './components/Header'

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

const options = [
  {
    label: "The color Red",
    value: "red",
  },
  {
    label: "The color Green",
    value: "green",
  },
  {
    label: "A shade of Blue",
    value: "blue",
  },
];


export default () => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className="ui container" style={{ padding: "10px" }}>
     <Header />

     <Route path='/'>
       <Accordion items={items} />
     </Route>
     
     <Route path='/list'>
       <Search />
     </Route>

     <Route path='/dropdown'>
       <Dropdown 
       label='Select a Color'
       options={options}
       selected={selected}
       onSelectedChange={setSelected}
       />
     </Route>

     <Route path='/translate'>
       <Translate />
     </Route>

    </div>
  );
};
