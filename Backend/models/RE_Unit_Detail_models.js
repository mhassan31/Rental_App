module.exports = (sequelize, DataTypes) => {

    const RE_Unit_Detail = sequelize.define('RE_Unit_Details', {

        landlord_id:{
            type: DataTypes.STRING
        },

        real_estate_landlord_name:{
            type: DataTypes.STRING
        },

        main_property_id:{
            type: DataTypes.STRING
        },

        main_property_name:{
            type: DataTypes.STRING
        },

        main_property_legal_id:{
            type: DataTypes.STRING
        },

        mainproperty_building_no:{
            type: DataTypes.STRING
        },

        mainproperty_street_no:{
            type: DataTypes.STRING
        },

        mainproperty_zone_no:{
            type: DataTypes.STRING
        },

        sub_property_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        sub_property_name:{
            type: DataTypes.STRING
        },

        sub_property_legal_id:{
            type: DataTypes.STRING
        },

        sub_property_rent:{
            type: DataTypes.STRING
        },

        sub_property_image:{
            type: DataTypes.STRING
        },

        sub_property_status:{
            type: DataTypes.STRING
        },

    },{
        tableName: "sub_property_detail_db",
        timestamps: false
    });

    return RE_Unit_Detail;
}