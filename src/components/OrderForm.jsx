import { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    platform: 'Instagram',
    username: '',
    mpesaMessage: '',
    package: '30 KES - 100 Followers',
    contact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const packages = [
    '30 KES - 100 Followers',
    '50 KES - 300 Followers',
    '100 KES - 700 Followers',
    '200 KES - 1,200 Followers',
    '400 KES - 2,000 Followers',
    '500 KES - 3,500 Followers',
    '700 KES - 5,000 Followers',
    '1,000 KES - 8,000 Followers',
    '1,500 KES - 12,000 Followers',
    '2,000 KES - 15,000 Followers',
    '3,000 KES - 25,000 Followers',
    '5,000 KES - 50,000 Followers'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/order`, formData);
      setIsSuccess(true);
      setFormData({
        platform: 'Instagram',
        username: '',
        mpesaMessage: '',
        package: '30 KES - 100 Followers',
        contact: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-900/30 border border-green-500 p-6 rounded-lg text-center">
        <h3 className="text-2xl font-bold text-green-400 mb-2">Order Received!</h3>
        <p className="text-green-200">
          Your order has been submitted successfully. We'll process it as soon as we verify your M-Pesa payment.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Place Another Order
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900/50 border border-purple-500 p-6 rounded-lg">
      <h3 className="text-2xl font-bold text-purple-400 mb-6">Place Your Order</h3>
      
      {error && (
        <div className="mb-4 p-2 bg-red-900/50 text-red-200 rounded-md text-center">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-purple-200 mb-2">Platform</label>
        <select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-purple-500 rounded-md p-2 text-white"
          required
        >
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="X/Twitter">X/Twitter</option>
          <option value="TikTok">TikTok</option>
          <option value="YouTube">YouTube</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-purple-200 mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-purple-500 rounded-md p-2 text-white"
          placeholder="e.g., @username"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-purple-200 mb-2">M-Pesa Confirmation Message</label>
        <textarea
          name="mpesaMessage"
          value={formData.mpesaMessage}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-purple-500 rounded-md p-2 text-white min-h-[100px]"
          placeholder="Paste the full M-Pesa confirmation message here"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-purple-200 mb-2">Package</label>
        <select
          name="package"
          value={formData.package}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-purple-500 rounded-md p-2 text-white"
          required
        >
          {packages.map((pkg, index) => (
            <option key={index} value={pkg}>{pkg}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-purple-200 mb-2">Email or Phone (optional)</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-purple-500 rounded-md p-2 text-white"
          placeholder="For order updates (optional)"
        />
      </div>
      
      <div className="bg-purple-900/30 border border-purple-500 p-4 rounded-md mb-6">
        <p className="text-purple-200">
          <strong>Important:</strong> Send your selected amount to M-Pesa number <strong>0743982206</strong> before placing your order.
        </p>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-md font-bold transition-colors ${isSubmitting ? 'bg-purple-800 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
      >
        {isSubmitting ? 'Processing...' : 'Submit Order'}
      </button>
    </form>
  );
};

export default OrderForm;
