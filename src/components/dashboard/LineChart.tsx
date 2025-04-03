import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', Revenue: 4000, Expenses: 2400, Profit: 2400 },
  { name: 'Feb', Revenue: 3000, Expenses: 1398, Profit: 2210 },
  { name: 'Mar', Revenue: 2000, Expenses: 9800, Profit: 2290 },
  { name: 'Apr', Revenue: 2780, Expenses: 3908, Profit: 2000 },
  { name: 'May', Revenue: 1890, Expenses: 4800, Profit: 2181 },
  { name: 'Jun', Revenue: 2390, Expenses: 3800, Profit: 2500 },
];

const LineChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Total Revenue graph</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Revenue" stroke="#8884d8" />
            <Line type="monotone" dataKey="Expenses" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Profit" stroke="#ffc658" />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart; 