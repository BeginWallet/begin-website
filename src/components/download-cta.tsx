import { motion } from 'framer-motion';
import { FaChrome as Chrome } from "react-icons/fa";
import { FaGooglePlay as Android } from "react-icons/fa";
import { FaApple as Apple } from "react-icons/fa";

export default function DownloadCTA() {
  return (
    <section className="bg-cyan-light dark:bg-cyan-dark dark:text-black py-20 px-6" id="download">
      <motion.div
        id="get-started"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Get Started with Begin Wallet
        </h2>
        <p className="text-lg mb-8">
          Begin is available on iOS, Android, and as a browser extension. Self-custodial, open-source, and ready for everything Cardano and Bitcoin.
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <a
            target='_blank'
            rel="noopener noreferrer"
            href="https://apps.apple.com/app/begin-bitcoin-cardano-wallet/id1642488837"
            className="inline-flex items-center justify-center w-full lg:w-auto gap-2 bg-black text-cyan-light dark:text-cyan-dark font-semibold px-5 py-3 rounded-full shadow hover:shadow-lg transition"
          >
            <Apple className="w-5 h-5" />
            Download on iOS
          </a>
          <a
            target='_blank'
            rel="noopener noreferrer"
            href="https://play.google.com/store/apps/details?id=is.begin.app"
            className="inline-flex items-center justify-center w-full lg:w-auto gap-2 bg-black text-cyan-light dark:text-cyan-dark font-semibold px-5 py-3 rounded-full shadow hover:shadow-lg transition"
          >
            <Android className="w-5 h-5" />
            Download on Android
          </a>
          <a
            target='_blank'
            rel="noopener noreferrer"
            href="https://chromewebstore.google.com/detail/begin-bitcoin-cardano-wal/nhbicdelgedinnbcidconlnfeionhbml"
            className="inline-flex items-center justify-center w-full lg:w-auto gap-2 bg-black text-cyan-light dark:text-cyan-dark font-semibold px-5 py-3 rounded-full shadow hover:shadow-lg transition"
          >
            <Chrome className="w-5 h-5" />
            Add to Chrome
          </a>
        </div>
      </motion.div>
    </section>
  );
}
