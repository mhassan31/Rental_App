import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs'
import {User} from './user'
import { Property } from './property';

import { Real_estate_member } from './real_estate_member';

import { Local_landlord_member } from './local_landlord_member';

import { Tenant_member } from './tenant_member';

import { Environment } from 'src/environments/environment.prod';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  bearer_token : any;
  sessData: any;
  newsessData: any;

  // bearer_token = sessionStorage.getItem('token');

  //PHP_API_SERVER : string = "assets/file/userdata.json";

  //PHP_API_SERVER : string = "https://jsonplaceholder.typicode.com/todos";

  // PHP_API_SERVER : string = "http://localhost:8080/angular_app_Rental_Updated/php/";

  PHP_API_SERVER : string = Environment.baseUrl+"php";

  Node_API_SERVER : string = "http://localhost:5000";


  // PHP_API_SERVER : string = "http://20.21.100.16:8080/angular_app_Rental_Updated/php/"; UAT Server URL

  constructor(private _http : HttpClient  ) { }

  // getData() : Observable<User[]> {
  //   return this._http.get<User[]>(this.PHP_API_SERVER + '/loginhelptest.php');
  // }  


  //API GET/POST that is using during signup////////////////////////////////////////////////////////////////////////
  getData() : Observable<User[]> {
  return this._http.get<User[]>(this.PHP_API_SERVER + '/API_GET_Data_LandlordDB.php');
  }  

  gettenantData() : Observable<User[]> {
  return this._http.get<User[]>(this.PHP_API_SERVER + '/API_GET_Data_TenantDB.php');
  }  

  // getData(){
  //   return this._http.get(this.PHP_API_SERVER + "loginhelp.php");
  // } 

//   postData(newUser :User) : Observable<User[]> {
//     return this._http.post<User[]>(this.PHP_API_SERVER + '/signuphelp.php', newUser);
// }

postData(newUser :User) : Observable<User[]> {
return this._http.post<User[]>(this.PHP_API_SERVER + '/API_POST_Data_LandlordDB.php', newUser);
}

posttenantData(newUser :User) : Observable<User[]> {
return this._http.post<User[]>(this.PHP_API_SERVER + '/API_POST_Data_TenantDB.php', newUser);
}

//API GET/POST that is using during signup End/////////////////////////////////////////////////////////////////////////



// loginData(newUser :User) : Observable<User[]> {
//   return this._http.post<User[]>(this.PHP_API_SERVER + '/loginhelp.php', newUser);
// }



// //////////////////////////////////////////APIs Use while login/////////////////////////////////////

loginData(newUser :User) : Observable<User[]> {
return this._http.post<User[]>(this.PHP_API_SERVER + '/API_GET_Login_DATA_LandlordDB.php', newUser);
}

//Previous
// logintenantData(newUser :User) : Observable<User[]> {
// return this._http.post<User[]>(this.PHP_API_SERVER + '/API_GET_Login_Data_TenantDB.php', newUser);
// }

//Updated
// logintenantData(newUser :User) : Observable<User[]> {
//   return this._http.post<User[]>(this.PHP_API_SERVER + '/API_GET_Login_Data_TenantDB2.php', newUser);
//   }


logintenantData(newUser :User) : Observable<User[]> {
  return this._http.post<User[]>(this.Node_API_SERVER + '/login_process_ten/login_ten', newUser);
  }

// login_real_estate_Data(newUser :User) : Observable<User[]> {
//   return this._http.post<User[]>(this.PHP_API_SERVER + '/API_GET_Login_DATA_RealEstate_DB.php', newUser);
//   }


login_real_estate_Data(newUser :User) : Observable<User[]> {
  return this._http.post<User[]>(this.Node_API_SERVER + '/login_process_re/login_re', newUser);
  }


//////////////////////////////////////////////////////////////////////////////////////////////////////



postpropertyData(newProperty : Property) : Observable<Property[]> {
return this._http.post<Property[]>(this.PHP_API_SERVER + '/API_Upload_Property_Data_test.php', newProperty);
}


getpropertyData() : Observable<any>{
return this._http.get<any>(this.PHP_API_SERVER + '/API_GET_Property_Data.php');
}

