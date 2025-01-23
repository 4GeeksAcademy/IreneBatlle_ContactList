import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css"; 

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light custom-navbar">
			<div className="container-fluid d-flex justify-content-center align-items-center">
				<h1 className="text-center">Agenda de contactos</h1>
			</div>
		</nav>
	);
};
