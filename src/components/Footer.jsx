const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-purple-500 mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Bera Tech. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Contact: support@beratech.com | 0743982206
        </p>
      </div>
    </footer>
  );
};

export default Footer;