getrepropertyData(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Property_Data_for_Realestate.php', newData);
  }

///////////////////////////////////////////Node////////////////////////////////////////////////////////
// getrepropertyData() : Observable<any>{

//   this.sessData = sessionStorage.getItem('sessionData');
//   this.newsessData = JSON.parse(this.sessData);

//   // console.log(this.newsessData.token);

//   let headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': `${this.newsessData.token}`
//   })


//   return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Property_Data_for_Realestate.php',{});
//   }
///////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////Node////////////////////////////////////////////////////////

get_re_db_propertyData() : Observable<any>{

  this.sessData = sessionStorage.getItem('sessionData');
  this.newsessData = JSON.parse(this.sessData);

  // console.log(this.newsessData.token);

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.newsessData.token}`
  })

  return this._http.post<any>(this.Node_API_SERVER + '/login_process_re/DB_Prop_data',{}, {headers: headers});
  }


////////////////////////////////////////////////////////////////////////////////////////////////////////

getpropertyDetail(id :any) : Observable<any>{
return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Property_Detail.php', id);
}


get_real_estate_db_Data() : Observable<Real_estate_member[]> {
return this._http.get<Real_estate_member[]>(this.PHP_API_SERVER + '/API_GET_Real_Estate_Reg_Data.php');
}  

/////////////////////////////////////APIs used while real estate member registration////////////////////////////////////////

//APi Check Data availability in real estate db while Real Estate Registration
// check_realestate_db_Data(NewMember : Real_estate_member) : Observable<Real_estate_member[]> {
//   return this._http.post<Real_estate_member[]>(this.PHP_API_SERVER + '/API_Check_POST_Data_Real_Estate_DB.php', NewMember);
// } 

check_realestate_db_Data(NewMember : Real_estate_member) : Observable<Real_estate_member[]> {
  return this._http.post<Real_estate_member[]>(this.Node_API_SERVER + "/signup_process/check_re_table", NewMember);
} 

//APi Check Data availability in local landlord db while Real Estate Registration
check_local_landlord_db_Data(NewMember : Local_landlord_member) : Observable<Local_landlord_member[]> {
  return this._http.post<Local_landlord_member[]>(this.PHP_API_SERVER + '/API_Check_POST_Data_Landlord_DB.php', NewMember);
} 

//APi Check Data availability in tenant db while Real Estate Registration
// check_data_tenant_db_Data(NewMember : Tenant_member) : Observable<Tenant_member[]> {
//   return this._http.post<Tenant_member[]>(this.PHP_API_SERVER + '/API_Check_POST_Data_Tenant_DB.php', NewMember);
// } 

check_data_tenant_db_Data(NewMember : Tenant_member) : Observable<Tenant_member[]> {
  return this._http.post<Tenant_member[]>(this.Node_API_SERVER + "/signup_process/check_ten_table", NewMember);
} 

post_real_estate_member_Data(newMember :Real_estate_member) : Observable<Real_estate_member[]> {
  return this._http.post<Real_estate_member[]>(this.PHP_API_SERVER + '/API_POST_Data_Real_Estate_DB.php', newMember);
}

// post_real_estate_member_Data(newMember :Real_estate_member) : Observable<Real_estate_member[]> {
//   return this._http.post<Real_estate_member[]>(this.Node_API_SERVER + '/signup_process/Post_RS_User_Data', newMember);
// }

re_signup_otp_generate(newMember :Real_estate_member) : Observable<Real_estate_member[]> {
  return this._http.post<Real_estate_member[]>(this.PHP_API_SERVER + '/API_RE_OTP_Gen.php', newMember);
}

// re_otp_verify(newMember :Real_estate_member) : Observable<Real_estate_member[]> {
//   return this._http.post<Real_estate_member[]>(this.PHP_API_SERVER + '/API_RE_OTP_Verify.php', newMember);
// }

re_otp_verify(newMember :Real_estate_member) : Observable<Real_estate_member[]> {
  return this._http.post<Real_estate_member[]>(this.Node_API_SERVER + '/signup_process/RE_Verify_OTP', newMember);
}

// post_real_estate_Data(newMember :Real_estate_member): Observable<Real_estate_member[]>{
//   return this._http.post<Real_estate_member[]>(this.PHP_API_SERVER + '/API_POST_Data_Real_Estate_DB.php', newMember);
// }


post_real_estate_Data(newMember :Real_estate_member): Observable<Real_estate_member[]>{
  return this._http.post<Real_estate_member[]>(this.Node_API_SERVER + '/signup_process/Post_RS_User_Data', newMember);
}

// del_respective_temp_otp(newMember :Real_estate_member): Observable<Real_estate_member[]>{
//   return this._http.post<Real_estate_member[]>(this.PHP_API_SERVER + '/API_POST_Del_Respective_OTP.php', newMember);
// }

del_respective_temp_otp(newMember :Real_estate_member): Observable<Real_estate_member[]>{
  return this._http.post<Real_estate_member[]>(this.Node_API_SERVER + '/signup_process/Del_Resp_OTP', newMember);
}

Re_Resend_OTP(newMember :Real_estate_member): Observable<Real_estate_member[]>{
  return this._http.post<Real_estate_member[]>(this.PHP_API_SERVER + '/API_RE_OTP_Resend.php', newMember);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////*********APIs Used while Real Estate Portal operation***********////////////////////////////

//This API Update the Real Estate Member///////////////////////////////////////////////////////////////////////////////////
// update_real_estate_detail(newData : any) : Observable<any>{
//   return this._http.post<any>(this.PHP_API_SERVER + '/API_Update_Data_Real_Estate_DB.php', newData)
// }

update_real_estate_detail(newData : any) : Observable<any>{

  this.sessData = sessionStorage.getItem('sessionData');
  this.newsessData = JSON.parse(this.sessData);

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.newsessData.token}`
  })

  return this._http.post<any>(this.Node_API_SERVER + '/login_process_re/update_user_detail',newData, {headers: headers})
}

