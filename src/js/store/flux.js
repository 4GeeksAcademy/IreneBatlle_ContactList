

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			listContacts: [] //esto srive para crear datos a partir de la API
		},
		actions: {
			// crear usuario
			createUser: () => {
				fetch('https://playground.4geeks.com/contact/agendas/irene_batlle', {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ agenda_name: "irene_batlle" })
				})
				.then((response) => response.json())
				.then((data) => {
					console.log("Usuario creado:", data);
				})
				.catch((error) => console.log(error));
			},
			
			getInfoContacts: () => {
				fetch('https://playground.4geeks.com/contact/agendas/irene_batlle/contacts', {
					method: "GET"
				})
				.then((response) => {
					if (response.status === 404) {
						console.log("Agenda no encontrada. Creando nueva...");
						getActions().createUser();
						return null;
					}
					if (response.ok) {
						return response.json(); 
					} else {
						throw new Error("Error al obtener los contactos");
					}
				})
				.then((data) => {
					if (data && Array.isArray(data)) {
						setStore({ listContacts: data });
					}
				})
				.catch((error) => console.log(error));
			},
			
			

			addContactToList: (contact) =>{
				const store = getStore();
				setStore({...store, listContacts:[...store.listContacts, contact]})
			}, 



			createContact: (contact) => {

				if (!contact.name || !contact.email || !contact.phone || !contact.address) {
					console.log("Todos los campos son necesarios.");
					return; 
				}
			
				fetch('https://playground.4geeks.com/contact/agendas/irene_batlle/contacts', {
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						full_name: contact.name,
						email: contact.email,
						phone: contact.phone,
						address: contact.address,
					}),
				})
				.then((response) => {
					if (response.ok) {
						return response.json(); 
					} else {
						throw new Error("No se pudo crear el contacto. Código de error: " + response.status);
					}
				})
				.then((data) => {
					const actions = getActions();
					actions.addContactToList(data); 
					console.log("Contacto añadido", data);
				})
				.catch((error) => {
					console.log("Error al crear el contacto:", error); 
				});
			},
			
			
			
			deleteContact: (id) => {
				fetch(`https://playground.4geeks.com/contact/agendas/irene_batlle/contacts/${id}`, {
					method: "DELETE",
				})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`El contacto con ID ${id} no pudo ser eliminado`);
					}
					const store = getStore();
					const updatedContacts = store.listContacts.filter(contact => contact.id !== id);
					setStore({ listContacts: updatedContacts });
					console.log(`El contacto ${id} ha sido eliminado`);
				})
				.catch((error) => console.log(error));
			},
			

			editContact: (id, contact) => {
				if (!id || !contact) {
					console.error("Faltan datos para editar el contacto");
					return;
				}
			
				fetch(`https://playground.4geeks.com/contact/agendas/irene_batlle/contacts/${id}`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(contact),
				})
				.then((response) => {
					if (!response.ok) {
						throw new Error("No se pudo editar el contacto");
					}
					return response.json();
				})
				.then((data) => {
					if (data) {
						const store = getStore();
						const updatedList = store.listContacts.map(existingContact =>
							existingContact.id === id ? data : existingContact
						);
						setStore({ listContacts: updatedList });
						console.log("Contacto editado:", data);
					}
				})
				.catch((error) => console.log(error));
			},
			

		}
	};
};

export default getState;
