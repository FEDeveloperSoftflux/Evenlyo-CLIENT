import React from "react";

const Ratings = () => {
  return (
    <section id="reviews" className="py-16 px-6 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-[25px] lg:text-4xl font-bold text-gray-900 mb-2">
            Innovative{" "}
            <span
              className="relative inline-block"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,236,188,0) 85%, #FFECBC 85%)",
                borderRadius: "6px",
                padding: "0 4px",
                display: "inline-block",
              }}
            >
              Rating System
            </span>
          </h2>
          <p className="text-md text-gray-600 max-w-3xl mx-auto">
            Our rating system offers a comprehensive solution to enhance your
            website's SEO and elevate its credibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Multi Criteria Reviews */}
          <div className="bg-gray-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                <img
                  src="/assets/multicriterialogo.svg"
                  alt="multicriteria logo"
                />
              </div>
              <h3 className="text-2xl sm:text-xl font-bold text-gray-900">
                Multi Criteria Reviews
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Allow users to{" "}
              <span className="font-semibold text-gray-900">
                rate listings based on multiple rating criteria
              </span>
              . Rating criteria are{" "}
              <span className="font-semibold text-gray-900">
                easily configurable
              </span>{" "}
              and you can create them as many as you need.
            </p>

            {/* Rating Display */}
            <div className=" rounded-lg">
              <img
                src="/assets/multicriteria.png"
                alt="multicriteria reviews"
                className="w-100"
              />
            </div>
          </div>

          {/* Google Reviews */}
          <div className="bg-gray-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12  rounded-lg flex items-center justify-center mr-4">
                <img src="/assets/google-reviews.svg" alt="googler logo" />
              </div>
              <h3 className="text-2xl sm:text-xl font-bold text-gray-900">
                Google Reviews
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              <span className="font-semibold text-gray-900">
                Add social proof and authenticity!
              </span>{" "}
              Listeo allows to embed{" "}
              <span className="font-semibold text-gray-900">
                Google Reviews
              </span>{" "}
              on listing pages without Google Business API.
            </p>

            {/* Google Review Display */}
            <div className=" rounded-lg ">
              <img src="/assets/googlereview.png" alt="google review" className="w-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ratings;
