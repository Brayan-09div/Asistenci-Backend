import Aprendis from '../models/Aprendices.js';
import Fichas from '../models/Fichas.js';


const controladorAprendis = {

    // Crear un nuevo aprendiz
    crearAprendis: async (req, res) => {
        const { cc, nombre, email, telefono, IdFicha } = req.body;
        try {
            const fichaExistente = await Fichas.findById(IdFicha);
            if (!fichaExistente) {
                return res.status(404).json({ error: 'La ficha especificada no existe' });
            }

            const nuevoAprendis = new Aprendis({
                cc,
                nombre,
                email,
                telefono,
                IdFicha
            });

            const resultado = await nuevoAprendis.save();
            console.log('Aprendiz creado:', resultado);
            res.json(resultado);
        } catch (error) {
            console.error('Error al crear aprendiz:', error);
            res.status(500).json({ error: 'Error al crear el aprendiz' });
        }
    },

    // Editar un aprendiz por su ID
    editarAprendis: async (req, res) => {
        const { id } = req.params;
        const { cc, nombre, email, telefono, IdFicha } = req.body;
        try {
            const fichaExistente = await Fichas.findById(IdFicha);
            if (!fichaExistente) {
                return res.status(404).json({ error: 'La ficha especificada no existe' });
            }
            
            const resultado = await Aprendis.findByIdAndUpdate(id, {
                cc,
                nombre,
                email,
                telefono,
                IdFicha: mongoose.Types.ObjectId(IdFicha) // Convertir a ObjectId si es necesario
            }, { new: true });

            if (!resultado) {
                throw new Error('Aprendiz no encontrado');
            }

            console.log('Aprendiz editado:', resultado);
            res.json(resultado);
        } catch (error) {
            console.error('Error al editar aprendiz:', error);
            res.status(500).json({ error: 'Error al editar el aprendiz' });
        }
    },

    // Listar todos los aprendices
    listarAprendis: async (req, res) => {
        try {
            const aprendices = await Aprendis.find().populate('IdFicha');
            console.log('Lista de aprendices:', aprendices);
            res.json(aprendices);
        } catch (error) {
            console.error('Error al listar aprendices:', error);
            res.status(500).json({ error: 'Error al listar los aprendices' });
        }
    },

    // Eliminar un aprendiz por su ID
    eliminarAprendis: async (req, res) => {
        const { id } = req.params;
        try {
            const aprendisEliminado = await Aprendis.findByIdAndDelete(id);

            if (!aprendisEliminado) {
                return res.status(404).json({ error: 'Aprendiz no encontrado' });
            }

            console.log('Aprendiz eliminado:', aprendisEliminado);
            res.json({ message: 'Aprendiz eliminado correctamente', aprendisEliminado });
        } catch (error) {
            console.error('Error al eliminar aprendiz:', error);
            res.status(500).json({ error: 'Error al eliminar el aprendiz' });
        }
    },

    activarDesactivarAprendis: async (req, res) => {
        const { id } = req.params;
        try {
          const aprendiz = await Aprendis.findById(id);
    
          if (!aprendiz) {
            return res.status(404).json({ error: 'Aprendiz no encontrado' });
          }
    
          aprendiz.activo = !aprendiz.activo;
          const resultado = await aprendiz.save();
    
          console.log('Estado de aprendiz actualizado:', resultado);
          res.json(resultado);
        } catch (error) {
          console.error('Error al activar/desactivar aprendiz:', error);
          res.status(500).json({ error: 'Error al actualizar el estado del aprendiz' });
        }
      }

};

export default controladorAprendis;