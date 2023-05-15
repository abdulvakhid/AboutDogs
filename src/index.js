import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth-context";
import { UserProvider } from "./context/User-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<AuthProvider>
			<UserProvider>
				{/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
					{/* <React.StrictMode> */}
					<App />
					{/* </React.StrictMode> */}
				{/* </LocalizationProvider> */}
			</UserProvider>
		</AuthProvider>
	</BrowserRouter>,
);
