import { kFormatter } from '@/utils/helpers';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useSelector } from 'react-redux';


const SalesRevenueChart = ({
  fillColors,
  labels,
  data,
  totalLabel,
  currency,
}: {
  fillColors: string[];
  labels?: string[];
  data: number[];
  totalLabel?: string;
  currency: string;
}) => {
  //colors: ["#133522", "#D5B07B"],

  const options: ApexCharts.ApexOptions = {
    stroke: {
      colors: ['transparent'],
      lineCap: 'round',
    },
    chart: {
      type: 'donut',
      fontFamily: 'Inter, sans-serif',
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
          size: '70%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '1px',
              fontFamily: 'Inter, sans-serif',
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '1px',
              fontFamily: 'Inter, sans-serif',
              color: undefined,
              offsetY: 16,
              formatter: function (val) {
                return val;
              },
            },
            total: {
              show: true,
              label: totalLabel || 'Total',
              color: '#888',
              formatter: function (w) {
                const total = w.globals.seriesTotals.reduce(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (a: any, b: any) => {
                    return a + b;
                  },
                  0,
                );
                return `${currency}${kFormatter(total)}`;
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

  return <Chart height={420} options={options} series={series} type="donut" />;
};

// const thisYearFirstDay = dateCalcHelper.getThisYearFirstDay();
// const thisYearLastDay = dateCalcHelper.getThisYearLastDay();

const ShopSalesRevenue = ({
  shopRevenuesByPaymentStatus,
}: {
  shopRevenuesByPaymentStatus: {
    paid: { currency: string; value: number };
    pending: { currency: string; value: number };
  };
}) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currency = useSelector((state: any) => state.currency);
  return (
    <div className="bg-grey8 shadow-lg rounded-lg p-4 w-full text-grey2    dark:bg-slate-800 dark:text-white">
      <div className="flex justify-between my-1">
        <div className="text-sm">Sales Revenue</div>
        {/* <div>
          <DateFilter from={from} setFrom={setFrom} to={to} setTo={setTo} />
        </div> */}
      </div>
      <div className="flex justify-between my-3 flex-wrap">
        <div className="flex items-center text-center gap-1 text-sm flex-wrap">
          <div className="w-[16px] h-[16px] bg-baseGreen rounded-md"></div>
          <div>
            Paid ={' '}
            <strong>{`${shopRevenuesByPaymentStatus.paid.currency} ${kFormatter(
              shopRevenuesByPaymentStatus.paid.value,
            )}`}</strong>
          </div>
        </div>
        <div className="flex items-center text-center gap-1 text-sm flex-wrap">
          <div className="w-[16px] h-[16px] bg-gold rounded-md"></div>
          <div>
            Pending ={' '}
            <strong>{`${shopRevenuesByPaymentStatus.pending.currency} ${kFormatter(
              shopRevenuesByPaymentStatus.pending.value,
            )}`}</strong>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <SalesRevenueChart
          fillColors={['#133522', '#D5B07B']}
          labels={['Paid', 'Pending']}
          data={[
            shopRevenuesByPaymentStatus.paid.value,
            shopRevenuesByPaymentStatus.pending.value,
          ]}
          totalLabel="Revenue"
          currency={currency?.symbol || '₦'}
        />
      </div>
    </div>
  );
};

export default ShopSalesRevenue;
