import FAQ from '../components/Faq';

const SupportPage: React.FC = () => {
  return (
    <div>
      <header className="bg-indigo-600 text-white py-6 text-center">
        <h1 className="text-4xl font-bold">Support</h1>
      </header>
      <main className="py-10">
        <FAQ />
      </main>
    </div>
  );
};

export default SupportPage;
