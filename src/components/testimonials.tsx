import { motion } from 'framer-motion';

const testimonials = [
    {
      name: 'Alex M.',
      title: 'ADA Staker',
      quote: 'Begin is the first wallet that actually makes governance simple. I love how I can delegate to a DRep and still explore new dApps all in one place.',
    },
    {
      name: 'Sophia R.',
      title: 'Bitcoin Holder',
      quote: 'Having both Bitcoin and Cardano under the same seed is genius. The wallet is smooth, fast, and I trust it more than any other.',
    },
    {
      name: 'Daniel T.',
      title: 'DeFi User',
      quote: 'I staked, I lent ADA with Liqwid, and I rated dApps — all within 10 minutes. Begin Wallet is the best UX in crypto right now.',
    },
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
                <p className="text-sm font-semibold text-gray-200">
                  — {t.name}, <span className="text-gray-500">{t.title}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  