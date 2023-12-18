export const addSortedClient = (clients, newClient) => {
  // si el arreglo esta vacio
  // el cliente simplemente se agrega
  if (clients.length === 0) {
    clients.push(newClient)
    return clients
  }
  // si hay mas de un elemento
  // se recorre cada cliente por su indice
  for (const clientIndex in clients) {
    // si el nombre del cliente a insertar es mayor (alfabeticamente) que el actual
    // entonces pasar al siguiente
    if (newClient?.name > clients[clientIndex]?.name) continue
    // si el cliente no es mayor
    // se inserta en la posicion del actual
    clients.splice(clientIndex, 0, newClient)
    return clients
  }
  // si el cliente no se inserto en el bucle
  // quiere decir que es mayor (alfabeticamente) que todos los clientes existentes
  // por lo que se agrega al final
  clients.push(newClient)
  return clients
}
