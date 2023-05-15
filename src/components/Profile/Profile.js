import { Box, Button, Container, Grid, ListItem } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User-context";

export const Profile = () => {
	const back = useNavigate();
	const { user } = useContext(UserContext);

	return (
		<Container maxWidth="xl">
			<Box sx={{}}>
				<Button sx={{ color: "#000", fontSize:"24px" }} onClick={() => back(-1)}>
					Back
				</Button>



				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={12}>
						<ListItem
							sx={{
								mt: "15px",
								textAlign: "center",
								color: "#132F4C",
								fontSize: "24px",
							}}>
							<Box sx={{ color: "#F5F5F5", mr: "10px" }}>Name:</Box> {user.name}
						</ListItem>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<ListItem
							sx={{
								mt: "15px",
								textAlign: "center",
								color: "#132F4C",
								fontSize: "24px",
							}}>
							<Box sx={{ color: "#F5F5F5", mr: "10px" }}>Login:</Box>{" "}
							{user.login}
						</ListItem>
					</Grid>
					<Grid item xs={10} sm={12} md={12}>
						<ListItem
							sx={{
								mt: "15px",
								textAlign: "center",
								color: "#132F4C",
								fontSize: "24px",
							}}>
							<Box xs sx={{ color: "#F5F5F5", mr: "10px" }}>Email:</Box>{" "}
							{user.email}
						</ListItem>
					</Grid>
					<Grid item xs={10} sm={6} md={8}>
						<ListItem
							sx={{
								mt: "15px",
								textAlign: "center",
								color: "#132F4C",
								fontSize: "24px",
							}}>
							<Box sx={{ color: "#F5F5F5", mr: "10px" }}>Number:</Box>{" "}
							{user.number}
						</ListItem>
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<ListItem
							sx={{
								mt: "15px",
								textAlign: "center",
								color: "#132F4C",
								fontSize: "24px",
							}}>
							<Box sx={{ color: "#F5F5F5", mr: "10px" }}>Birtday:</Box> {user.date}
						</ListItem>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};
