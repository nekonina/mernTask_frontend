
import PreviewProyecto from '../components/PreviewProyecto.jsx'
import useProyect from '../hook/useProyect'
import Alerta from '../components/Alerta'

const Proyectos = () => {
    const { proyectos, alerta } = useProyect()

  return (
    <>
        {
            alerta.msg != ''
            ? (
                <div className="flex justify-center">
                    <div className="w-full md:w-1/3">
                        <Alerta alerta={alerta} />
                    </div>
                </div>
            )
            : null
        }
        <h1 className="text-4xl font-black">
            Proyectos
        </h1>
        <div className='bg-white shadow mt-10 rounded-lg'>
          {
            proyectos.length 
            ? proyectos.map(proyecto => (
              <PreviewProyecto data={proyecto} key={proyecto._id}/>
            ))
            : <p className='mt-1 text-center text-gray-600 uppercase p-5'>No hay proyectos todavía</p>
          }
        </div>
    </>
  )
}

export default Proyectos
