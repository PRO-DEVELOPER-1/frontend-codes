import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin/login');
          return;
        }
        
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data.orders);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching orders');
        if (err.response?.status === 401) {
          navigate('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/order/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status } : order
      ));
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating order status');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-purple-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-purple-400">Orders Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/admin/login');
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-900/50 text-red-200 rounded-md text-center">
            {error}
          </div>
        )}
        
        <div className="overflow-x-auto bg-gray-800 rounded-lg border border-gray-700">
          <table className="min-w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase">Package</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map(order => (
                <tr key={order._id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{order.platform}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{order.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{order.package}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Completed' ? 'bg-green-900 text-green-200' :
                      order.status === 'In Progress' ? 'bg-yellow-900 text-yellow-200' :
                      'bg-gray-700 text-gray-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200 space-x-2">
                    {order.status !== 'Completed' && (
                      <button
                        onClick={() => updateOrderStatus(order._id, 'Completed')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs"
                      >
                        Complete
                      </button>
                    )}
                    {order.status !== 'In Progress' && (
                      <button
                        onClick={() => updateOrderStatus(order._id, 'In Progress')}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md text-xs"
                      >
                        In Progress
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
