import React from 'react';
import { useState } from 'react';
const Category = ({ category }) => {
   const [select, setSelect] = useState(false)

   const handleSelect = () => {
      select ? setSelect(false) : setSelect(true)
   }
   return (
      <div onClick={handleSelect} className="ml-2 hover" key={category.id} >
         <span className={select ? "badge badge-primary mr-2 mb-1" : "badge badge-secondary mr-2 mb-1"}>{category.name}</span>
      </div>
   );
}

export default Category;