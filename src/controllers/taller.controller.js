const { registerTaller, getAllTallers, getOneTallerById, removeOneTallerById, updateOneTallerById } = require("../services/taller.service");


const createTaller = async (req, res )=>{
    const inputData = req.body;
    const payload = req.authUser;

    console.log( inputData );
    console.log( payload );
    
    inputData.userId = payload._id;

    try {
        const data = await registerTaller( inputData);
        res.status( 201 ).json({
            ok: true, data
        })
        
    } catch (error) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'error al crear el taller'
        })
        
    }
}

const getTaller = async (req, res )=>{
    console.log( req. authUser );

    try {
        const data = await getAllTallers();

        res.status( 200 ).json({
            ok: true, data
        });
        
    } catch (error) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'error al obtener los talleres'
        })
        
    }
    
}

const getTallerById = async (req, res )=>{
    const taller_id = req.params.id;

    try {
        const data = await getOneTallerById( taller_id );

        res.status( 200 ).json({
            ok: true, data
        });
        
    } catch (error) {
        console.error( error );
        res.status( 500 ).json({
            ok: false, 
            msg: 'error al obtener el taller por ID'
        })
        
    }
    
}

const removeTallerById = async (req, res )=>{
    const taller_id = req.params.id;

    try {
        const data = await removeOneTallerById( taller_id);
        
        res.status( 204 ).json({ ok: true, data })
        
    } catch (error) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'error al eliminar un taller por ID'
        })
        
    }
    
}

const updateTallerById = async (req, res )=>{
    const taller_id = req.params.id;
    const inputData = req.body;

    try {
        const updateTaller = await updateOneTallerById( taller_id, inputData)
        
        res.status( 206 ).json({
            ok: true, updateTaller
        })
    } catch (error) {
        console.error( error );
        req.status( 500 ).json({
            ok: false,
            msg: 'error al actualizar el taller'
        })
    }
}

module.exports = {
    createTaller,
    getTaller,
    getTallerById,
    removeTallerById,
    updateTallerById

}