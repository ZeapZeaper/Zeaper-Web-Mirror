import { capitalizeFirstLetter } from "@/utils/helpers";

const ProductOrderBodyMeasurementDisplay = ({
  bodyMeasurements,
}: {
  bodyMeasurements: [
    {
      name: string;
      measurements: [
        {
          field: string;
          value: number;
          unit: string;
        }
      ];
    }
  ];
}) => {
  return (
    <div className="flex flex-col gap-2">
      {bodyMeasurements.map((measurement) => {
        return (
          <div
            key={measurement.name}
            className="flex flex-col  bg-white  rounded-md dark:bg-boxdark"
          >
            <h5 className="font-semibold text-info">{capitalizeFirstLetter(measurement.name)}</h5>
            <ul>
              {measurement.measurements.map((item) => {
                return (
                  <li key={item.field} className="mb-2">
                    <span className="flex justify-between">
                      <span>{item.field}</span>
                      <span className="font-semibold">
                        {item.value} {item.unit}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ProductOrderBodyMeasurementDisplay;
