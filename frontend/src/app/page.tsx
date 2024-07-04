
"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination } from 'swiper/modules';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Swiper Carousel */}
      <div className="swiper-container">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="my-4"
        >
          {/* Carousel items */}
          <SwiperSlide>
            <div className="relative h-96">
              <Image
                src='https://mdbootstrap.com/img/new/slides/041.jpg'
                alt='...'
                layout='fill'
                objectFit='cover'
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-96">
              <Image
                src='https://mdbootstrap.com/img/new/slides/042.jpg'
                alt='...'
                layout='fill'
                objectFit='cover'
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-96">
              <Image
                src='https://mdbootstrap.com/img/new/slides/043.jpg'
                alt='...'
                layout='fill'
                objectFit='cover'
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Description */}
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to We Review!</h2>
        <p className="mb-4">
          Discover the best spots in town with We Review, your ultimate destination for honest and
          comprehensive reviews on coffee shops, restaurants, and bars. Whether you're a coffee
          connoisseur, a foodie looking for the next great dining experience, or someone searching
          for the perfect night out, We Review has got you covered.
        </p>
        <p className="mb-4">
          Our team of expert reviewers visits and evaluates each venue, ensuring you get detailed
          insights into the ambiance, service, menu offerings, and overall experience. From cozy
          coffee nooks to elegant dining establishments and lively bars, we bring you the highlights
          and hidden gems of the culinary and beverage world.
        </p>
        <p className="mb-4">
          Join our community to share your own experiences, find recommendations, and explore the
          finest places to enjoy your favorite food and drinks. We Review is here to guide you on
          your gastronomic adventures, one review at a time.
        </p>
      </div>

      {/* Product Cards */}
      <div className="flex justify-around mt-8">
        {/* Coffee Card */}
        <div className="w-1/3 border border-gray-300 p-4">
          <h2 className="text-xl font-bold mb-2">Best Coffee</h2>
          <div className="relative h-48 mb-2">
            <Image
              src='https://media.cntraveler.com/photos/545ffc4f0a0711b245b6d821/master/pass/global-coffee-tout.jpg'
              alt='Best Coffee'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <p className="text-sm mb-2">Explore our top pick for the best coffee in town.</p>
          {/* Add more details or links as needed */}
        </div>
        
        {/* Bar Card */}
        <div className="w-1/3 border border-gray-300 p-4">
          <h2 className="text-xl font-bold mb-2">Best Bar</h2>
          <div className="relative h-48 mb-2">
            <Image
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWhgD_ugUIdgSqCFzj58MboG54Eu9VOSZvCQ&s'
              alt='Best Bar'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <p className="text-sm mb-2">Discover the ultimate spot for drinks and nightlife.</p>
          {/* Add more details or links as needed */}
        </div>
        
        {/* Restaurant Card */}
        <div className="w-1/3 border border-gray-300 p-4">
          <h2 className="text-xl font-bold mb-2">Best Restaurant</h2>
          <div className="relative h-48 mb-2">
            <Image
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ai6nyTOFTpJsE23YpfCTmhPxYATgAiAnhA&s'
              alt='Best Restaurant'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <p className="text-sm mb-2">Indulge in fine dining at our top-rated restaurant.</p>
          {/* Add more details or links as needed */}
        </div>
      </div>

      {/* Footer */}

    </div>
  );
};

export default Home;