// update_real_estate_password(newData : any) : Observable<any>{
//   return this._http.post<any>(this.PHP_API_SERVER + '/API_Update_Password_Real_Estate_DB.php', newData)
// }


update_real_estate_password(newData : any) : Observable<any>{

  this.sessData = sessionStorage.getItem('sessionData');
  this.newsessData = JSON.parse(this.sessData);

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.newsessData.token}`
  })

  return this._http.post<any>(this.Node_API_SERVER + '/login_process_re/update_user_password', newData, {headers: headers})
}



//////////////////////////////*****************************************************************////////////////////////////



get_local_landlord_db_Data() : Observable<Local_landlord_member[]> {
  return this._http.get<Local_landlord_member[]>(this.PHP_API_SERVER + '/API_GET_Local_Landlord_Reg_DB_Data.php');
} 


get_tenant_db_Data() : Observable<Tenant_member[]> {
  return this._http.get<Tenant_member[]>(this.PHP_API_SERVER + '/API_GET_Data_TenantDB.php');
}  


////////////////////////////////////////API Used While landlord registration///////////////////////////////////////////////

//APi Check Data availability in landlord db while landlord Registration
check_landlord_db_Data(newMember :Local_landlord_member) : Observable<Local_landlord_member[]>{
  return this._http.post<Local_landlord_member[]>(this.PHP_API_SERVER + '/API_Check_POST_Data_Landlord_DB.php', newMember);
}


//APi Check Data availability in real estate db while landlord Registration
check_real_estate_db_Data(newMember :Local_landlord_member) : Observable<Real_estate_member[]>{
  return this._http.post<Local_landlord_member[]>(this.PHP_API_SERVER + '/API_Check_POST_Data_Real_Estate_DB.php', newMember);
}


//APi Check Data availability in tenant db while landlord Registration
check_tenant_db_Data(newMember :Tenant_member) : Observable<Tenant_member[]>{
return this._http.post<Tenant_member[]>(this.PHP_API_SERVER + '/API_Check_POST_Data_Tenant_DB.php', newMember);
}



post_landlord_Data(newMember :Local_landlord_member) : Observable<Local_landlord_member[]>{
return this._http.post<Local_landlord_member[]>(this.PHP_API_SERVER + '/API_POST_Data_Landlord_DB(new).php', newMember);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// /////////////////////////////////////////APIs Used while Tenant Registration//////////////////////////////////////////
//API with Previous Tenant Reg Form
// check_post_tenant_db_Data(newMember :Tenant_member) : Observable<Tenant_member[]>{
// return this._http.post<Tenant_member[]>(this.PHP_API_SERVER + '/API_Check_DB_Data_For_Tenant.php', newMember);
// }

//API with Updated Tenant Reg Form
//Check Data in while Tenant Registration in Tenant DB
// check_post_tenant_db_Data(newMember :Tenant_member) : Observable<Tenant_member[]>{
//   return this._http.post<Tenant_member[]>(this.PHP_API_SERVER + '/API_Check_DB_Data_For_Tenant2.php', newMember);
//   }


check_post_tenant_db_Data(newMember :Tenant_member) : Observable<Tenant_member[]>{
    return this._http.post<Tenant_member[]>(this.Node_API_SERVER + '/signup_process_Ten/check_re_table', newMember);
  }

//Check Data in while Tenant Registration in Real Estate DB
// check_post_real_estate_db_Data(newMember :Tenant_member) : Observable<Tenant_member[]>{
// return this._http.post<Tenant_member[]>(this.PHP_API_SERVER + '/API_Check_RE_DB_Data_For_Tenant2.php', newMember);
// }

check_post_real_estate_db_Data(newMember :Tenant_member) : Observable<Tenant_member[]>{
  return this._http.post<Tenant_member[]>(this.Node_API_SERVER + '/signup_process_Ten/check_ten_table', newMember);
}

//Check Data in while Tenant Registration in Landlord DB
check_post_landlord_db_Data(newMember :Local_landlord_member) : Observable<Local_landlord_member[]>{
return this._http.post<Local_landlord_member[]>(this.PHP_API_SERVER + '/API_Check_Data_Landlord_DB_For_Tenant2.php', newMember);
}

//API with Previous Tenant Registration Form
// post_tenant_Data(newMember :Tenant_member) : Observable<Tenant_member[]>{
// return this._http.post<Tenant_member[]>(this.PHP_API_SERVER + '/API_POST_Data_Tenant_DB(new).php', newMember);
// }

// del_respective_temp_otp_ten(newMember :Real_estate_member): Observable<Real_estate_member[]>{
//   return this._http.post<Real_estate_member[]>(this.PHP_API_SERVER + '/API_Ten_OTP_Delete.php', newMember);
// }

del_respective_temp_otp_ten(newMember :Real_estate_member): Observable<Real_estate_member[]>{
  return this._http.post<Real_estate_member[]>(this.Node_API_SERVER + '/signup_process_Ten/Del_Resp_OTP', newMember);
}

ten_signup_otp_generate(newMember :Real_estate_member) : Observable<Real_estate_member[]> {
  return this._http.post<Real_estate_member[]>(this.PHP_API_SERVER + '/API_Ten_OTP_Gen.php', newMember);
}

// ten_otp_verify(newMember :any) : Observable<any[]> {
//   return this._http.post<any[]>(this.PHP_API_SERVER + '/API_Ten_OTP_Verify.php', newMember);
// }

ten_otp_verify(newMember :any) : Observable<any[]> {
  return this._http.post<any[]>(this.Node_API_SERVER + '/signup_process_Ten/Ten_Verify_OTP', newMember);
}

//API With Updated Tenant Reg Form
//   post_tenant_Data(newMember :any) : Observable<any[]>{
//   return this._http.post<any[]>(this.PHP_API_SERVER + '/API_POST_Data_Tenant_DB(new2).php', newMember);
// }


post_tenant_Data(newMember :any) : Observable<any[]>{
  return this._http.post<any[]>(this.Node_API_SERVER + '/signup_process_Ten/Post_Ten_User_Data', newMember);
}


ten_otp_resend(newMember :Real_estate_member): Observable<Real_estate_member[]>{
  return this._http.post<Real_estate_member[]>(this.PHP_API_SERVER + '/API_Ten_OTP_Resend.php', newMember);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////











get_respective_tenants_Data(newData : string) : Observable<Tenant_member[]>{
  return this._http.post<Tenant_member[]>(this.PHP_API_SERVER + '/API_GET_Tenant_Data_for_RE_Profile.php', newData);
}


checkpropertydetail(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Property_Data_Check.php', newData)
}

// getsubpropertyDetail(newData : any) : Observable<any> {
//   return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Sub_Property_Data.php', newData)
// }


///////////////////////////////////////////////Node///////////////////////////////////////////////
getsubpropertyDetail(newData : any) : Observable<any> {

  this.sessData = sessionStorage.getItem('sessionData');
  this.newsessData = JSON.parse(this.sessData);

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.newsessData.token}`
  })

  return this._http.post<any>(this.Node_API_SERVER + '/login_process_re/Prop_Unit_data', {newData}, {headers:headers})
}
//////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////Node/////////////////////////////////////////////////
getsubpropertyDBDetail(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Sub_Property_Data.php', newData)
}
/////////////////////////////////////////////////////////////////////////////////////////////////

