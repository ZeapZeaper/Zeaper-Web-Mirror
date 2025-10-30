"use client";

import Link from "next/link";

export default function NewShop() {
  return (
    <div className="min-h-[70vh]  flex items-center justify-center  px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-lg w-full p-8 text-center">
        {/* Header */}
        <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🎉 Thank You for Signing Up!
        </h1>

        {/* Next step */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 bg-info/5 border border-info/40 p-4 rounded-md">
          *Next Step: Upload Your Documents by clicking on the{" "}
          <span className="font-semibold">&quot;Upload Document&quot;</span>{" "}
          button below.
        </p>
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
            ⏳ To complete your verification quickly and start selling, please
            upload your documents immediately.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            * Please keep an eye on your email for subsequent communication from
            Zeaper.
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            ✅ We will activate your shop once we have reviewed the information
            you provided and the documents you uploaded. An admin will be in
            contact with you if we need any further information.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            📞 Kindly contact our team if your shop is not activated within{" "}
            <span className="font-semibold">48 hours</span> after uploading your
            documents or if you have any questions.
          </p>
        </div>

        {/* Contact button */}
        <div className="flex flex-col  gap-4 justify-center">
          <Link
            href="/upload-onboarding-documents"
            className="inline-block px-6 py-2 bg-success text-white font-semibold rounded-lg shadow hover:bg-primary/80 transition "
          >
            Upload Documents
          </Link>
          <Link
            href="/contact"
            className="inline-block px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/80 transition "
          >
            Contact Admin
          </Link>
          <Link
            href="/vendor-onboarding"
            className="inline-block px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
