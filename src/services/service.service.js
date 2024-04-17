const ServiceModel = require ('../models/Service')

async function registerService(Service) {
    return await ServiceModel.create(Service);
}

async function getAllServices() {
    return await ServiceModel.find();
}

async function getOneServiceById(id) {
    return await ServiceModel.findById(id)
}

async function deleteOneServiceById(id) {
    return await ServiceModel.findByIdAndDelete({_id:id})
}

async function updateOneServiceById(id, updatedService) {
    return await ServiceModel.findOneAndUpdate(
        { _id: id }, //Objeto que se usa para realizar la consulta y encontrar el documento a actualizar
        updatedService,
        { new: true }); //Este parametro indica si se debe devolver el documento resultante de la operación (true)
    
}

module.exports = {
    registerService, 
    getAllServices, 
    getOneServiceById, 
    deleteOneServiceById, 
    updateOneServiceById
}