get_subproperty_dashboard_Data(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Sub_Property_Dashboard_Data.php', newData)
}

get_payment_detail_Data(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Payments_Details_RE.php', newData)
}

check_ten_reg_inProperty(newData : any): Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_tenant_reg_inproperty.php', newData)
}

tenant_reg_in_property( newData : any): Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_POST_tenant_reg_inProperty.php', newData)
}

tenant_details(newData: any): Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_my_property_detail.php', newData)

}

// get_main_property_detail(newData : any) : Observable<any>{
//   return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Property_Detail.php', newData)

// }

///////////////////////////////////////////Node//////////////////////////////////////////////
get_main_property_detail(newData : any) : Observable<any>{

  this.sessData = sessionStorage.getItem('sessionData');
  this.newsessData = JSON.parse(this.sessData);

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.newsessData.token}`
  })

  return this._http.post<any>(this.Node_API_SERVER + '/login_process_re/Prop_Unit_Data', {newData}, {headers:headers})

}
////////////////////////////////////////////////////////////////////////////////////////////

check_sub_property_Data(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Sub_Property_Data_Check.php', newData)
}

get_subproperty_detail_for_form(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Sub_Property_Data_for_ten_reg_form.php', newData)
}

check_ten_status(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Tenant_status.php', newData)
}

get_payment_cred(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_RE_Payment_cred.php', newData)
}

get_access_token_request(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Payment_Access_Token.php', newData)
}

payment_gateway_redirection(newData : any) : Observable<any>{
  return this._http.post<any>('https://payments.pay2m.com/Ecommerce/api/Transaction/PostTransaction', newData)
}



Update_main_property_detail(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Update_Property_Data_test.php', newData)
}

del_property(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Delete_property_Data.php', newData)
}

Get_sub_property_detail(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Sub_Property_Data_for_update.php', newData)
}

del_sub_property(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Delete_Sub_property_Data.php', newData)
}

Get_Sub_Property_detail_for_Session(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Sub_Property_Data_Ten_reg.php', newData)
}

re_tenant_entry(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_POST_re_tenant_entry.php', newData)
}

Get_unreg_tenant_dasboard_Data(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_re_unreg_tenant_data_for_property_dashboard.php', newData)
}

Get_Reg_Tenant_detail(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_re_unreg_tenant_data_for_property_dashboard.php', newData)
}

Update_re_ten_detail(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Update_re_tenant_detail.php', newData)
}

Update_tenant_detail(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Update_tenant_profile_detail.php', newData)
}

Update_tenant_detail2(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Update_tenant_profile_detail2.php', newData)
}

set_payment_credentials(newData : any): Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_POST_RE_Payment_Credentials.php', newData)
}

post_transaction_data(newData : any): Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_POST_Transaction_response.php', newData)
}

get_payment_detail_Data_Tenant(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Payments_Details.php', newData)
}

Rent_Reminder(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_RE_Rent_Reminder.php', newData)
}

forget_password(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Forget_Password.php', newData)
}

check_tranxn_Data(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Payments_for_status.php', newData)
}

check_payment_existence(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Check_Payment_Existence.php', newData)
}

check_payment_existence_RE_Rec(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Check_Payment_Existence_RE_Rec.php', newData)
}


Get_Rec_Data(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Rec_Data_for_Ten.php', newData)
}


Init_Rec_Payment(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_Init_Rec_Payment.php', newData)
}

RE_Get_Rec_Data(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Rec_Data_for_RE.php', newData)
}

RE_Init_Rec_Payment(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_RE_Init_Rec_Payment.php', newData)
}

Get_Sub_Property_Data(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Sub_Property_Data_RE_Dashboard.php', newData)
}
//////////////////////////////////////////////Node//////////////////////////////////////////////////////////
Get_Sub_Property_DB_Data() : Observable<any> {

  this.sessData = sessionStorage.getItem('sessionData');
  this.newsessData = JSON.parse(this.sessData);

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.newsessData.token}`
  })

  return this._http.post<any>(this.Node_API_SERVER + '/login_process_re/DB_Unit_data',{},{headers:headers})
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get_All_Ten_Data(newData : any) : Observable<any> {
//   return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_All_Ten_Data_RE_Dashboard.php', newData)
// }

/////////////////////////////////////////////Node//////////////////////////////////////////////////////////
Get_All_Ten_Data() : Observable<any> {

  this.sessData = sessionStorage.getItem('sessionData');
  this.newsessData = JSON.parse(this.sessData);

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.newsessData.token}`
  })

  return this._http.post<any>(this.Node_API_SERVER + '/login_process_re/DB_Tenant_data',{}, {headers:headers})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get_Payment_Detail(newData : any) : Observable<any> {
//   return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Payments_Details_RE_All_Ten.php', newData)
// }


/////////////////////////////////////////Node/////////////////////////////////////////////////////////////
Get_Payment_Detail() : Observable<any> {

  this.sessData = sessionStorage.getItem('sessionData');
  this.newsessData = JSON.parse(this.sessData);

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.newsessData.token}`
  })

  return this._http.post<any>(this.Node_API_SERVER + '/login_process_re/Tenant_Payment_Data', {}, {headers:headers})
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////


