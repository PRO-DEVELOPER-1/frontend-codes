const PackageTable = () => {
  const packages = [
    { price: 30, followers: 100 },
    { price: 50, followers: 300 },
    { price: 100, followers: 700 },
    { price: 200, followers: 1200 },
    { price: 400, followers: 2000 },
    { price: 500, followers: 3500 },
    { price: 700, followers: 5000 },
    { price: 1000, followers: 8000 },
    { price: 1500, followers: 12000 },
    { price: 2000, followers: 15000 },
    { price: 3000, followers: 25000 },
    { price: 5000, followers: 50000 }
  ];

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-gray-900 border border-purple-500 rounded-lg">
        <thead>
          <tr className="text-purple-400">
            <th className="px-6 py-3 border-b border-purple-500">Price (KES)</th>
            <th className="px-6 py-3 border-b border-purple-500">Followers</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr key={index} className="hover:bg-purple-900/30 transition-colors">
              <td className="px-6 py-4 border-b border-purple-500/50 text-center">{pkg.price}</td>
              <td className="px-6 py-4 border-b border-purple-500/50 text-center">{pkg.followers.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageTable;
