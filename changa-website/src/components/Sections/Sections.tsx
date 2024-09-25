import React from 'react';
import Button from '../core/Button/Button';
import Input from '../core/Input/Input';

const Sections: React.FC = () => {
  return (
    <>
      <section style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
      <Button variant="primary" onClick={() => console.log('Clicked!')}>
        Primary Button
      </Button>

      <Button variant="secondary" size="small">
        Small Secondary Button
      </Button>

      <Button variant="tertiary" size="large" fullWidth onClick={() => alert('Large Button')}>
        Full-Width Large Gradient Button
      </Button>

      <Button variant="primary" disabled>
        Disabled Primary Button
      </Button>

      <Input
        variant="default"
        placeholder="Enter your name"
        inputSize="small"
        fullWidth
        disabled
      />

      <Input
        variant="search"
        placeholder="Search..."
        inputSize="large"
        onClick={() => console.log('Search clicked')}
      />

      </section>
    </>
  );
};

export default Sections;
