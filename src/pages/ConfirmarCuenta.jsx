import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../../config/clienteAxios';

const ConfirmarCuenta = () => {
    const {id} = useParams()

    const [alerta, setAlerta] = useState({
        msg:'',
        error: false
    })

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

    useEffect(()=>{
        const confirmarCuenta = async () => {
            try {
                const {data} = await clienteAxios(`/usuarios/confirmar/${id}`)
                setAlerta({msg: data.msg})
                setCuentaConfirmada(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg, 
                    error: true
                })
            }
        }
        confirmarCuenta()
        
    }, [])


  return (
    <>        
        <h1 className='text-pink-600 font-white text-6xl capitalize font-bold'>
            Confirma tu cuenta y Comienza a crear tus
            <span className='text-slate-700'> proyectos</span>
        </h1>
        {
            alerta.msg != ''
            ? <Alerta alerta={alerta}/>
            :null
        }
        
        {
            cuentaConfirmada === true
            ? <div className='mt-15 md:mt-5 shadow-lg p-5 rounded-xl bg-white'>
                <Link
                    className='block text-center my-5 text-slate-500 uppercase text-md font-bold uppercase'
                    to={"/"}
                >
                    Inicia Sesión
                </Link>
            </div>
            : null
        }
        
        
    </>
  )
}

export default ConfirmarCuenta
