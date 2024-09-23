import React from 'react';
import Button from '../core/Button/Button';

const Sections: React.FC = () => {
  return (
    <>
      <section>
      <Button variant="primary" onClick={() => console.log('Button clicked')}>
        BUTTON
      </Button>
      <Button variant="secondary" onClick={() => console.log('Button clicked')}>
      BUTTON      </Button>
      <Button variant="tertiary" onClick={() => console.log('Button clicked')}>
      BUTTON      </Button>
      </section>
    </>
  );
};

export default Sections;
