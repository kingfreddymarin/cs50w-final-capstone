import React from 'react';
import Following from '../components/Following';

const CategoryFollow = ({ categories, currentUser, setLength, length }) => {
    return (
        <div className="card" style={{ width: "75vw", maxWidth: "700px" }}>
            <div className="card-body">
                <p className='ml-1 mb-0'>Available categories:</p>
                {categories.map((category) => {
                    return (
                        <Following key={category.name} setLength={setLength} length={length} currentUser={currentUser} ctg_following={currentUser.profile_data.ctg_following} categories={categories} category={category} />
                    )
                })}
            </div>
        </div>
    );
}

export default CategoryFollow;