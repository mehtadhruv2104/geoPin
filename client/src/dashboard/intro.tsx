import React from 'react';


const IntroToUser = (props) => {
    

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md text-center shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Welcome to GeoPin</h1>
        <p className="text-base mb-2">
          Here you can have all your favorite locations on a personalized map.
        </p>
        <p className="text-base mb-2">
          To get started, search for your favorite location and drag, drop, and play around.
        </p>
        <p className="text-base mb-4">
          When you want to save a location, right-click on it and enter details. A left-click
          on the saved location shows its details.
        </p>
        <button
            onClick={()=>{
                props?.setShowIntro(false);
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
            Got it!
        </button>
      </div>
    </div>
  );
};

export default IntroToUser;