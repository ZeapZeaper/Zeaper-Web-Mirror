"use client";
import { useSelector } from "react-redux";
import { Alert, Tabs } from "flowbite-react";
import { MeasurementInterface, ProductInterface } from "@/interface/interface";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useEffect } from "react";
import Loading from "../loading/Loading";
import BespokeBodyMeasurementEnumsList from "./BespokeBodyMeasurementEnumsList";

interface BodyMeasurementEnum {
  gender: string;
  value: {
    name: string;
    fields: string[];
  }[];
}

const BespokeBodyMeasurement = ({
  product,
  bodyMeasurementEnums,
  measurements,
  setMeasurements,
  genders,
  additionalMeasurementNote,
  setAdditionalMeasurementNote,
}: {
  product: ProductInterface;
  bodyMeasurementEnums: BodyMeasurementEnum[];
  measurements: MeasurementInterface[];
  setMeasurements: (measurement: MeasurementInterface[]) => void;
  genders: string[];
  additionalMeasurementNote: string;
  setAdditionalMeasurementNote: (note: string) => void;
}) => {
  const femaleBodyMeasurementEnums =
    bodyMeasurementEnums?.find((m) => m.gender === "female")?.value || [];
  const maleBodyMeasurementEnums =
    bodyMeasurementEnums?.find((m) => m.gender === "male")?.value || [];
  const token = useSelector(globalSelectors.selectAuthToken);

  const productBodyMeasurementQuery =
    zeapApiSlice.useGetProductBodyMeasurementQuery(
      { productId: product.productId },
      { skip: !token || !product.productId }
    );
  const bodyMeasurements = productBodyMeasurementQuery?.data?.data;
  const isLoading = productBodyMeasurementQuery.isLoading;

  useEffect(() => {
    if (bodyMeasurements) {
      setMeasurements(bodyMeasurements?.measurements);
      setAdditionalMeasurementNote(
        bodyMeasurements?.additionalMeasurementNote || ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyMeasurements]);

  return (
    <div>
      {isLoading && <Loading />}
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <Alert color="info">
            <p>
              Please provide the applicable body measurements you would expect
              from the customer for this product.
            </p>
          </Alert>
        </div>

        <Tabs variant="pills">
          {genders.includes("Female") && (
            <Tabs.Item title="Female Measurements">
              <BespokeBodyMeasurementEnumsList
                bodyMeasurementEnumsData={femaleBodyMeasurementEnums}
                measurements={measurements}
                setMeasurements={setMeasurements}
                gender="female"
              />
            </Tabs.Item>
          )}
          {genders.includes("Male") && (
            <Tabs.Item title="Male Measurements">
              <BespokeBodyMeasurementEnumsList
                bodyMeasurementEnumsData={maleBodyMeasurementEnums}
                measurements={measurements}
                setMeasurements={setMeasurements}
                gender="male"
              />
            </Tabs.Item>
          )}
        </Tabs>
      </div>
      <div className="flex flex-col gap-2 rounded-lg p-2 border border-slate-200 py-4 my-4">
        <label
          htmlFor="bespokeInstruction"
          className="text-sm font-semibold text-info"
        >
          Additional Instructions
          <span className="text-xs font-normal"> (Optional)</span>
        </label>
        <textarea
          id="bespokeInstruction"
          name="bespokeInstruction"
          value={additionalMeasurementNote || ""}
          onChange={(e) =>
            setAdditionalMeasurementNote &&
            setAdditionalMeasurementNote(e.target.value)
          }
          className="rounded-lg p-2 border border-slate-200 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm"
        />
      </div>
    </div>
  );
};

export default BespokeBodyMeasurement;
