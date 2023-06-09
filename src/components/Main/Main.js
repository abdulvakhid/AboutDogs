import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import {
	Container,
	ImageList,
	ImageListItem,
	Typography,
} from "@mui/material";
import axios from "axios";
export const Main = () => {
	const navigate = useNavigate();
	const [dog, Setdog] = React.useState([]);

	const token = localStorage.getItem("token");
	if (!token) {
		navigate("/register");
	}

	React.useEffect(() => {
		axios
			.get("https://dog.ceo/api/breed/hound/images")
			.then((res) => {
				Setdog(res.data.message);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<Header />
			<Container maxWidth="xl">
				<Typography
					sx={{
						fontSize: "24px",
						mb: "25px",
						textAlignLast: "center",
						mt: "15px",
					}}>
					Dogs
				</Typography>
				<ImageList sx={{ width:"90%", heigth:"90%", mx:"auto"  }} cols={3}   gap={8}>
					{dog.map((item) => (
						<ImageListItem key={item}>
							<img 
								src={`${item}?w=164&h=164&fit=crop&auto=format`}
								alt="lazy"
							/>
						</ImageListItem>
					))}
				</ImageList>
			</Container>
		</>
	);
};
