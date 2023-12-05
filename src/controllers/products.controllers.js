
const registerUser = async (req, res) => {
    try {
        const {} = req.body

        // Aca ira la Validacion de datos

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllUser = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    try {
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    registerUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
}