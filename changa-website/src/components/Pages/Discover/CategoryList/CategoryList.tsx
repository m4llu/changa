import React from 'react';

const CategoryList: React.FC = () => {
  // Example categories
  const categories = ['Rock', 'Pop', 'Hip-Hop', 'Jazz', 'Classical'];

  return (
    <div className="category-list">
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
