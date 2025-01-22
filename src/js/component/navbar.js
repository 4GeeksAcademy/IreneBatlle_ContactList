import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="container-fluid">
				<div className="d-flex justify-content-end">
					<Link to="/demo">
						<button className="btn btn-primary me-2">Añadir contacto</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
