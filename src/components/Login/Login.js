import {
	Paper,
	Typography,
	TextField,
	InputAdornment,
	Button,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useNavigate} from "react-router-dom"
 import axios from "axios";
import { AuthContext } from "../../context/Auth-context";
import { UserContext } from "../../context/User-context";


export const Login = () => {
	const [passwordType, SetPasswordType] = useState(false);
	const navigate = useNavigate();
	const {setToken} = useContext(AuthContext);
	const {setUser} = useContext(UserContext);

	const validating = yup.object({
		email: yup.string().email("Invalid format").required("Required"),
		password: yup
			.string()
			.min(8, "At least 8 character")
			.required("Required")
	});

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		mode: "All",
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(validating),
	});

	const onSubmit = (data) => {
		axios
		.post("http://localhost:7777/login", data)
		.then((data) => {
			console.log(data);
			if (data.status === 200) {
				console.log(data);
				setToken(data.data.accessToken);
				setUser(data.data.user);
				navigate("/");
			}
		})
		.catch((error) => console.log(error));
	};

	return (
		<Paper
			sx={{
				width: "50%",
				marginX: "auto",
				marginTop: "50px",
				padding: "20px",
			}}>
			<Typography variant="h3" component={"h2"} textAlign="center" gutterBottom>
				Login
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2} marginBottom="20px">
				<TextField
						type="email"
						label="Email"
						helperText={errors.email?.message}
						variant="outlined"
						{...register("email")}
					/>
					<TextField
						type={passwordType ? "text" : "password"}
						label="Password"
						helperText={errors.password?.message}
						variant="outlined"
						{...register("password")}
						InputProps={{
							endAdornment: (
								<InputAdornment
									onClick={() => SetPasswordType(!passwordType)}
									position="end">
									<VisibilityIcon cursor="pointer" />
								</InputAdornment>
							),
						}}
					/>
				</Stack>
				<Button disabled={!isValid} type="submit" variant="contained">
					Submit
				</Button>
			</form>
			<Stack sx={{display:"flex", alignItems:"center", }}>
				<Typography>
					If you have not account
					<Button
						sx={{ marginLeft: "15px" }}
						type="button"
						onClick={() => navigate("/register")}>
						Sign up
					</Button>
				</Typography>
			</Stack>
		</Paper>
	);
};
