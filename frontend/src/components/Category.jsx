import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
const Category = ({ category, activeFilter, setActiveFilter }) => {
   const [select, setSelect] = useState(false)

   const handleSelect = () => {
      if(activeFilter.length===1){
         setActiveFilter([])
      }
      if(activeFilter.indexOf(category)===-1){
         setActiveFilter([category])
      }
      
   }
   
   useEffect(()=>{
      if(activeFilter.indexOf(category)!==-1){
         setSelect(true)
      }else{
         setSelect(false)
      }
   }, [activeFilter, category])
   return (
      <div onClick={handleSelect} className="ml-2 hover" key={category.id} >
         <span className={select ? "badge badge-primary mr-2 mb-1" : "badge badge-secondary mr-2 mb-1"}>{category.name}</span>
      </div>
   );
}

export default Category;