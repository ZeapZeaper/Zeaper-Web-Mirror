"use client";

import { FaExclamationCircle } from "react-icons/fa";
import { Alert } from "flowbite-react";

interface RejectionReasonDisplayProps {
  reasons: string[];
  title?: string;
}

const RejectionReasonDisplay = ({
  reasons,
  title = "Product Rejected",
}: RejectionReasonDisplayProps) => {
  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl shadow-sm p-5 my-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <FaExclamationCircle className="text-red-600 w-5 h-5" />
        <h3 className="text-red-700 font-semibold text-lg">{title}</h3>
      </div>

      {/* Summary Text */}
      <p className="text-gray-700 text-sm mb-3">
        Unfortunately, your product did not meet all of the required guidelines
        Please review the reasons below and make necessary corrections before
        resubmitting
      </p>
      <p className="text-gray-700 text-sm mb-3">
        Once you have addressed the {reasons.length === 1 ? "issue" : "issues"},
        you can resubmit your product again for review.
      </p>

      {/* List of Reasons */}
      <div className="flex flex-col gap-2">
        {reasons.map((reason, idx) => (
          <Alert
            key={idx}
            color="failure"
            className="text-sm bg-red-100 border border-red-200 rounded-lg"
          >
            <div className="flex items-start gap-2">
              <FaExclamationCircle className="text-red-600 mt-0.5 w-4 h-4" />
              <span className="text-gray-800">{reason}</span>
            </div>
          </Alert>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 text-sm text-gray-600 border-t border-gray-200 pt-3">
        💡 Once you’ve addressed these issues, you can resubmit your product for
        review. Our team will recheck it promptly.
      </div>
    </div>
  );
};

export default RejectionReasonDisplay;
