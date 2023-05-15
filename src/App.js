import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Main } from "./components/Main/Main";
import { Profile } from "./components/Profile/Profile";
import { Register } from "./components/Register/Register";
function App() {
	// const navigate = useNavigate();
	// const token = localStorage.getItem("token");
	// if (!token) {
	// 	navigate("/register");
	// }

	return (
		<>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</>
	);
}

export default App;
