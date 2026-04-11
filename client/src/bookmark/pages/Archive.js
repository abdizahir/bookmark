import ArchiveCard from "../components/ArchiveCard";
import Header from "../components/Header";
import Sort from "../components/Sort";


const Archive = () => {
    return(
        <>
            <Header />
            <Sort text={'Archived bookmarks'} />
            <ArchiveCard />
        </>
    );
}

export default Archive;