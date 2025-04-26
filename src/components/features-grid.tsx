import {
  ShieldCheck,
  Bitcoin,
  Activity,
  Star,
  Vote,
  Code2,
  Banknote,
  Smartphone,
  GitBranch,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Self-custody",
    description: "Your keys, your crypto — total control and privacy.",
  },
  {
    icon: Bitcoin,
    title: "Bitcoin + Cardano",
    description: "Manage both chains under one wallet and seed phrase.",
  },
  {
    icon: Activity,
    title: "Stake ADA",
    description: "Stake with any pool — easily and securely.",
  },
  {
    icon: Star,
    title: "dApp Ratings",
    description: "Explore apps with real user ratings stored on-chain.",
  },
  {
    icon: Vote,
    title: "Delegate to a DRep",
    description: "Participate in Cardano governance by delegating your vote.",
  },
  {
    icon: Code2,
    title: "On-chain Metadata",
    description: "Ratings are stored as metadata on the Cardano blockchain.",
  },
  {
    icon: Banknote,
    title: "Lend & Earn with Liqwid",
    description: "Earn high-yield interest by lending your ADA.",
  },
  {
    icon: Smartphone,
    title: "Mobile + Extension",
    description: "Available for iOS, Android, and Chrome Extension.",
  },
  {
    icon: GitBranch,
    title: "Open-source Code",
    description: "Transparent, auditable, and community-friendly.",
  },
];

import { motion } from "framer-motion";

const featureItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export default function FeaturesGrid() {
  return (
    <section className="px-6" id="features">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Everything You Need in One Wallet
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-500 text-lg max-w-2xl mx-auto mb-12"
        >
          Begin Wallet puts powerful crypto tools at your fingertips — no
          compromises, just crypto your way.
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={featureItemVariants}
              className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md"
            >
              <feature.icon className="w-6 h-6 text-cyan mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
