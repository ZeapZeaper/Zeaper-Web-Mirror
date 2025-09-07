import { MeasurementInterface } from '@/interface/interface';
import { Accordion, Badge, ToggleSwitch } from 'flowbite-react';


const toggleTheme = {
  root: {
    base: 'group flex rounded-lg focus:outline-none',
    active: {
      on: 'cursor-pointer',
      off: 'cursor-not-allowed opacity-50',
    },
    label:
      'ms-3 mt-0.5 text-start text-sm font-medium text-gray-900 dark:text-gray-300',
  },
  toggle: {
    base: 'relative rounded-full border after:absolute after:rounded-full after:bg-white after:transition-all group-focus:ring-4 group-focus:ring-cyan-500/25',
    checked: {
      on: 'after:translate-x-full after:border-white rtl:after:-translate-x-full',
      off: 'border-gray-200 bg-slate-700 dark:border-gray-600 dark:bg-gray-700',
    },
  },
};

const BespokeBodyMeasurementEnumsList = ({
  bodyMeasurementEnumsData,
  measurements,
  setMeasurements,
}: {
  bodyMeasurementEnumsData: {
    name: string;
    fields: string[];
  }[];
  measurements: MeasurementInterface[];
  setMeasurements: (measurement: MeasurementInterface[]) => void;
}) => {
  const checkIsChecked = (name: string, field: string) => {
    return measurements
      ?.find((item) => item.name === name)
      ?.fields.includes(field);
  };
  const handleToggle = (name: string, field: string) => {
    const found = measurements?.find((item) => item.name === name);
    if (found) {
      const updatedMeasurement = measurements?.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            fields: item.fields.includes(field)
              ? item.fields.filter((item) => item !== field)
              : [...item.fields, field],
          };
        }
        return item;
      });
      setMeasurements(updatedMeasurement);
    } else {
      setMeasurements([
        ...(measurements || []),
        {
          name,
          fields: [field],
        },
      ]);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {bodyMeasurementEnumsData.map((bodyMeasurementEnum) => (
        <div key={bodyMeasurementEnum.name} className="flex flex-col gap-2">
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>
                <span className="text-lg  text-darkGold">
                  {bodyMeasurementEnum.name}
                </span>
                <span className=" flex gap-2 flex-wrap">
                  {measurements
                    ?.find((item) => item.name === bodyMeasurementEnum.name)
                    ?.fields.map((field) => (
                      <Badge key={field} size="sm" color="success">
                        {field}
                      </Badge>
                    ))}
                </span>
              </Accordion.Title>
              <Accordion.Content>
                <div className="flex flex-col gap-2">
                  <span className="flex gap-1">
                    <Badge
                      color="success"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => {
                        const found = measurements?.find(
                          (item) => item.name === bodyMeasurementEnum.name,
                        );
                        if (found) {
                          const updatedMeasurement = measurements?.map(
                            (item) => {
                              if (item.name === bodyMeasurementEnum.name) {
                                return {
                                  ...item,
                                  fields: bodyMeasurementEnum.fields,
                                };
                              }
                              return item;
                            },
                          );
                          setMeasurements(updatedMeasurement);
                        } else {
                          setMeasurements([
                            ...(measurements || []),
                            {
                              name: bodyMeasurementEnum.name,
                              fields: bodyMeasurementEnum.fields,
                            },
                          ]);
                        }
                      }}
                    >
                      Select All
                    </Badge>
                    <Badge
                      color="failure"
                      className="cursor-pointer"
                      size="sm"
                      onClick={() => {
                        const found = measurements?.find(
                          (item) => item.name === bodyMeasurementEnum.name,
                        );
                        if (found) {
                          const updatedMeasurement = measurements?.map(
                            (item) => {
                              if (item.name === bodyMeasurementEnum.name) {
                                return {
                                  ...item,
                                  fields: [],
                                };
                              }
                              return item;
                            },
                          );
                          setMeasurements(updatedMeasurement);
                        }
                      }}
                    >
                      Clear All
                    </Badge>
                  </span>

                  <div className="flex flex-col gap-2">
                    {bodyMeasurementEnum.fields.map((field) => (
                      <div key={field} className="flex flex-col gap-2">
                        <ToggleSwitch
                          theme={toggleTheme}
                          label={field}
                          name={field}
                          color="success"
                          checked={
                            checkIsChecked(bodyMeasurementEnum.name, field) ||
                            false
                          }
                          onChange={() =>
                            handleToggle(bodyMeasurementEnum.name, field)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default BespokeBodyMeasurementEnumsList;
