import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FaWallet, FaArrowUp, FaArrowDown, FaPiggyBank } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { items, totalIncome, totalExpenses, balance } = useSelector((state) => state.expenses);

  // Calculate category totals
  const categoryData = useMemo(() => {
    const expenses = items.filter(item => item.type === 'expense');
    const categoryTotals = {};
    
    expenses.forEach(item => {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    });
    
    return categoryTotals;
  }, [items]);

  // Monthly data for bar chart
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const income = new Array(12).fill(0);
    const expenses = new Array(12).fill(0);
    
    items.forEach(item => {
      const date = new Date(item.date);
      const month = date.getMonth();
      if (item.type === 'income') {
        income[month] += item.amount;
      } else {
        expenses[month] += item.amount;
      }
    });
    
    return { income, expenses, months };
  }, [items]);

  const barChartData = {
    labels: monthlyData.months,
    datasets: [
      {
        label: 'Income',
        data: monthlyData.income,
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
      },
      {
        label: 'Expenses',
        data: monthlyData.expenses,
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#C9CBCF',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#fff' : '#374151',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9CA3AF' : '#6B7280',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB',
        },
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9CA3AF' : '#6B7280',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#fff' : '#374151',
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Balance</p>
              <p className="text-2xl font-bold mt-1">${balance.toFixed(2)}</p>
            </div>
            <FaWallet className="text-3xl text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Income</p>
              <p className="text-2xl font-bold mt-1">${totalIncome.toFixed(2)}</p>
            </div>
            <FaArrowUp className="text-3xl text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold mt-1">${totalExpenses.toFixed(2)}</p>
            </div>
            <FaArrowDown className="text-3xl text-red-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Transactions</p>
              <p className="text-2xl font-bold mt-1">{items.length}</p>
            </div>
            <FaPiggyBank className="text-3xl text-purple-200" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Monthly Overview
          </h3>
          <div className="h-[300px]">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Expenses by Category
          </h3>
          <div className="h-[300px] flex items-center justify-center">
            {Object.keys(categoryData).length > 0 ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                No expense data to display
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Recent Transactions
        </h3>
        <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-hide">
          {items.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {item.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.category} • {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <span className={`font-bold ${
                item.type === 'income' ? 'text-green-500' : 'text-red-500'
              }`}>
                {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
              </span>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No transactions yet. Start adding your expenses!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;