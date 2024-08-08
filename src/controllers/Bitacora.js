import Bitacora from '../models/Bitacora.js';
import Aprendices from '../models/Aprendices.js';

const bitacoraController = {
    // Listar todas las entradas de bitácora

    crearBitacora: async (req, res) => {
        const { IdAprendis, fecha } = req.body;

        try {
            const nuevaBitacora = new Bitacora({
                IdAprendis,
                fecha
            });

            const resultado = await nuevaBitacora.save();
            console.log('Bitácora creada:', resultado);
            res.status(201).json(resultado);
        } catch (error) {
            console.error('Error al crear bitácora:', error);
            res.status(500).json({ error: 'Error al crear bitácora' });
        }
    },
    
    listarTodo: async (req, res) => {
        try {
            const bitacoras = await Bitacora.find();
            console.log('Lista de entradas de bitácora:', bitacoras);
            res.json(bitacoras);
        } catch (error) {
            console.error('Error al listar las entradas de bitácora:', error);
            res.status(500).json({ error: 'Error al listar las entradas de bitácora' });
        }
    },

   // Listar entradas de bitácora por ID de Aprendis
    listarPorAprendis: async (req, res) => {
        const { idAprendis } = req.params;
        try {
            const bitacoras = await Bitacora.find({ IdAprendis: idAprendis });
            console.log(`Lista de entradas de bitácora para el aprendiz ${idAprendis}:`, bitacoras);
            res.json(bitacoras);
        } catch (error) {
            console.error(`Error al listar las entradas de bitácora para el aprendiz ${idAprendis}:`, error);
            res.status(500).json({ error: `Error al listar las entradas de bitácora para el aprendiz ${idAprendis}` });
        }
    },

    // Listar entradas de bitácora por ID de Ficha (si aplicable)
    listarPorFicha: async (req, res) => {
        const { IdFicha } = req.params;
        try {
            let array = []
            const bitacoras = await Bitacora.find()
            .populate('IdAprendis')
            for (let i = 0; i < bitacoras.length; i++) {
                const bitacora = bitacoras[i];
                const estudiante = {
                    _id:bitacora?.IdAprendis?.IdFicha,
                    name: {
                      first: "Future",
                      last: "Studio"
                    }
                  };
                  const isEqual = estudiante._id.equals(IdFicha);
                console.log(bitacora?.IdAprendis?.IdFicha);
                console.log(IdFicha);
                if(bitacora?.IdAprendis?.IdFicha === IdFicha || isEqual) {
                    array.push(bitacora)
                }
            }
            console.log(`Lista de entradas de bitácora para la ficha ${IdFicha}:`, array);
            res.json(array);
        } catch (error) {
            console.error(`Error al listar las entradas de bitácora para la ficha ${IdFicha}:`, error);
            res.status(500).json({ error: `Error al listar las entradas de bitácora para la ficha ${IdFicha}` });
        }
    }
};

export default bitacoraController;