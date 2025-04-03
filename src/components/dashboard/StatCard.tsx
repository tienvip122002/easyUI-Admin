interface StatCardProps {
  title: string;
  value: string | number;
  percentage: number;
  icon: React.ReactNode;
  bgColor: string;
}

const StatCard = ({ title, value, percentage, icon, bgColor }: StatCardProps) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 text-white shadow-lg`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className="text-sm mt-2">
            {percentage}% from previous period
          </p>
        </div>
        <div className="text-white opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard; 