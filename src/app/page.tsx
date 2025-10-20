// import SectionCategory from "./_home/SectionCategory";
// import SectionHeader from "./_home/SectionHeader";
// import SectionProducts from "./_home/SectionProducts";
// import SectionSecond from "./_home/SectionSecond";
// import SectionStyle from "./_home/SectionStyle";

//import ComingSoon2 from "./ComingSoon2";
import ComingSoon from "./CommingSoon";
import HomePage from "./HomePage";

const page = () => {
  const isVendorOnboarding =
    process.env.NEXT_PUBLIC_VENDOR_ONBOARDING === "true";
  if (isVendorOnboarding) {
    return (
      <>
        <ComingSoon />
      </>
    );
  }
  return (
    <>
      <HomePage />
    </>
  );
};

export default page;
