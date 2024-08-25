import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQs: FAQItem[] = [
  {
    question: 'How to use our application?',
    answer: 'To use our application, simply sign up, create a project, and start collaborating with your team.',
  },
  {
    question: 'How to add a project?',
    answer: 'Click on the "Add Project" button on the dashboard, fill in the project details, and save.',
  },
  {
    question: 'How to delete a project?',
    answer: 'To delete a project, go to the project page, click on "Settings", and select "Delete Project".',
  },
  {
    question: 'How to update a project?',
    answer: 'To update a project, navigate to the project page, click on "Edit Project", make your changes, and save.',
  },
  {
    question: 'How to collaborate on a project?',
    answer: 'Invite team members by clicking "Invite" on the project page and entering their email addresses.',
  },
  {
    question: 'How to direct message (DM) someone?',
    answer: 'Go to the "Messages" section, search for the user, and start a new conversation.',
  },
];

const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">Frequently Asked Questions</h2>
      {FAQs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full text-left p-4 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-black">{faq.question}</span>
              <span className="ml-4 transform transition-transform duration-200 text-black" style={{ transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0)' }}>
                ▼
              </span>
            </div>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-40' : 'max-h-0'}`}
          >
            <p className="p-4 bg-white rounded-lg shadow-inner text-black">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
