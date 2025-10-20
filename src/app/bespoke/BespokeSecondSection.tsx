// Quote
const data = {
  title: "BESPOKE",
  subtle: "Tailored to Perfection",
  quote:
    "Experience the art of bespoke tailoring with our exclusive collection. Each piece is crafted to your unique specifications, ensuring a perfect fit and unparalleled style.",
};

const BespokeSecondSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600">{data.subtle}</p>
        </div>
        <blockquote className="text-center text-gray-700 italic text-lg md:text-xl max-w-2xl mx-auto">
          &quot;{data.quote}&quot;
        </blockquote>
      </div>
    </section>
  );
};

export default BespokeSecondSection;


{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="relative cursor-pointer">
  <Image
    src={BespokeWeddingImage}
    alt="Wedding Dress"
    width={500}
    height={500}
    className="w-full h-full object-cover rounded-full"
  />
  <div className="absolute bottom-0 left-0 right-0 bg-primary ">
    <h3 className="text-xl font-semibold">Wedding Dresses</h3>
  </div>
</div>
</div> */}