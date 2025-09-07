interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}
const BespokeMaterialColorSelection = ({
  availableColors,
  setSelectedMaterialColor,
  selectedMaterialColor,
  colorOptions,
}: {
  availableColors: string[];
  setSelectedMaterialColor: (color: string) => void;
  selectedMaterialColor: string;
  colorOptions: ColInterface[];
}) => {
  const getBg = (value: string) => {
    if (value.toLocaleLowerCase() === "bespoke")
      return "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(204,23,195,0.09147408963585435) 4%, rgba(205,64,138,0.5172443977591037) 25%, rgba(207,136,39,1) 37%, rgba(13,15,25,1) 44%, rgba(32,37,4,1) 45%, rgba(72,84,9,0.4472163865546218) 100%)";
    const color = colorOptions?.find((color) => color.name === value);
    return color?.hex || color?.background;
  };
  return (
    <div className="flex flex-col gap-2">
      <span className="text-md font-semibold">Material Color</span>
      <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-4 md:gap-6">
        {availableColors?.map((color: string, index: number) => (
          <div
            onClick={() => {
              setSelectedMaterialColor(color);
            }}
            key={index}
            className="inline-flex  md:justify-center gap-3 cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full cursor-pointer border  border-slate-200 ring hover:ring-primary
           ${
             color === selectedMaterialColor
               ? "ring-primary  ring-offset-4"
               : "ring-transparent"
           }`}
              style={{ background: getBg(color) }}
            ></div>
            <span>{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BespokeMaterialColorSelection;
