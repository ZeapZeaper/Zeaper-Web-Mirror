import Link from "next/link";

const NeedMoreHelp = () => {
  return (
    <div className="flex  justify-center items-center p-4 ">
      <p className="text-gray-500 dark:text-gray-400 text-md text-center">
        Need more help?{" "}
        <Link
          href="/contact"
          className="text-primary hover:underline font-bold"
        >
          Please Contact us
        </Link>
      </p>
    </div>
  );
};

export default NeedMoreHelp;
