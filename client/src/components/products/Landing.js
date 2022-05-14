import Items from "./Items";
import Nav from "../header-footer/Nav";
const Landing = () => {
  return (
    <div className=''>
      <Nav />
      <div className='div-dog'>
        <img src={require("../../assets/dog.png")} className='img-dog' />
      </div>
      <hr />
      <Items />
    </div>
  );
};

export default Landing;
