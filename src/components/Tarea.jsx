import { formatearFecha } from "../helpers/Formatearfecha"
import useAdmin from "../hook/useAdmin"
import useProyect from "../hook/useProyect"

const Tarea = ({data}) => {
    const { loadContextTarea, setStatusTarea } =useProyect()
    const isAdmin = useAdmin()
    const {descripcion, nombre, fechaEntrega, prioridad, _id, estado} = data

  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div className="flex flex-col items-start ">
            <p className="mb-1 text-xl">{nombre}</p>
            <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
            <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-sm  uppercase text-gray-500">
                Prioridad: {' '}
                <span className="font-bold text-gray-700 text-lg">
                    {prioridad}
                </span>
            </p>
            {
                estado 
                ? <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white px-4">Completada por: {data?.completado?.nombre}</p>
                :null
            }
        </div>
        <div className="flex gap-2 flex-col lg:flex-row">
            { isAdmin
                ?(
                    <button 
                        className="bg-purple-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => loadContextTarea(data, 'formTarea')}
                    >
                        Editar
                    </button>
                )
                :null
            }
            <button 
                className = { ` ${estado ?'bg-pink-600':'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                onClick={() => setStatusTarea(_id)}
            >
                {estado ? "Completa" : "Incompleta"}
            </button>
            { isAdmin
                ?(
                    <button 
                        className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                        onClick={() => loadContextTarea(data, 'deleteTarea')}
                    >
                        Eliminar
                    </button>
                )
                :null
            }         
            
        </div>
    </div>
  )
}

export default Tarea
