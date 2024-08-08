import Bitacoras from "../models/Fichas.js";

const BitacorasHelper = {
    existeBitacoraId: async (id) => {
        try {
            const existe = await Bitacoras.findById(id);
            if (!existe) {
                throw new Error(`La ficha con ID ${id} no existe`);
            }
            return existe;
        } catch (error) {
            throw new Error(`Error al buscar la ficha por ID: ${error.message}`);
        }
    },

}

export { BitacorasHelper };