import SectionCategory from "./_home/SectionCategory";
import SectionHeader from "./_home/SectionHearder2";
// import SectionHeader from "./_home/SectionHeader";
import SectionProducts from "./_home/SectionProducts";
import SectionSecond from "./_home/SectionSecond";
import SectionStyle from "./_home/SectionStyle";

const HomePage = () => {
  return (
    <>
      <div className="">
        {/* <SectionHeader /> */}
        <SectionHeader />
      </div>
      <div className="py-10">
        <SectionCategory />
      </div>

      <div>
        <SectionSecond />
      </div>

      <div className="py-24">
        <SectionProducts />
      </div>

      <div className="pb-24">
        <SectionStyle />
      </div>
    </>
  );
};

export default HomePage;
