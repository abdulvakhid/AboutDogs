import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { Profile } from "./components/Profile/Profile";
import { Register } from "./components/Register/Register";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</>
	);
}

export default App;
