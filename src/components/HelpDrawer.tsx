import { XIcon } from './icons';

interface HelpDrawerProps {
  onClose: () => void;
}

const faqs = [
  {
    question: 'What does Change History track?',
    answer: 'Every change made to your campaigns, ad groups, ads, keywords, and negative keywords, along with who made it and when.',
  },
  {
    question: 'What\'s the difference between Independent, Dependent, and New level filters?',
    answer: 'Independent filters let you filter by Campaign, Ad Group, and Entity type on their own. Dependent filters cascade from App to Campaign to Ad Group. New level filters work like Independent filters but with extra Storefront and Status controls.',
  },
  {
    question: 'Can I export the change history?',
    answer: 'Yes, use the download icon on any row to export its details.',
  },
];

export default function HelpDrawer({ onClose }: HelpDrawerProps) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Help</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Frequently asked questions</h3>
            <div className="space-y-4">
              {faqs.map(faq => (
                <div key={faq.question}>
                  <div className="text-sm font-medium text-gray-800">{faq.question}</div>
                  <div className="text-sm text-gray-500 mt-1">{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Need more help?</h3>
            <p className="text-sm text-gray-500">
              Reach out to your MobileAction account manager or email support@mobileaction.co.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
