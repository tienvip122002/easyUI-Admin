import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

const data = [
  { name: 'Hired', value: 35 },
  { name: 'Pending', value: 45 },
  { name: 'Rejected', value: 20 },
];

const COLORS = ['#0088FE', '#FF8042', '#FF0000'];

const DonutChart = () => {
  const { darkMode } = useTheme();

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            cx="50%"
            cy="50%"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{
              color: darkMode ? '#fff' : '#000'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart; 