import React from 'react';
import '../styles/Filters.css'
import Category from '../components/Category';
const Filters = ({ categories, activeFilter, setActiveFilter }) => {
   return (
      <div className='filterContainer d-flex flex-nowrap'>
         {categories.map((category) => {
            return (
               <Category key={category.id} category={category} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            )
         })}
      </div>
   );
}

export default Filters;