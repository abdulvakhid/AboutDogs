import {
	Paper,
	Typography,
	TextField,
	InputAdornment,
	Button,
	MenuItem,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { AuthContext } from "../../context/Auth-context.js";
import { UserContext } from "../../context/User-context.js";
import { useNavigate } from "react-router-dom";

export const Register = () => {
	const [passwordType, SetPasswordType] = useState(false);

	const { setToken } = useContext(AuthContext);
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();
	const regexNumber = /^9989[012345789][0-9]{7}$/;
	const regpasword = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
	const validating = yup.object({
		name: yup.string().required("Required").min(2, "At least 2 character"),
		login: yup.string().required("Required").min(6, "At least 6 character"),
		number: yup
			.string()
			.required("Required")
			.matches(regexNumber, "Invalid number"), ///^9989[012345789][0-9]{7}$/
		email: yup.string().email("Invalid format").required("Required"),
		password: yup
			.string()
			.min(8, "At least 8 character")
			// .max(8, "not more than 8 character")
			.required("Required")
			.matches(regpasword, "At least 1 character and 1 number"),
	});

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		mode: "all",
		defaultValues: {
			login: "",
			name: "",
			number: "",
			email: "",
			password: "",
		},
		resolver: yupResolver(validating),
	});

	const onSubmit = (data) => {
		axios
			.post("http://localhost:7777/users", data)
			.then((data) => {
				console.log(data);
				if (data.status === 201) {
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
				marginTop: "10px",
				padding: "20px",
			}}>
			<Typography variant="h4" component={"h3"} textAlign="center" gutterBottom>
				Register
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2} marginBottom="20px">
					<TextField
						label="login"
						helperText={errors.login?.message}
						variant="outlined"
						{...register("login")}
					/>
					<TextField
						label="name"
						helperText={errors.name?.message}
						variant="outlined"
						{...register("name")}
					/>
					<TextField
						label="number"
						helperText={errors.number?.message}
						variant="outlined"
						placeholder="998915868598"
						{...register("number")}
					/>
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
			<Stack sx={{ display: "flex", alignItems: "center" }}>
				<Typography>
					If you have account
					<Button
						sx={{ marginLeft: "15px" }}
						type="button"
						onClick={() => navigate("")}>
						Sign in
					</Button>
				</Typography>
			</Stack>
		</Paper>
	);
};
