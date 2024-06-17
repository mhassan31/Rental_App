module.exports = (sequelize, DataTypes) => {

    const TEN_Payments = sequelize.define('TEN_Payments', {

        payment_link_id:{
            type: DataTypes.STRING
        },

        real_estate_id:{
            type: DataTypes.STRING
        },

        payment_id:{
            type: DataTypes.STRING
        },

        transaction_id:{
            type: DataTypes.STRING
        },

        rent_amount:{
            type: DataTypes.STRING
        },

        payment_month:{
            type: DataTypes.STRING
        },

        payment_year:{
            type: DataTypes.STRING
        },

        payment_status:{
            type: DataTypes.STRING
        },



    },{
        tableName: "tenant_property_payments",
        timestamps: false
    });

    return TEN_Payments;
}