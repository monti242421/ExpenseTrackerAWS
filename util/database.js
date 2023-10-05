const { Sequelize } = require("sequelize")
const sequelize = new Sequelize('node-complete','root','fzr2000o',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;