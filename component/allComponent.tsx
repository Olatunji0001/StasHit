import About from "./about";
import Banner from "./banner";
import Bottom from "./bottom";
import Dashboard from "./data";
import Footer from "./footer";
import Work from "./howItWorks";
import Navbar from "./navbar";

export default function All() {
  return (
    <div>
      <Navbar />
      <Banner />
      <About/>
      <Work/>
      <Bottom/>
      <Footer/>
    </div>
  );
}
