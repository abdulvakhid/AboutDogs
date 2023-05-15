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
import axios from "axios";
import { AuthContext } from "../../context/Auth-context.js";
import { UserContext } from "../../context/User-context.js";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

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
		date: yup.string().required("Required"),
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
			date: "",
		},
		resolver: yupResolver(validating),
	});

	const [birthdate, setBirthdate] = useState("");
	const [isAbove18, setIsAbove18] = useState(false);

	const handleInputChange = (event) => {
		setBirthdate(event.target.value);
	};
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

		const today = new Date();
		const birthdateObj = new Date(birthdate);
		console.log(birthdate);
		
		const age = today.getFullYear() - birthdateObj.getFullYear();
			console.log(age);
		// Check if the calculated age is above 18
		if(age >=0){
		alert('Age must be above ')
		}
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
						placeholder="login"
						{...register("login")}
					/>
					<TextField
						label="name"
						helperText={errors.name?.message}
						variant="outlined"
						placeholder="John"
						{...register("name")}
					/>
					<TextField
						label="number"
						helperText={errors.number?.message}
						variant="outlined"
						placeholder="998901234567"
						{...register("number")}
					/>
					<TextField
						type="email"
						label="Email"
						helperText={errors.email?.message}
						variant="outlined"
						placeholder="example@example.com"
						{...register("email")}
					/>
					<TextField
						type={passwordType ? "text" : "password"}
						label="Password"
						helperText={errors.password?.message}
						variant="outlined"
						placeholder="password123"
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
					<TextField
						type="date"
						helperText={errors.date?.message}
						variant="outlined"
						placeholder="00.00.0000"
						defaultValue={birthdate}
						onChange={handleInputChange}
						{...register("date")}
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
						onClick={() => navigate("/login")}>
						Sign in
					</Button>
				</Typography>
			</Stack>
		</Paper>
	);
};
