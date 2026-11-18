"use client";

import { useState } from "react";

export default function ProductClient({ product }) {
  const [selectedCategory, setSelectedCategory] = useState(
    product.categories[0]
  );

  const [mainImage, setMainImage] = useState(
    product.categories[0].images[0]
  );

  return (
    <section className="pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A52A2] mb-6 md:mb-10">
          {product.title}
        </h1>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Sidebar */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow p-4 sm:p-6">
            <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-6 text-gray-800">
              Categories
            </h2>

            <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto gap-2 lg:gap-0 lg:space-y-3 pb-2 lg:pb-0 no-scrollbar">
              {product.categories.map((category, index) => {
                const isSelected =
                  selectedCategory.name === category.name;

                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCategory(category);
                      setMainImage(category.images[0]);
                    }}
                    className={`flex-shrink-0 lg:w-full text-left px-3.5 py-2.5 sm:px-4 sm:py-3.5 lg:p-4 rounded-xl border font-medium text-xs sm:text-sm lg:text-base transition-all duration-300 whitespace-nowrap lg:whitespace-normal ${
                      isSelected
                        ? "bg-[#1A52A2] text-white border-[#1A52A2] shadow-sm"
                        : "bg-white text-gray-600 border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl shadow p-4 sm:p-6 md:p-8">

            {/* Main Image */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-9 w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-3xl overflow-hidden flex items-center justify-center">
                <img
                  src={mainImage}
                  alt=""
                  className="w-full h-full object-contain rounded-3xl"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="md:col-span-3 w-full">
                <div className="grid grid-cols-4 md:grid-cols-2 gap-3">
                  {selectedCategory.images.map((image, index) => {
                    const isCurrentMain = mainImage === image;

                    return (
                      <img
                        key={index}
                        src={image}
                        alt=""
                        onClick={() => setMainImage(image)}
                        className={`w-full aspect-square object-cover rounded-xl border cursor-pointer ${
                          isCurrentMain
                            ? "border-[#DA1F28]"
                            : "border-gray-200"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Product Name */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A52A2] mt-6 sm:mt-10">
              {selectedCategory.name}
            </h2>

            {/* Description */}
            <p className="mt-4 sm:mt-5 text-gray-600 text-sm sm:text-base leading-7 sm:leading-8">
              {selectedCategory.description}
            </p>

            {/* Enquiry Button */}
            <a
              href={`/contact?product=${encodeURIComponent(
                selectedCategory.name
              )}&service=${encodeURIComponent(product.title)}`}
              className="inline-block mt-6 sm:mt-8 px-8 py-3.5 sm:py-4 bg-[#DA1F28] hover:bg-[#b91c1c] text-white font-semibold rounded-full w-full sm:w-auto text-center transition-colors shadow-md"
            >
              Enquiry Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}