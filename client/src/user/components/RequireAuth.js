// import { Navigate, Outlet, useLocation } from "react-router";
// import { useGetMeQuery } from "../../store/apiSlice";

// export default function RequireAuth() {
//   const location = useLocation();
//   const { data, isLoading, isFetching, isError } = useGetMeQuery();

//   if (isLoading || isFetching) return null;

//   if (isError || !data?.user) {
//     return <Navigate to="/auth" replace state={{ from: location }} />;
//   }

//   return <Outlet />;
// }
