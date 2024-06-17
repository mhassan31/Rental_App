module.exports = (sequelize, DataTypes) => {

    const TEN_Members = sequelize.define('TEN_Members', {

        account_type:{
            type: DataTypes.STRING
        },

        tenant_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        reg_id:{
            type: DataTypes.STRING
        },

        full_name:{
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
        tableName: "tenant_signup_db",
        timestamps: false
    });

    return TEN_Members;
}