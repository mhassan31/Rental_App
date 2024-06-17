module.exports = (sequelize, DataTypes) => {

    const RE_Prop_Detail = sequelize.define('RE_Prop_Details', {

        main_property_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        property_type:{
            type: DataTypes.STRING
        },

        landlord_id:{
            type: DataTypes.STRING
        },

        landlord_real_estate_name:{
            type: DataTypes.STRING
        },

        property_ownership:{
            type: DataTypes.STRING
        },

        main_property_name:{
            type: DataTypes.STRING
        },

        main_property_legal_id:{
            type: DataTypes.STRING
        },

        main_property_building_no:{
            type: DataTypes.STRING
        },

        main_property_street_no:{
            type: DataTypes.STRING
        },

        main_property_zone_no:{
            type: DataTypes.STRING
        },

        main_property_image:{
            type: DataTypes.STRING
        },

        main_property_contract:{
            type: DataTypes.STRING
        },

    },{
        tableName: "property_detail_db",
        timestamps: false
    });

    return RE_Prop_Detail;
}