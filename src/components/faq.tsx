import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is Begin Wallet self-custodial?',
    answer: 'Yes! Your private keys never leave your device. You’re always in full control of your funds.',
  },
  {
    question: 'Can I manage both Bitcoin and Cardano?',
    answer: 'Absolutely. Begin supports both chains under a single recovery phrase and UI.',
  },
  {
    question: 'How do I delegate to a DRep?',
    answer: 'Open the Governance tab, select a DRep, and confirm your delegation — it takes just a few clicks.',
  },
  {
    question: 'Where do dApp ratings come from?',
    answer: 'The list of dApps is provided by Cardano Cube. Ratings are stored on-chain as metadata and reflect real user input.',
  },
  {
    question: 'Is the wallet open-source?',
    answer: 'Yes — the entire core of Begin is open-source. Developers and users can audit the code anytime.',
  },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    const faqVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.4 },
      }),
    };
  
    const toggleFAQ = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <section className="py-20 px-6" id="faq">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-10"
          >
            Frequently Asked Questions
          </motion.h2>
  
          <div className="space-y-6 text-left">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={faqVariants}
                className="rounded-xl shadow p-5 bg-gray-50 dark:bg-[#18181b]"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex items-center justify-between text-left text-lg font-medium"
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`mt-3 text-lg text-gray-500 transition-all duration-300 overflow-hidden ${
                    openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  