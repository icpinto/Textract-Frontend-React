export const fetchCategories = async (userId) => {
    const response = await fetch(`http://localhost:3001/api/categories/${userId}`);
    return await response.json();
};
  
export const fetchContent = async (category) => {
    const response = await fetch(`http://localhost:3001/api/content/${category}`);
    return await response.json();
};
  