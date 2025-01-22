const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			listContacts: [] //esto srive para crear datos a partir de la API
		},
		actions: {
			// crear usuario
            createUser: () => {
                fetch("https://playground.4geeks.com/contact/agendas/irene_batlle/", {
                    method: "POST",

                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);

                    })
                    .catch((error) => console.log(error));
			},

			getInfoContacts: () => {//recibir la información de los contactos
				fetch("https://playground.4geeks.com/contact/agendas/irene_batlle/contacts", {
					method: "GET"})
					.then ((response)=>{
					if (response.status==404){
						getActions().createUser()
					}
					if(response.ok){
						return response.json()
					}
					})
                    .then((data) => {
                        if (data) {
                            setStore({ listContacts: data.contacts })
                        }
                    }) // store is an object, and I want to target the contacts state and assign it the value of data.contacts
                    .catch((error => console.log(error)))
            },

			addContactToList: (contact) =>{
				const store = getStore();
				setStore({...store, listContacts:[...store.listContacts, contact]})
			}, 

			createContact: (payload) =>{
				fetch ("https://playground.4geeks.com/contact/agendas/irene_batlle/contacts", {
					method: "POST", 
					headers:{
						'Content-Type':'application/json'
					}, 
					body: JSON.stringify(
						payload
					),
				})
				.then((response)=>response.json())
				.then((data)=>{
					console.log(data);
					const actions = getActions();
					actions.addContactToList(data);
					console.log("Contacto añadido", data);
				})
				.catch((error)=>console.log(error));
			}, 
			
			deleteCOntact: (id)=>{
				fetch(`https://playground.4geeks.com/contact/agendas/irene_batlle/contacts/${id}`, {
					method: "DELETE",
				})
				.then((response)=>{
					console.log(response)
					if(response.ok){
						const store = getStore();
						const updatedContacts=store.listContacts.filter(contact=>contact.id!==id);
						setStore({listContacts: updatedContacts});
						console.log(`El contacto ${id} se ha eliminado`);
					}else{
						console.log(`El contacto ${id} no se ha podido eliminar`)
					}
				})
				.catch((error)=>console.log(error));
			},

			editContact: (id, contact)=>{
				const store = getStore()
				fetch(`https://playground.4geeks.com/contact/agendas/irene_batlle/contacts/${id}`,{
					method:"PUT", 
					headers:{
						'Content-type': 'application/json'
					}, 
					body: JSON.stringify(contact)
				})
				.then((response)=>{
					if (data){
						const updatedList =store.listContacts.map(contact=>{
							if (contact.id==id){
								contact = data
							}
							return contact
						})
						setStore({listContacts: updatedList})
					}
				})
				.catch((error)=>console.log(error));
			}

		}
	};
};

export default getState;
