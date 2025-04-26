import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  Globe,
  Music,
  ShieldCheck,
  Rocket,
} from "lucide-react";

export default function FeaturesExtra() {
  return (
    <section id="manage-crypto" className="px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Everything You Can Do With Begin
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md"
        >
          <Wallet className="h-12 w-12 text-primary mb-6 text-cyan" />
          <h3 className="text-2xl font-semibold mb-4">
            Manage Your Crypto Seamlessly
          </h3>
          <p className="text-gray-500 mb-4">
            Stay in full control with one wallet for BTC and ADA.
          </p>
          <ul className="list-disc list-inside text-gray-500 space-y-2">
            <li>Simple, secure, and intuitive management</li>
            <li>Clear overview of all your assets</li>
            <li>
              <span className="italic">Coming soon:</span> Midnight Network
              support
            </li>
          </ul>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md"
        >
          <TrendingUp className="h-12 w-12 text-primary mb-6 text-cyan" />
          <h3 className="text-2xl font-semibold mb-4">
            Invest Smartly with Begin
          </h3>
          <p className="text-gray-500 mb-4">
            Unlock powerful investment opportunities.
          </p>
          <ul className="list-disc list-inside text-gray-500 space-y-2">
            <li>Over 20% APY with Liqwid lending</li>
            <li>Buy/sell gold via pro aurum</li>
            <li>Stake ADA for up to 3% returns</li>
          </ul>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md"
        >
          <Globe className="h-12 w-12 text-primary mb-6 text-cyan" />
          <h3 className="text-2xl font-semibold mb-4">
            Travel Effortlessly with Crypto
          </h3>
          <p className="text-gray-500 mb-4">
            Use rewards to explore the world.
          </p>
          <ul className="list-disc list-inside text-gray-500 space-y-2">
            <li>Book flights, hotels, tours</li>
            <li>Unlimited mobile data with eSIM</li>
            <li>Pay with ADA rewards</li>
          </ul>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md"
        >
          <Music className="h-12 w-12 text-primary mb-6 text-cyan" />
          <h3 className="text-2xl font-semibold mb-4">
            Entertainment at Your Fingertips
          </h3>
          <p className="text-gray-500 mb-4">
            Enjoy music, games, collectibles, and more.
          </p>
          <ul className="list-disc list-inside text-gray-500 space-y-2">
            <li>Play games, listen to music</li>
            <li>Watch videos, store collectibles</li>
            <li>Read books and news</li>
          </ul>
        </motion.div>

        {/* Card 5 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md"
        >
          <ShieldCheck className="h-12 w-12 text-primary mb-6 text-cyan" />
          <h3 className="text-2xl font-semibold mb-4">
            Security and Trust at the Core
          </h3>
          <p className="text-gray-500 mb-4">
            Your peace of mind is our top priority.
          </p>
          <ul className="list-disc list-inside text-gray-500 space-y-2">
            <li>With open-source core platform</li>
            <li>Audited by OpenWallet Foundation</li>
            <li>Self-custody: full privacy and control</li>
          </ul>
        </motion.div>

        {/* Card 6 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md"
        >
          <Rocket className="h-12 w-12 text-primary mb-6 text-cyan" />
          <h3 className="text-2xl font-semibold mb-4">
            Become Part of the Future of Crypto
          </h3>
          <p className="text-gray-500 mb-4">
            Shape the decentralized world with Begin.
          </p>
          <ul className="list-disc list-inside text-gray-500 space-y-2">
            <li>Delegate ADA to a DRep</li>
            <li>Stake for up to 3% APY</li>
            <li>Explore and rate dApps</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
