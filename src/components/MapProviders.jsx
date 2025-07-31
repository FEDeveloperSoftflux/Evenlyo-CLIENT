import React from "react";

const MapProviders = () => {
  return (
    <section className="bg-[#212121] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Map */}
          <div className="relative">
            {/* Dark map background with pins */}
            <div
              className="relative bg-gray-800 rounded-lg overflow-hidden shadow-xl"
              style={{ height: "400px" }}
            >
              {/* Map background with street layout */}
              <div className="absolute inset-0 bg-gray-800 rounded-lg">
                {/* Street grid pattern */}
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  {/* Street lines */}
                  <path d="M0 100 L400 100" stroke="#4a5568" strokeWidth="1" />
                  <path d="M0 200 L400 200" stroke="#4a5568" strokeWidth="1" />
                  <path d="M0 300 L400 300" stroke="#4a5568" strokeWidth="1" />
                  <path d="M100 0 L100 400" stroke="#4a5568" strokeWidth="1" />
                  <path d="M200 0 L200 400" stroke="#4a5568" strokeWidth="1" />
                  <path d="M300 0 L300 400" stroke="#4a5568" strokeWidth="1" />

                  {/* Street names */}
                  <text
                    x="20"
                    y="95"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Charleston
                  </text>
                  <text
                    x="20"
                    y="115"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Meadows
                  </text>

                  <text
                    x="85"
                    y="395"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Jardin Dr
                  </text>

                  <text
                    x="220"
                    y="395"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Mountain View
                  </text>

                  <text
                    x="320"
                    y="30"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Moffett Federal
                  </text>
                  <text
                    x="320"
                    y="45"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Airfield
                  </text>

                  <text
                    x="260"
                    y="95"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Leighton St
                  </text>

                  <text
                    x="340"
                    y="135"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Googleplex
                  </text>

                  <text
                    x="200"
                    y="165"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Roca St
                  </text>

                  <text
                    x="160"
                    y="195"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Central Expy
                  </text>

                  <text
                    x="280"
                    y="225"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Bayshore Fwy
                  </text>

                  <text
                    x="250"
                    y="285"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Villa St
                  </text>

                  <text
                    x="15"
                    y="375"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Rita Ln
                  </text>

                  <text
                    x="390"
                    y="375"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Whisman
                  </text>
                  <text
                    x="390"
                    y="390"
                    fill="#9ca3af"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Station
                  </text>
                </svg>

                {/* Map pins */}
                <div className="absolute top-12 left-20">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="absolute top-32 left-32">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="absolute top-24 right-24">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="absolute bottom-32 left-16">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="absolute bottom-16 right-32">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block bg-[#FFF2AF] text-black text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Free Alternatives to Google API
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Various Map Providers
              </h2>
            </div>

            {/* Map Provider Logos */}
            <div className="flex items-center gap-6 bg-[#303030] p-4 rounded-lg ">
              <img src="/assets/map-providers.png" alt="map providers" />
            </div>

            {/* Description Text */}
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Listeo supports{" "}
                <span className="text-white font-semibold">
                  OpenStreetMap and MapBox
                </span>
                . You are not limited to Google Maps only.
              </p>
              <p className="leading-relaxed">
                Listeo has also{" "}
                <span className="text-white font-semibold">
                  address autocomplete feature powered by OpenStreetMap
                </span>{" "}
                - entirely no need to use Google API!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapProviders;
