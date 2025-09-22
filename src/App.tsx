/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { getListItems, addListItem, updateListItem, deleteListItem } from "./spService"

function App() {
  const { login, logout, getToken, account } = useAuth()
  const [items, setItems] = useState<any[]>([])
  const [newTitle, setNewTitle] = useState("")

  const loadItems = async () => {
    const token = await getToken()
    console.log("Token:", token)
    if (!token) return
    const data = await getListItems(token)
    setItems(data)
  }

  const handleAdd = async () => {
    const token = await getToken()
    if (!token) return
    await addListItem(token,
      {
        __metadata: { type: "SP.Data.TasksListItem" }, // <- Tipo correcto
        Title: newTitle
      }
    )
    setNewTitle("")
    loadItems()
  }
  // useEffect(() => {
  //   setTimeout(async() => {
  //     console.log('Login Lanzado')
  //     await login()
  //     console.log('Login Terminado')
      
  //   }, (0));
  // }, [])
  

  const handleUpdate = async (id: number, title: string) => {
    const token = await getToken()
    if (!token) return
    await updateListItem(token, id, { Title: title + " (updated)" })
    loadItems()
  }

  const handleDelete = async (id: number) => {
    const token = await getToken()
    if (!token) return
    await deleteListItem(token, id)
    loadItems()
  }
console.log('aaccount1',account);
  useEffect(() => {
    console.log('aaccount2',account);
    if (account) loadItems()
  }, [account])

  return (
    <div style={{ padding: 20 }}>
      <h1>CRUD SharePoint</h1>
      {!account ? (
        <button onClick={login}>Login</button>
      ) : (
        <>
          <div>
            <p>Bienvenido: {account.username}</p>
            <button onClick={logout}>Logout</button>
          </div>
          <div>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Nuevo item"
            />
            <button onClick={handleAdd}>Agregar</button>
          </div>
          <ul>
            {items.map((item) => (
              <li key={item.Id}>
                {item.Title}{" "}
                <button onClick={() => handleUpdate(item.Id, item.Title)}>Editar</button>
                <button onClick={() => handleDelete(item.Id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default App
