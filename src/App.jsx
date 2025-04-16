import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";


function App() {
  const { pathname } = useLocation();

  return (
    <>
      {/* Navbar with white text for all pages */}
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4 text-white">
        <Navbar routes={routes} />
      </div>
  
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
  
}

export default App;
