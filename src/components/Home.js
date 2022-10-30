import "./Home.css";

const Home = (props) => {
  const {user} = props  
  return (
    <div id="homeContent">
      <h1>FitnessTrac.kr Home</h1>
      {user && <h2>Welcome {user.username}!</h2>}
      {/* <img src="https://img.bleacherreport.net/img/images/photos/002/318/574/macho-man-randy-savage-1_crop_north.jpg?1369071720&w=3072&h=2048" /> */}
    </div>
  );
};

export default Home;
