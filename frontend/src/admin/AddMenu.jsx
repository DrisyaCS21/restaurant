import React, { useState } from 'react';

const AddMenu = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the menu object
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("image", imageFile);

    try {
      const response = await fetch('http://localhost:1000/api/menu', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add menu');
      }

      const data = await response.json();
      console.log('Menu added:', data);
      setMessage(`Menu added successfully! ID: ${data._id}`);
      
      // Clear form
      setName('');
      setPrice('');
      setCategory('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>Add Menu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Add Menu</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddMenu;