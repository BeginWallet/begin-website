import { motion } from 'framer-motion';

const testimonials = [
    {
      name: 'Sri Charran (Founder of Nucast.io)',
      title: 'Cardano and eSIM user',
      quote: 'Just got an eSIM using Begin Wallet for Japan 🇯🇵 Three simple clicks and purchased with ADA! Begin Wallet is leading real-world use cases definitely the best wallet out there.',
    },
    {
      name: 'Florian Volery (Co-founder of Liqwid.finance)',
      title: 'DeFi User',
      quote: 'Cardano DeFi is entering a new era of integration. Innovative wallets like @BeginWallet now let users supply stablecoins to @liqwidfinance in just one click.',
    },
    {
      name: ' Cardano Whale (@cardano_whale)',
      title: 'Bitcoin and Cardano user',
      quote: 'Cardano and Bitcoin are the perfect pairing. Every Cardano component a decentralised Lego block. Wallets as the storefront set bringing it all together',
    }
  ];
  
  const testimonialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };
  
  export default function Testimonials() {
    return (
      <section className="py-20 px-6" id="testimonials">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-10"
          >
            What Users Are Saying
          </motion.h2>
  
          <div className="space-y-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={testimonialVariants}
                className="bg-gray-50 dark:bg-[#18181b] p-6 rounded-lg shadow-sm"
              >
                <p className="text-lg italic mb-4">“{t.quote}”</p>
                <p className="text-sm font-semibold text-gray-600">
                  — {t.name}, <span className="text-gray-500">{t.title}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  