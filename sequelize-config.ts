import { Sequelize } from 'sequelize'
import SequelizeAdapter from "@next-auth/sequelize-adapter"

const sequelize = new Sequelize('sqlite:test.db')
const adapter = SequelizeAdapter(sequelize)

// Calling sync() is not recommended in production
sequelize.sync()

export default sequelize
export { adapter }