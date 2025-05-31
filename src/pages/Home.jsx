import Header from '../components/Header';
import PackageTable from '../components/PackageTable';
import OrderForm from '../components/OrderForm';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-purple-400">
            Buy Real Followers for Any Platform
          </h1>
          <p className="text-xl text-gray-300">
            Pay via M-Pesa, no signup needed!
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PackageTable />
          </div>
          <div>
            <OrderForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
