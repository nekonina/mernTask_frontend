import { Link } from "react-router-dom"
import useAuth from "../hook/useAuth"


const SideBar = () => {
    const {auth} = useAuth()
    const {nombre} = auth
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
        <p className="text-xl font-bold ">
            Hola: {nombre}
        </p>
        <Link 
            to={'crear-proyecto'}
            className="uppercase font-bold w-full bg-pink-600 p-3 text-white block mt-5 text-center rounded-lg"
        >
            Nuevo Proyecto
        </Link>
    </aside>
  )
}

export default SideBar
