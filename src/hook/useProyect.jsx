import { useContext } from "react"
import ProyectoContext from "../context/ProyectoProvider"

const useProyect = () => {
    return useContext(ProyectoContext)
}

export default useProyect;