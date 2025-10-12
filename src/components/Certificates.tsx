'use client';

import { motion } from 'framer-motion';

export default function Certificates() {
  return (
    <section id="certificates" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Certificates
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Professional certifications coming soon
          </p>
        </motion.div>
      </div>
    </section>
  );
}
