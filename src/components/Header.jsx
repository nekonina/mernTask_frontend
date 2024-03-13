import { Link } from "react-router-dom"
import useProyect from "../hook/useProyect"
import SearchBar from "./SearchBar"
import useAuth from "../hook/useAuth"

const Header = () => {
    const {handleSearch, cerrarSesionProy} = useProyect()
    const {cerrarSesionAuth} = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionProy()
        cerrarSesionAuth()
        localStorage.removeItem('token')
    }
    
  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl text-pink-600 font-black text-center mb-5 md:mb-0">
                Uptask
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <button 
                    type="button"
                    className="uppercase font-bold"
                    onClick={handleSearch}
                >
                    Buscar Proyectos
                </button>
                <Link 
                    to={'/proyectos'}
                    className="uppercase font-bold"
                >Proyectos</Link>
                <button
                    type="button"
                    className="text-white text-sm bg-pink-600 p-3 rounded-md uppercase font-bold"
                    onClick={() => handleCerrarSesion()}
                >Salir</button>
                <SearchBar />
            </div>
        </div>
    </header>
  )
}

export default Header
