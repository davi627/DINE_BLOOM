import React from 'react';
import TopBar from '../TopBar/TopBar';
import Hero from '../Hero/Hero';
import Story from '../Story/Story';
import Gallery from '../Gallery/Gallery';
import Flowers from '../Flowers/Flowers';
import Footer from '../Footer/Footer';

const LandingPage = () => {
  return (
    <div>
      <TopBar />
      <Hero />
      <Story />
      <Gallery />
      <Flowers />
      <Footer />
    </div>
  );
};

export default LandingPage;
