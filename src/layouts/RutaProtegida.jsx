import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hook/useAuth"
import Spinner from "../components/Spinner"
import Header from "../components/Header"
import SideBar from "../components/SideBar"

const RutaProtegida = () => {
    const {auth, cargando} = useAuth()

    if(cargando) return <Spinner />

  return (
    <>
        {
            auth._id 
            ? <div className="bg-gray-100">
                <Header />
                <div className="md:flex md:min-h-screen">
                  <SideBar/>
                  <main className="p-10 flex-1">
                    <Outlet />
                  </main>
                </div>
              </div> 
            : <Navigate to={'/'}/> 
        }

    </>
  )
}

export default RutaProtegida
