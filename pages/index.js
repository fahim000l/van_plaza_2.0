// import Main from "@/layouts/Main";
import HomeBanner from "@/components/home_banner";
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
    </Main>
  );
}
