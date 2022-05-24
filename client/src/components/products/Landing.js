import Items from "./Items";
import Nav from "../header-footer/Nav";
import Footer from "../header-footer/Footer";
const Landing = () => {
  return (
    <div className=''>
      <Nav />
      <div className='div-dog'>
        <img src={require("../../assets/dog.png")} className='img-dog' />
      </div>
      <hr />
      <Items />
      <Footer />
    </div>
  );
};

export default Landing;
