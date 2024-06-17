import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { Console } from 'console';
import {ApiService} from '../api.service';
import {User} from '../user';

@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})
export class UsersignupComponent implements OnInit {
  result: any;
  fulldbdata: any;
  fulltenantdbdata:any;
  dbdata : any;
  tenantdbdata : any;
  arrlength : any;
  arrtenantlength : any;
  postdataflag = "";
  i: any=0;
  data: any;
  testdata: any;
  
  

  constructor(private  userdata: ApiService, private router :Router) { }

  ngOnInit(): void {}

  postUserData(data : User){
  
  console.warn(data)

  this.testdata = data;

  console.warn(this.testdata["accounttype"])


  // Line for testing)
  // this.userdata.postData(data).subscribe((result:any) => {
  //   console.log(result)}); 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  //API to POST Data in Landlord Database///////////////////////////////////////////////////////
if(this.testdata["accounttype"]=="landlord"){

  


    this.userdata.getData().subscribe((fulldbdata)  => {

      console.warn(fulldbdata)

      this.arrlength = fulldbdata.length;
      // console.log(this.arrlength);



      let i=0;
      while(i<=this.arrlength-1){

      this.dbdata = fulldbdata[i];

      //console.log(this.dbdata);
        
       if(this.dbdata["Email"] == data["Email"]){

         this.postdataflag = "Email Exist Press Reset If Password has been Forgotten";
        
          break;
         }
        else{
          this.postdataflag = "Post Data";
        }
        i++;
        
      }

       console.log(this.postdataflag);

       if (this.postdataflag == "Post Data"){

        console.log("Go Head Post Data into Database");


            this.userdata.postData(data).subscribe((result:any) => {
      console.log(result)});

          // this.router.navigate(['/', 'userlogin']);

      }
      
    
    });

  }
//API POST Data in Landlord Database END/////////////////////////////////////////////////////////////////////////



//API POST Data in Tenant Database ///////////////////////////////////////////////////////////////////////////////
  else if(this.testdata["accounttype"]=="tenant"){

    //console.log("Post Data to Tenant DB")

    this.userdata.gettenantData().subscribe((fulltenantdbdata)  => {

      console.warn(fulltenantdbdata)

      this.arrtenantlength = fulltenantdbdata.length;
      // console.log(this.arrlength);



      let i=0;
      while(i<=this.arrtenantlength-1){

      this.tenantdbdata = fulltenantdbdata[i];

      //console.log(this.dbdata);
        
       if(this.tenantdbdata["Email"] == data["Email"]){

         this.postdataflag = "Email Exist Press Reset If Password has been Forgotten";
        
          break;
         }
        else{
          this.postdataflag = "Post Data";
        }
        i++;
        
      }

       console.log(this.postdataflag);

       if (this.postdataflag == "Post Data"){

        console.log("Go Head Post Data into Database");


            this.userdata.posttenantData(data).subscribe((result:any) => {
      console.log(result)});

          // this.router.navigate(['/', 'userlogin']);

      }
      
    
    });

  }
  //API POST Data in Tenant Database END///////////////////////////////////////////////////////////////////////////////////////
    
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  }; 
  
 

  

}
