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
          A List Liqour, Bar, and Restaurant is a distinguished establishment
          located in the vibrant Thika Runda estate. Established in 2023, we
          offer a comprehensive range of culinary, beverage, and retail services
          designed to meet the discerning needs of our clientele.
        </p>
        <p>
          Under the expert guidance of Vivian Injeshi and James Apollo, A List
          Liqour, Bar, and Restaurant has quickly gained recognition for its
          exceptional quality and service. Our restaurant features a
          meticulously crafted menu of exquisite dishes, while our bar presents
          a curated selection of premium spirits, wines, and beers.
        </p>
        <p>
          Beyond our culinary and beverage offerings, we provide essential
          retail services. Our butcher shop offers a variety of fresh,
          high-quality meats, ensuring exceptional taste and value.
          Additionally, our floral shop curates stunning arrangements for any
          occasion, adding a touch of elegance to your special moments.
        </p>
        <p>
          At A List Liqour, Bar, and Restaurant, we are dedicated to providing
          an exceptional experience that combines culinary excellence, a
          welcoming atmosphere, and exceptional value. We invite you to discover
          the difference for yourself.
        </p>
      </div>
    </div>
  );
};

export default Story;
