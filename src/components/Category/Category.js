import React, { useState, useEffect } from "react";
import TextContent from '../TextContent/TextContent';
import './Category.css';
import Loader from '../Shared/Loader';
import { fetchCategories } from '../../services/apiServices';

function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchCategories('user123');
        setCategories(data.categories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dropdown-container">
      <h2 className="dropdown-title">Select an option from the dropdown</h2>
      <select value={selectedCategory} onChange={handleChange} className="dropdown-select">
        <option value="">-- Please Choose an Option --</option>
        {categories.map((category, index) => (
          <option key={index} value={category.category}>
            {category.category}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <div className="selection-display">
          <h3 className="selection-title">You selected: {selectedCategory}</h3>
          <TextContent selectedCategory={selectedCategory} />
        </div>
      )}
    </div>
  );
}

export default Category;
