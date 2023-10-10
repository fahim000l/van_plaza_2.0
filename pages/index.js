// import Main from "@/layouts/Main";
import HomeBanner from "@/components/home_banner";
import HomeCategories from "@/components/home_categories";
import HomeFav from "@/components/home_fav";
import { AUTH_CONTEXT } from "@/contexts/AuthProvider";
import dynamic from "next/dynamic";
import { useContext } from "react";
const Main = dynamic(() =>
  import("@/layouts/Main", {
    ssr: false,
  })
);

export default function Home() {
  const { authUser } = useContext(AUTH_CONTEXT);
  return (
    <Main>
      <HomeBanner />
      <div className="lg:mx-20 my-10">
        <HomeCategories />
      </div>
      {authUser?.ops?.length > 0 && <HomeFav />}
    </Main>
  );
}
