// const uuid = require('uuid/v4'); // ES5

module.exports = (sequelize, DataTypes) => {

    const RE_Members = sequelize.define('RE_Members', {

        account_type:{
            type: DataTypes.STRING
        },

        real_estate_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        company_name:{
            type: DataTypes.STRING
        },

        reg_id:{
            type: DataTypes.STRING
        },

        first_name:{
            type: DataTypes.STRING
        },

        mobile_number:{
            type: DataTypes.STRING
        },

        email:{
            type: DataTypes.STRING
        },

        pswrd:{
            type: DataTypes.STRING
        },


    },{
        tableName: "real_estate_companies",
        timestamps: false
    });

    return RE_Members;
}