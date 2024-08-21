import React from 'react';
import './ItemList.css';

const items = [
  { src: './travi.jpeg', title: 'Dravic Sgod', subtitle: 'Fin fin fein fien fiin' },
  { src: './kanye3.jpg', title: 'Kanye East', subtitle: 'Old Town Road' },
  { src: './kanye2.jpg', title: 'Kanye South', subtitle: 'Old Town Road' },
  { src: './kanye4.jpg', title: 'Kanye West', subtitle: 'Old Town Road' },
  { src: './kanye.jpg', title: 'Kanye North', subtitle: 'Old Town Road' },
];

const ItemList: React.FC = () => {
  return (
    <div className="container">
      <div className="item-list">
        {items.map((item, index) => (
          <div className="item" key={index}>
            <div className="cover-container">
              <img src={item.src} alt={item.title} />
            </div>
            <div>
              <h3>{item.title}</h3>
              <h4>{item.subtitle}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
