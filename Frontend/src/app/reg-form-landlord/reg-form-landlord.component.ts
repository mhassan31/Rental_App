import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {ApiService} from '../api.service';
import {User} from '../user';
import { Real_estate_member } from '../real_estate_member';
import { Tenant_member } from '../tenant_member';
import { Local_landlord_member } from '../local_landlord_member';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-reg-form-landlord',
  templateUrl: './reg-form-landlord.component.html',
  styleUrls: ['./reg-form-landlord.component.css']
})
export class RegFormLandlordComponent implements OnInit {
  real_estate_db_data_response_flag: any;
  tenant_db_Data_response_flag: any;
  landlord_current_form_data_response_flag: any;

  constructor(private  userdata: ApiService, private router :Router) { }

  landlord_current_form_data_var : any;
  landlord_post_data_response_flag : any = [];
  data : any;
  ngOnInit(): void {
  }



  post_landlord_reg_Data(landlord_current_form_data : any){

  
    console.log(landlord_current_form_data);

    this.userdata.check_landlord_db_Data(landlord_current_form_data).subscribe((landlord_post_data_response : any) => {
      this.landlord_post_data_response_flag = landlord_post_data_response;
      // console.log(this.landlord_post_data_response_flag);
      if(this.landlord_post_data_response_flag == null){
          console.log("Data does not exist in landlord DB please proceed to check data availability in real estate db");
          this.userdata.check_real_estate_db_Data(landlord_current_form_data).subscribe((real_estate_db_Data_response : any) => {
          this.real_estate_db_data_response_flag = real_estate_db_Data_response ;
          // console.log(this.real_estate_db_data_response_flag );
          if(this.real_estate_db_data_response_flag == null){
              console.log("Data does not exist in real_estate DB please proceed to check data availability in tenant db");
              this.userdata.check_tenant_db_Data(landlord_current_form_data).subscribe((tenant_db_Data_response : any) => {
              this.tenant_db_Data_response_flag = tenant_db_Data_response;
              if(this.tenant_db_Data_response_flag == null){
                console.log("Data does not exist in tenant DB please proceed to post data in as landlord");

                this.userdata.post_landlord_Data(landlord_current_form_data).subscribe((landlord_current_form_data_response : any) =>{
                  this.landlord_current_form_data_response_flag = landlord_current_form_data_response;
                
                  this.router.navigate(['/', 'userlogin']);
                })

              }else{
                console.log("Email address already exist as Tenant");
              }
            })

          }else{
              console.log("Email address already exist as Real Estate Member");
          }
        })

    }else{
      console.log("Email Address already exist as Landlord");
    }

    })



  }

}
