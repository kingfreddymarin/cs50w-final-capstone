import React from 'react';
import Following from '../components/Following';

const CategoryFollow = ({ categories, currentUser }) => {
    return (
        <div className="card" style={{ width: "auto" }}>
            <div className="card-body">
                <p className='ml-1 mb-0'>All Categories</p>
                {categories.map((category) => {
                    return (
                        <Following key={category.name} currentUser={currentUser} ctg_following={currentUser.profile_data.ctg_following} categories={categories} category={category} />
                    )
                })}
            </div>
        </div>
    );
}

export default CategoryFollow;