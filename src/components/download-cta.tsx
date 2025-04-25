import { motion } from 'framer-motion';
import { SiApple, SiGooglechrome, SiAndroid } from '@icons-pack/react-simple-icons';

export default function DownloadCTA() {
  return (
    <section className="bg-cyan text-black py-20 px-6" id="download">
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
            href="https://apps.apple.com/app/begin-wallet"
            className="flex items-center gap-2 bg-black text-cyan font-semibold px-5 py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            <SiApple fr={''} className="w-5 h-5" />
            Download on iOS
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=wallet.begin"
            className="flex items-center gap-2 bg-black text-cyan font-semibold px-5 py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            <SiAndroid fr={''} className="w-5 h-5" />
            Download on Android
          </a>
          <a
            href="https://chrome.google.com/webstore/detail/begin-wallet/..."
            className="flex items-center gap-2 bg-black text-cyan font-semibold px-5 py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            <SiGooglechrome fr={''} className="w-5 h-5" />
            Add to Chrome
          </a>
        </div>
      </motion.div>
    </section>
  );
}
