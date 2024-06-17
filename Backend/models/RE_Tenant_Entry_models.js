module.exports = (sequelize, DataTypes) => {

    const RE_Tenant_Entry = sequelize.define('RE_Tenant_Entrys', {

        real_estate_id:{
            type: DataTypes.STRING
        },

        real_estate_name:{
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

        main_property_building_no:{
            type: DataTypes.STRING
        },

        main_property_street_no:{
            type: DataTypes.STRING
        },

        main_property_zone_no:{
            type: DataTypes.STRING
        },

        sub_property_id:{
            type: DataTypes.STRING
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

        tenant_QID:{
            type: DataTypes.STRING
        },

        tenant_name:{
            type: DataTypes.STRING
        },

        con_ref:{
            type: DataTypes.STRING
        },

        tenant_email:{
            type: DataTypes.STRING
        },

        tenant_mobile_number:{
            type: DataTypes.STRING
        },

        tenant_rent_date:{
            type: DataTypes.STRING
        },

        startdate:{
            type: DataTypes.STRING
        },

        end_date:{
            type: DataTypes.STRING
        },

        cont_path:{
            type: DataTypes.STRING
        },

        payment_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        tenant_reg:{
            type: DataTypes.STRING
        },

        tenant_status:{
            type: DataTypes.STRING
        },

        cont_renewel_no:{
            type: DataTypes.STRING
        },

    },{
        tableName: "tenant_entry_in_property_by_re",
        timestamps: false
    });

    return RE_Tenant_Entry;
}