const {registerService, getAllServices, deleteOneServiceById, getOneServiceById, updateOneServiceById}= require('../services/service.service')


const createService = async (req,res)=>{

    const inputData = req.body;
    const payload = req.authUser;

    console.log(inputData);
    console.log(payload);

    inputData.userId = payload._id;

    try {
        const data = await registerService(inputData);
        res.json({
            ok:true,
            data
        });
    } catch (error) {
        console.error(error);
        res.json({
            ok:false,
            msg: 'Error al crear servicio'
        })
    }
}

const getServices = async (req,res) => {

    console.log( req.authUser );

    try {
        const data = await getAllServices();

        res.status( 200 ).json({
            ok: true,
            data
        });
    } 
    catch( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener todos los servicios'
        })
    }
}
const getServiceById = async ( req, res ) => {
    const Service_id = req.params.id;

    try {
        const data = await getOneServiceById( Service_id );

        res.status( 200 ).json({ ok: true, data });
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ ok: false, msg: 'Error al obtener un Servicio por ID' })
    }
}
const removeServiceById = async ( req, res ) => {
    const service_id = req.params.id;
    
    try {
        const data = await deleteOneServiceById( service_id );
        
        res.status( 200 ).json({ ok: true, data });
    } 
    catch( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al eliminar un Servicio por ID'
        })
    }
    
}
const updateServiceById = async(req,res)=>{
    const service_id = req.params.id;
    const inputData = req.body;

    console.log(inputData);

    try {
        const data = await updateOneServiceById(service_id, inputData)

        res.status(206).json({
            ok:true, 
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar el servicio'
         })
    }
}
module.exports={
    createService,
    getServices, 
    getServiceById,
    removeServiceById,
    updateServiceById
}
