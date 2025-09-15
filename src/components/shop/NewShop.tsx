"use client";

import Link from "next/link";

export default function NewShop() {
  return (
    <div className="min-h-[70vh]  flex items-center justify-center  px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-lg w-full p-8 text-center">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🎉 Thank You for Signing Up!
        </h1>

        {/* Welcome message */}
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Welcome to <span className="font-semibold text-primary">Zeaper</span>.
          Your shop has been successfully created and your account is now{" "}
          <span className="font-semibold">under review</span>.
        </p>

        {/* Account status */}
        <div className="bg-yellow-50 dark:bg-yellow-900/40 border border-yellow-300 dark:border-yellow-700 rounded-md p-4 mb-6">
          <p className="text-yellow-800 dark:text-yellow-200 font-medium">
            🔒 During this period, your account will remain disabled until
            verification is complete.
          </p>
        </div>

        {/* Next steps */}
        <div className="text-left space-y-3 mb-6">
          <p className="text-gray-700 dark:text-gray-300">
            ✅ An admin will contact you shortly to complete the verification
            process.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            ⏳ To get verified quickly and start selling, please respond to admin requests promptly.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            📞 Kindly contact our team if you do not hear from us after{" "}
            <span className="font-semibold">48 hours</span> or if you have any
            questions.
          </p>
        </div>

        {/* Contact button */}
        <Link
          href="/contact"
          className="inline-block px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/80 transition"
        >
          Contact Admin
        </Link>
      </div>
    </div>
  );
}
