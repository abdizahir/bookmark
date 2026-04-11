import Card from "../components/Card";
import Header from "../components/Header";
import Sort from "../components/Sort";

const Home = () => {

  return (
    <>
      <Header />
      <Sort text={'All bookmarks'} />
      <Card />
      {/* <ArchiveCard /> */}
    </>
  );
};

export default Home;