Post_Active_Tenant_Data(newData : any) : Observable<any> {
  return this._http.post<any>(this.PHP_API_SERVER + '/API_POST_Active_Ten_Data.php', newData)
}


// Get_Registered_Tenant_Data(newData : any) : Observable<any> {
//   return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Registered_Ten_Data.php', newData)
// }

//////////////////////////////////////////Node///////////////////////////////////////////////////
Get_Registered_Tenant_Data() : Observable<any> {

  this.sessData = sessionStorage.getItem('sessionData');
  this.newsessData = JSON.parse(this.sessData);

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.newsessData.token}`
  })

  return this._http.post<any>(this.Node_API_SERVER + '/login_process_re/Registered_Ten_Data', {}, {headers:headers})
}
/////////////////////////////////////////////////////////////////////////////////////////////////

Get_tenant_Data(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_RE_Tenant_Data.php', newData)
}

Get_Ten_Dashboard_Data(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_RE_Tenant_Dashboard_Data.php', newData)
}

Tenant_End_Contract(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_RE_End_Contract.php', newData)
}


// Get_Monthly_Payment_Data(newData : any) : Observable<any>{
//   return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Payments_Details_for_RE_Bar_Chart.php', newData)
// }

////////////////////////////////////////////Node//////////////////////////////////////////////////////////////
Get_Monthly_Payment_Data() : Observable<any>{

  this.sessData = sessionStorage.getItem('sessionData');
  this.newsessData = JSON.parse(this.sessData);

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${this.newsessData.token}`
  })

  return this._http.post<any>(this.Node_API_SERVER + '/login_process_re/Tenant_Payment_Data_Bar_Chart', {}, {headers:headers})
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

Get_Subproperties_Data_Dashboard(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_Sub_Property_Data_RE_Dashboard.php', newData)
}

Get_Ten_Cont_detail(newData : any) : Observable<any>{
  return this._http.post<any>(this.PHP_API_SERVER + '/API_GET_RE_Tenant_Dashboard_cont_detail.php', newData)
}


get_user_details(newData : any) : Observable<any>{

  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `${newData}`
  })

  return this._http.post<any>(this.Node_API_SERVER + '/login_process_re/user_detail',{},{ headers: headers })
}


}
