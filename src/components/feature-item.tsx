import { motion } from "framer-motion";

function Feature({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: React.ElementType;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl shadow hover:shadow-md text-center"
    >
      <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full">
        <Icon className="w-8 h-8 text-cyan" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </motion.div>
  );
}

export default Feature;
