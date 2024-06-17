
var Sequelize = require("sequelize");
var DataTypes = require("sequelize").DataTypes;

var _RE_Members_Models = require("./RE_Member_models");
var _TEN_Members_Models = require("./TEN_Member_models");
var _RE_Prop_Detail_Models = require("./RE_Prop_Detail_models");
var _RE_Unit_Detail_Models = require("./RE_Unit_Detail_models");
var _RE_Tenant_Entry_Models = require("./RE_Tenant_Entry_models");
var _TEN_Payment_Models = require("./TEN_Payment_models");

function initModels(sequelize) {
  var RE_Members_Models = _RE_Members_Models(sequelize, DataTypes);
  var TEN_Members_Models = _TEN_Members_Models(sequelize, DataTypes);
  var RE_Prop_Detail_Models = _RE_Prop_Detail_Models(sequelize, DataTypes);
  var RE_Unit_Detail_Models = _RE_Unit_Detail_Models(sequelize, DataTypes);
  var RE_Tenant_Entry_Models = _RE_Tenant_Entry_Models(sequelize, DataTypes);
  var TEN_Payment_models = _TEN_Payment_Models(sequelize, DataTypes);

  
  return {
    RE_Members_Models,
    TEN_Members_Models,
    RE_Prop_Detail_Models,
    RE_Unit_Detail_Models,
    RE_Tenant_Entry_Models,
    TEN_Payment_models,
    Sequelize,
    sequelize
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
// module.exports.default = initModels;
