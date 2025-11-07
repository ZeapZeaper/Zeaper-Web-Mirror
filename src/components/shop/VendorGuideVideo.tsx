import React from "react";

const VendorGuideVideo = () => {
  return (
    <div className="w-full max-w-3xl mx-auto aspect-video mb-4">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/gguCDZpJQT4"
        title="Vendor Success Story: Jumia Express has impacted our sales positively"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VendorGuideVideo;
