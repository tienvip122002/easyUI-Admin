import { ChartBarIcon, UserGroupIcon, CurrencyDollarIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import StatCard from '../components/dashboard/StatCard';
import DonutChart from '../components/dashboard/DonutChart';
import LineChart from '../components/dashboard/LineChart';
import BarChart from '../components/dashboard/BarChart';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
        WELCOME JOHN!
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="STATISTICS"
          value="65841"
          percentage={8}
          icon={<ChartBarIcon className="h-8 w-8" />}
          bgColor="bg-indigo-500"
        />
        <StatCard
          title="USER TODAY"
          value="52142"
          percentage={12}
          icon={<UserGroupIcon className="h-8 w-8" />}
          bgColor="bg-cyan-500"
        />
        <StatCard
          title="RETURNS PER MINUTE"
          value="2365"
          percentage={-2}
          icon={<CurrencyDollarIcon className="h-8 w-8" />}
          bgColor="bg-pink-500"
        />
        <StatCard
          title="NEW PAYING CLIENTS"
          value="854"
          percentage={6}
          icon={<ChartPieIcon className="h-8 w-8" />}
          bgColor="bg-green-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Last 30 days statistics
          </h3>
          <div className="h-[300px] w-full">
            <DonutChart />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Total Revenue share
          </h3>
          <div className="h-[300px] w-full">
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 