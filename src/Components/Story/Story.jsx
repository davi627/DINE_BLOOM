import React from 'react';
import './Story.css';

const Story = () => {
  return (
    <div className="story-container">
      <div className="heading-wrapper">
        <h1 className="story-heading">
          Our Story
          <span className="underline-long"></span>
          <span className="underline-short"></span>
        </h1>
      </div>
      <div className="story-paragraphs">
        <p>
          We had always dreamed of opening a restaurant, inspired by the family
          recipes passed down through generations. I spent years working in
          local kitchens, refining my culinary skills, and one day, we decided
          it was time to take a chance on our own place.
        </p>
        <p>
          We found a small corner space on a quiet street in 2010 and named it
          Heirloom Kitchen—a tribute to the heritage that inspired my passion
          for cooking. With limited money but big hopes, we started with just
          six tables and an open kitchen. The menu was always changing, based on
          whatever fresh ingredients I could find at the local markets.
        </p>
        <p>
          Sarah, my wife, took care of the front of house while two local high
          school students helped us with the rest. We knew it wouldn’t be easy,
          but we were determined to make it work. At first, business was slow,
          but word started to spread about our unique blend of tradition and
          modern flavors.
        </p>
      </div>
    </div>
  );
};

export default Story;
