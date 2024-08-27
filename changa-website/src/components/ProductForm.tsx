import React, { useState } from 'react';
import { Product, DiscType, Category } from '../types/Product'; // Adjust the path as necessary

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<Product>({
    id: undefined,
    created: undefined,
    album: '',
    artist: '',
    price: '',
    quantity: 0,
    discType: DiscType.CD, // Default value
    category: Category.Rock, // Default value
    recordLabel: '',
    releaseYear: 0,
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'quantity' || name === 'releaseYear' ? parseInt(value, 10) : value,
      [name]: name === 'discType' || name === 'category' ? value as any : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Log the formData to verify the structure
    console.log('Submitting form data:', formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Ensure date is in ISO format if required
        }),
      });

      if (!response.ok) {
        // Log response status and body
        const errorData = await response.text();
        console.error('Server response:', errorData);
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log('Product added:', data);

      // Optionally reset the form
      setFormData({
        id: undefined,
        created: undefined,
        album: '',
        artist: '',
        price: '',
        quantity: 0,
        discType: DiscType.CD,
        category: Category.Rock,
        recordLabel: '',
        releaseYear: 0,
        description: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="product-form-container">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Album:
          <input
            type="text"
            name="album"
            value={formData.album}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Artist:
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Disc Type:
          <select
            name="discType"
            value={formData.discType}
            onChange={handleChange}
            required
          >
            {Object.keys(DiscType).map((key) => (
              <option key={key} value={DiscType[key as keyof typeof DiscType]}>
                {key}
              </option>
            ))}
          </select>
        </label>

        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {Object.keys(Category).map((key) => (
              <option key={key} value={Category[key as keyof typeof Category]}>
                {Category[key as keyof typeof Category]}
              </option>
            ))}
          </select>
        </label>

        <label>
          Record Label:
          <input
            type="text"
            name="recordLabel"
            value={formData.recordLabel}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Release Year:
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
