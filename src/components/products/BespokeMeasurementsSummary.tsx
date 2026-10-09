import { Badge } from 'flowbite-react';

interface ProductMeasurementSelection {
  name: string;
  fields: string[];
}

interface BespokeMeasurementsSummaryProps {
  isLoading?: boolean;
  measurements?: ProductMeasurementSelection[];
  additionalMeasurementNote?: string;
}

const BespokeMeasurementsSummary = ({
  isLoading,
  measurements = [],
  additionalMeasurementNote,
}: BespokeMeasurementsSummaryProps) => {
  if (isLoading) {
    return (
      <div className="pt-3 border-t border-slate-200">
        <p className="text-sm text-slate-500">
          Loading selected measurements...
        </p>
      </div>
    );
  }

  if (!measurements.length && !additionalMeasurementNote) {
    return null;
  }

  return (
    <div className="pt-3 border-t border-slate-200 space-y-3">
      {measurements.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">
            Selected Measurements
          </span>
          <div className="grid gap-2">
            {measurements.map((measurement) => (
              <div
                key={measurement.name}
                className="rounded-lg border border-slate-200 p-3"
              >
                <p className="text-sm font-semibold text-darkGold">
                  {measurement.name}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {measurement.fields.map((field) => (
                    <Badge key={field} color="gray" className="w-fit">
                      {field}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {additionalMeasurementNote && (
        <div className="space-y-1">
          <span className="text-sm font-semibold text-slate-700">
            Additional Instructions
          </span>
          <p className="text-sm text-slate-500 whitespace-pre-line">
            {additionalMeasurementNote}
          </p>
        </div>
      )}
    </div>
  );
};

export default BespokeMeasurementsSummary;