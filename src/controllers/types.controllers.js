const TypeServices = require ('../services/types.services')

const TypeControllers = {
    getAllTypes: async (req, res) => {
        try {
            const types = await TypeServices.getAllTypes();
            res.json(types);
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
    }
}
module.exports = TypeControllers