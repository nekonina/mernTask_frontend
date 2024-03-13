import useProyect from './useProyect'
import useAuth from './useAuth'

const useAdmin = () => {
    const {proyecto} = useProyect()
    const {auth} =  useAuth()

    return proyecto.creador ===  auth._id
}

export default useAdmin;