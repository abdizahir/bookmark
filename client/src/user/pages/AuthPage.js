import { Outlet } from "react-router";


const AUthPage = () => {
    return (
        <section className="flex items-center justify-center min-h-screen">
            <Outlet />
        </section>
    );
}

export default AUthPage;