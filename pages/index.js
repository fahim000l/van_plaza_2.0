// import Main from "@/layouts/Main";
import HomeBanner from "@/components/home_banner";
import HomeCategories from "@/components/home_categories";
import dynamic from "next/dynamic";
const Main = dynamic(() =>
  import("@/layouts/Main", {
    ssr: false,
  })
);

export default function Home() {
  return (
    <Main>
      <HomeBanner />
      <div className="lg:mx-20 my-10">
        <HomeCategories />
      </div>
    </Main>
  );
}
