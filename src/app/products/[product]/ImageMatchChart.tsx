"use client";

// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ImageMatchChart = ({
  fillColors,
  labels,
  data,
  totalLabel,
}: {
  fillColors: string[];
  labels?: string[];
  data: number[];
  totalLabel?: string;
}) => {
  //colors: ["#133522", "#D5B07B"],

  const options: ApexCharts.ApexOptions = {
    stroke: {
      colors: ["transparent"],
      lineCap: "round",
    },
    chart: {
      type: "donut",
      fontFamily: "Inter, sans-serif",
      // foreColor: labelColor,
      toolbar: {
        show: false,
      },
    },
    labels: labels,
    fill: {
      colors: fillColors,
    },

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "1px",
              fontFamily: "Inter, sans-serif",
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "1px",
              fontFamily: "Inter, sans-serif",
              color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return val;
              },
            },
            total: {
              show: false,
              label: totalLabel || "Total",
              color: "#888",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },

    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };
  const series = data;

  return (
    <div className="  rounded-lg  w-full   dark:bg-slate-800 dark:text-white">
      <div className="flex justify-between my-1">
        <div className="text-sm font-semibold">
          {" "}
          Image displayed matches product?
        </div>
        {/* <div>
      <DateFilter from={from} setFrom={setFrom} to={to} setTo={setTo} />
    </div> */}
      </div>
      <div className="flex justify-between my-3 flex-wrap">
        <div className="flex items-center text-center gap-1 text-sm flex-wrap">
          <div className="w-[16px] h-[16px] bg-[#AFE1AF] rounded-md"></div>
          <div>
            Yes = <strong>{(data[1] / (data[0] + data[1])) * 100}%</strong>
          </div>
        </div>
        <div className="flex items-center text-center gap-1 text-sm flex-wrap">
          <div className="w-[16px] h-[16px] bg-[#D5B07B] rounded-md"></div>
          <div>
            No = <strong>{(data[0] / (data[0] + data[1])) * 100}%</strong>
          </div>
        </div>
      </div>{" "}
      {typeof window !== "undefined" && (
        <div className="flex justify-center ">
          <Chart height={130} options={options} series={series} type="donut" />
        </div>
      )}
    </div>
  );
};

export default ImageMatchChart;
