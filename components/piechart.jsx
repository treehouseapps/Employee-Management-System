import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const renderCustomLabel = ({ name, percent }) => (
    <text
        fill="#000"
        fontSize={10}
    >{`${name}: ${(percent * 100).toFixed(0)}%`}</text>
);
const PieChartComponent = ({ data }) => (
    <PieChart width={400} height={300}>
        <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fontSize={'12px'}
            fill="#8884d8"
            dataKey="value"
        >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{
            padding: '8px 0px',
            borderRadius: 4,
            boxShadow: '1px 1px 10px 1px lightgray',
            fontSize: 14,
        }} />
    </PieChart>
);

export default PieChartComponent;
