import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";

export default function APPRouters() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
        </Routes>
    )
}