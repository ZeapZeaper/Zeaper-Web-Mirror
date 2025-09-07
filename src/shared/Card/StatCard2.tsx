const StatCard2 = ({
  value,
  title,
}: {
  value?: string | number;
  title?: string;
}) => {
  return (
    <div className="bg-grey8 shadow-lg rounded-lg p-4 w-full text-grey2    dark:bg-slate-800 dark:text-white">
      <div className="font-bold text-md">{value}</div>
      <div className="text-sm">{title}</div>
    </div>
  );
};

export default StatCard2;
