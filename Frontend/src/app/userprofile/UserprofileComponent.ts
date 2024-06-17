import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { AuthGuardService } from '../auth-guard.service';
import { filter, from, toArray } from 'rxjs';
import { Chart } from 'chart.js';




@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  newsessData: any;
  propertydataresult1: any;
  property_data_length: any;
  Sub_Property_Data_result: any;
  All_Ten_Data_Result: any;
  Sub_Property_rent: any;
  total_rent: number = 0;
  total_rent_Net: number = 0;
  Occupied_Properties_rent: any;
  Occupied_Properties_length: any;
  Occupied_Properties_Rent: any;
  Total_Rent_Occupied_Properties: any = 0;
  Array_length_Payment_Detail: any;
  Array_Payment_Detail: any;
  Total_Collected_Rent: any = 0;
  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;
  uploadForm!: FormGroup;
  paid: any;
  Paid_Tenant: any = [];
  Registered_Tenant_Data: any;
  Active_Tenant_Data: any;
  Active_Tenant_Payment_Data: any;
  Tenant_Current_Month_Payment_Status: any = [];


  ctx: any;
  config: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];
  Vacant_Properties: any;
  percentage: number = 0;
  percentage1: number = 0;
  January_data: any;
  February_data: any;
  March_data: any;
  April_data: any;
  May_data: any;
  June_data: any;
  July_data: any;
  August_data: any;
  September_data: any;
  October_data: any;
  November_data: any;
  December_data: any;
  length_January_data: any;
  Sum_January_Rent_Amount: any = 0;
  January_Rent_Amount: any = 0;
  Sum_February_Rent_Amount: any = 0;
  length_February_data: any;
  Sum_March_Rent_Amount: any = 0;
  Sum_April_Rent_Amount: any = 0;
  Sum_May_Rent_Amount: any = 0;
  Sum_June_Rent_Amount: any = 0;
  Sum_July_Rent_Amount: any = 0;
  Sum_August_Rent_Amount: any = 0;
  Sum_September_Rent_Amount: any = 0;
  Sum_October_Rent_Amount: any = 0;
  Sum_November_Rent_Amount: any = 0;
  Sum_December_Rent_Amount: any = 0;
  Sub_Property_Data_for_Status: any;
  Vacant_data: any;
  Occupied_data: any;
  Contract_End_Date: any;
  Contract_End_Year: any;
  Difference_in_Year: number | undefined;
  Contract_End_Month: any;
  Diference_in_Month: number | undefined;
  Array_Contract_Expiring: any = [];
  Each_Tenant_Data: any;
  InActive_data: any;
  InActive_data_length: any;
  Active_data: any;
  Active_data_length: any;
  Active_Contract_Percentage: number | undefined;
  InActive_Contract_Percentage: number | undefined;
  Contract_Expiring_Percentage: any;
  Active_Contract_not_Expiring: number | undefined;
  month1: any;
  newObject1 : any = [];
  newObject: any;


  constructor(private dataService: DataService, private userdata: ApiService, private _httpA: HttpClient, private fb: FormBuilder,
    private router: Router, private authService: AuthGuardService) { }

  sessData: any;

  ngOnInit(): void {

    this.sessData = sessionStorage.getItem('sessionData');
    this.newsessData = JSON.parse(this.sessData);

    this.month1 = this.month;

    // console.log(this.month1);
    switch (this.month1) {
      case 1:
        this.month1 = "January";
        break;

      case 2:
        this.month1 = "February";
        break;

      case 3:
        this.month1 = "March";
        break;

      case 4:
        this.month1 = "April";
        break;

      case 5:
        this.month1 = "May";
        break;

      case 6:
        this.month1 = "June";
        break;

      case 7:
        this.month1 = "July";
        break;

      case 8:
        this.month1 = "August";
        break;

      case 9:
        this.month1 = "September";
        break;

      case 10:
        this.month1 = "October";
        break;

      case 11:
        this.month1 = "November";
        break;

      case 12:
        this.month1 = "December";
        break;
    }


    this.userdata.get_re_db_propertyData().subscribe((propertydataresult: any) => {
      console.log(propertydataresult);
      this.propertydataresult1 = propertydataresult;
      this.property_data_length = this.propertydataresult1.length;
    });

    this.userdata.Get_Sub_Property_DB_Data().subscribe((Sub_Property_Data: any) => {
      this.Sub_Property_Data_result = Sub_Property_Data;
      this.Sub_Property_Data_for_Status = Sub_Property_Data;
      this.Sub_Property_Data_result = this.Sub_Property_Data_result.length;

      this.Sub_Property_rent = Sub_Property_Data;

      this.userdata.Get_All_Ten_Data().subscribe((Occupied_Properties: any) => {
        // console.log(Occupied_Properties);
        this.All_Ten_Data_Result = Occupied_Properties;
        this.All_Ten_Data_Result = this.All_Ten_Data_Result.length;

        this.Occupied_Properties_Rent = Occupied_Properties;

        this.Vacant_Properties = this.Sub_Property_Data_result - this.All_Ten_Data_Result;
        // console.log(this.Vacant_Properties);
        this.percentage = (this.All_Ten_Data_Result / this.Sub_Property_Data_result) * 100;

        // console.log(this.percentage)
        this.percentage1 = (this.Vacant_Properties / this.Sub_Property_Data_result) * 100;

        // console.log(this.percentage1)
        var xValues = ["Occupied", "Vacant"];
        var yValues = [this.percentage, this.percentage1];
        var barColors = ["#b91d47", "#00aba9"];

        // console.log(yValues);
        new Chart("myChart", {
          type: "pie",
          data: {
            labels: xValues,

            datasets: [{
              backgroundColor: barColors,
              data: yValues
            }]
          },
        });


        let j = 0;
        while (j <= this.Occupied_Properties_Rent.length - 1) {
          var StringToConvert_Occupied_Properties = Number(this.Occupied_Properties_Rent[j].sub_property_rent);
          this.Total_Rent_Occupied_Properties = this.Total_Rent_Occupied_Properties + StringToConvert_Occupied_Properties;
          j++;
        }


        this.userdata.Get_Payment_Detail().subscribe((Payment_Detail: any) => {

          this.Array_Payment_Detail = Payment_Detail;

          let k = 0;
          while (k <= this.Array_Payment_Detail.length - 1) {

            var Convert_Array_Payment_Detail = Number(this.Array_Payment_Detail[k].rent_amount);
            this.Total_Collected_Rent = this.Total_Collected_Rent + Convert_Array_Payment_Detail;

            k++;
          }




          var xValues = ["Total Rent " + this.month1, "Collected Rent " + this.month1];
          var yValues = [this.Total_Rent_Occupied_Properties, this.Total_Collected_Rent];
          var barColors = ["red", "green"];

          new Chart("myChart_3", {
            type: "bar",
            data: {
              labels: xValues,
              datasets: [{
                backgroundColor: barColors,
                data: yValues
              }]
            },
          });



        });


      });




      let i = 0;
      while (i <= this.Sub_Property_rent.length - 1) {

        var StringToConvert = this.Sub_Property_rent[i].sub_property_rent;
        var NumberValue = Number(StringToConvert);
        this.total_rent = this.total_rent + NumberValue;

        i++;
      }



    });

    // this.userdata.Get_All_Ten_Data(this.newsessData['real_estate_id']).subscribe((Occupied_Properties :any)=>{
    //   // console.log(Occupied_Properties);
    //   this.All_Ten_Data_Result = Occupied_Properties;
    //   this.All_Ten_Data_Result = this.All_Ten_Data_Result.length;
    //   this.Occupied_Properties_Rent = Occupied_Properties;
    //   let j=0;
    //   while(j<=this.Occupied_Properties_Rent.length-1){
    //     var StringToConvert_Occupied_Properties = Number(this.Occupied_Properties_Rent[j].sub_property_rent);
    //     this.Total_Rent_Occupied_Properties = this.Total_Rent_Occupied_Properties + StringToConvert_Occupied_Properties;
    //     j++;
    //   }
    // })
    // this.userdata.Get_Payment_Detail(this.newsessData['real_estate_id']).subscribe((Payment_Detail: any) => {
    //   this.Array_Payment_Detail = Payment_Detail;
    //   let k = 0;
    //   while (k <= this.Array_Payment_Detail.length - 1) {
    //     var Convert_Array_Payment_Detail = Number(this.Array_Payment_Detail[k].rent_amount);
    //     this.Total_Collected_Rent = this.Total_Collected_Rent + Convert_Array_Payment_Detail;
    //     k++;
    //   }
    // })
    this.userdata.Get_Registered_Tenant_Data().subscribe((response: any) => {
      this.Registered_Tenant_Data = response;

      // console.log(this.Registered_Tenant_Data);
      let i = 0;
      while (i <= this.Registered_Tenant_Data.length - 1) {

        this.Each_Tenant_Data = this.Registered_Tenant_Data[i];

        this.Contract_End_Date = this.Each_Tenant_Data.end_date;

        this.Contract_End_Year = this.Contract_End_Date[0] + this.Contract_End_Date[1] + this.Contract_End_Date[2] + this.Contract_End_Date[3];

        // console.log(this.Contract_End_Year);
        this.Difference_in_Year = this.Contract_End_Year - this.year;

        if (this.Difference_in_Year == 0) {

          this.Contract_End_Month = this.Contract_End_Date[5] + this.Contract_End_Date[6];

          this.Diference_in_Month = this.Contract_End_Month - this.month;

          // console.log(this.Diference_in_Month);
          if (this.Diference_in_Month <= 1) {

            this.Array_Contract_Expiring.push(this.Each_Tenant_Data);

            // console.log(this.Array_Contract_Expiring);
          }

        }

        i++;
      }

      // sessionStorage.setItem('Ten_Contract_Detail', JSON.stringify(this.Array_Contract_Expiring));
      // console.log(this.Array_Contract_Expiring);
      // console.log(this.Array_Contract_Expiring.length)
      const source = from(this.Registered_Tenant_Data);

      source.pipe(
        filter((a: any) => a.tenant_status == 'InActive'),
        toArray()
      ).subscribe((InActive: any) => {
        this.InActive_data = InActive;
        // console.log(this.January_data);
        this.InActive_data_length = this.InActive_data.length;

        // console.log(this.InActive_data)
        // console.log(this.InActive_data_length)
      });


      source.pipe(
        filter((a: any) => a.tenant_status == 'Active'),
        toArray()
      ).subscribe((Active: any) => {
        this.Active_data = Active;
        // console.log(this.January_data);
        this.Active_data_length = this.Active_data.length;

        // console.log(this.Active_data)
        // console.log(this.Active_data_length)
      });

      this.Active_Contract_Percentage = (this.Active_data.length / this.Registered_Tenant_Data.length) * 100;
      // console.log("Active Contracts% "+this.Active_Contract_Percentage);
      this.InActive_Contract_Percentage = (this.InActive_data_length / this.Registered_Tenant_Data.length) * 100;
      // console.log("InActive Contracts% "+this.InActive_Contract_Percentage);
      this.Contract_Expiring_Percentage = (this.Array_Contract_Expiring.length / this.Active_data.length) * this.Active_Contract_Percentage;
      // console.log(this.Contract_Expiring_Percentage);
      this.Active_Contract_not_Expiring = this.Active_Contract_Percentage - this.Contract_Expiring_Percentage;
      // console.log(this.Active_Contract_not_Expiring);
      var Tenant_Plot_xValues = ["Active", "Cont. Expiring", "InActive"];
      var Tenant_Plot_yValues = [this.Active_Contract_not_Expiring, this.Contract_Expiring_Percentage, this.InActive_Contract_Percentage];
      var Tenant_Plot_barColors = ["#b91d47", "#00aba9", "red"];

      // console.log(yValues);
      new Chart("myChart_2", {
        type: "doughnut",
        data: {
          labels: Tenant_Plot_xValues,

          datasets: [{
            backgroundColor: Tenant_Plot_barColors,
            data: Tenant_Plot_yValues
          }]
        },
      });

    });







    this.userdata.Get_Monthly_Payment_Data().subscribe((result: any) => {
      // console.log(result)
      const source = from(result);

      source.pipe(
        filter((a: any) => a.payment_month == 'January'),
        toArray()
      ).subscribe((January: any) => {
        this.January_data = January;
        // console.log(this.January_data);
        this.length_January_data = this.January_data.length;

        let i = 0;
        while (i <= this.January_data.length - 1) {

          var January_Rent_Amount = Number(this.January_data[i].rent_amount);
          this.Sum_January_Rent_Amount = this.Sum_January_Rent_Amount + January_Rent_Amount;
          // console.log(this.Sum_January_Rent_Amount);
          i++;
        }

      });


      source.pipe(
        filter((a: any) => a.payment_month == 'February'),
        toArray()
      ).subscribe((February: any) => {
        this.February_data = February;
        // console.log(this.February_data);
        this.length_February_data = this.February_data.length;

        let j = 0;
        while (j <= this.February_data.length - 1) {

          var February_Rent_Amount = Number(this.February_data[j].rent_amount);
          this.Sum_February_Rent_Amount = this.Sum_February_Rent_Amount + February_Rent_Amount;
          // console.log(this.Sum_February_Rent_Amount);
          j++;
        }
      });


      source.pipe(
        filter((a: any) => a.payment_month == 'March'),
        toArray()
      ).subscribe((March: any) => {
        this.March_data = March;
        // console.log(this.March_data);
        let k = 0;
        while (k <= this.March_data.length - 1) {

          var March_Rent_Amount = Number(this.March_data[k].rent_amount);
          this.Sum_March_Rent_Amount = this.Sum_March_Rent_Amount + March_Rent_Amount;
          // console.log(this.Sum_March_Rent_Amount);
          k++;
        }

      });


      source.pipe(
        filter((a: any) => a.payment_month == 'April'),
        toArray()
      ).subscribe((April: any) => {
        this.April_data = April;
        // console.log(this.April_data);
        let k = 0;
        while (k <= this.April_data.length - 1) {

          var April_Rent_Amount = Number(this.April_data[k].rent_amount);
          this.Sum_April_Rent_Amount = this.Sum_April_Rent_Amount + April_Rent_Amount;
          // console.log(this.Sum_April_Rent_Amount);
          k++;
        }

      });


      source.pipe(
        filter((a: any) => a.payment_month == 'May'),
        toArray()
      ).subscribe((May: any) => {
        this.May_data = May;
        // console.log(this.May_data);
        let k = 0;
        while (k <= this.May_data.length - 1) {

          var May_Rent_Amount = Number(this.May_data[k].rent_amount);
          this.Sum_May_Rent_Amount = this.Sum_May_Rent_Amount + May_Rent_Amount;
          // console.log(this.Sum_May_Rent_Amount);
          k++;
        }

      });


      source.pipe(
        filter((a: any) => a.payment_month == 'June'),
        toArray()
      ).subscribe((June: any) => {
        this.June_data = June;
        // console.log(this.June_data);
        let k = 0;
        while (k <= this.June_data.length - 1) {

          var June_Rent_Amount = Number(this.June_data[k].rent_amount);
          this.Sum_June_Rent_Amount = this.Sum_June_Rent_Amount + June_Rent_Amount;
          // console.log(this.Sum_June_Rent_Amount);
          k++;
        }

      });


      source.pipe(
        filter((a: any) => a.payment_month == 'July'),
        toArray()
      ).subscribe((July: any) => {
        this.July_data = July;
        // console.log(this.July_data);
        let k = 0;
        while (k <= this.July_data.length - 1) {

          var July_Rent_Amount = Number(this.July_data[k].rent_amount);
          this.Sum_July_Rent_Amount = this.Sum_July_Rent_Amount + July_Rent_Amount;
          // console.log(this.Sum_July_Rent_Amount);
          k++;
        }

      });


      source.pipe(
        filter((a: any) => a.payment_month == 'August'),
        toArray()
      ).subscribe((August: any) => {
        this.August_data = August;
        // console.log(this.August_data);
        let k = 0;
        while (k <= this.August_data.length - 1) {

          var August_Rent_Amount = Number(this.August_data[k].rent_amount);
          this.Sum_August_Rent_Amount = this.Sum_August_Rent_Amount + August_Rent_Amount;
          // console.log(this.Sum_August_Rent_Amount);
          k++;
        }

      });


      source.pipe(
        filter((a: any) => a.payment_month == 'September'),
        toArray()
      ).subscribe((September: any) => {
        this.September_data = September;
        // console.log(this.September_data);
        let k = 0;
        while (k <= this.September_data.length - 1) {

          var September_Rent_Amount = Number(this.September_data[k].rent_amount);
          this.Sum_September_Rent_Amount = this.Sum_September_Rent_Amount + September_Rent_Amount;
          // console.log(this.Sum_September_Rent_Amount);
          k++;
        }

      });


      source.pipe(
        filter((a: any) => a.payment_month == 'October'),
        toArray()
      ).subscribe((October: any) => {
        this.October_data = October;
        // console.log(this.October_data);
        let k = 0;
        while (k <= this.October_data.length - 1) {

          var October_Rent_Amount = Number(this.October_data[k].rent_amount);
          this.Sum_October_Rent_Amount = this.Sum_October_Rent_Amount + October_Rent_Amount;
          // console.log(this.Sum_October_Rent_Amount);
          k++;
        }

      });


      source.pipe(
        filter((a: any) => a.payment_month == 'November'),
        toArray()
      ).subscribe((November: any) => {
        this.November_data = November;
        // console.log(this.November_data);
        let k = 0;
        while (k <= this.November_data.length - 1) {

          var November_Rent_Amount = Number(this.November_data[k].rent_amount);
          this.Sum_November_Rent_Amount = this.Sum_November_Rent_Amount + November_Rent_Amount;
          // console.log(this.Sum_November_Rent_Amount);
          k++;
        }

      });


      source.pipe(
        filter((a: any) => a.payment_month == 'December'),
        toArray()
      ).subscribe((December: any) => {
        this.December_data = December;
        // console.log(this.December_data);
        let k = 0;
        while (k <= this.December_data.length - 1) {

          var December_Rent_Amount = Number(this.December_data[k].rent_amount);
          this.Sum_December_Rent_Amount = this.Sum_December_Rent_Amount + December_Rent_Amount;
          // console.log(this.Sum_December_Rent_Amount);
          k++;
        }

      });


      // var xValues = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
      // var yValues = [this.Sum_January_Rent_Amount, this.Sum_February_Rent_Amount, this.Sum_March_Rent_Amount, this.Sum_April_Rent_Amount, 
      //   this.Sum_May_Rent_Amount, this.Sum_June_Rent_Amount, this.Sum_July_Rent_Amount, this.Sum_August_Rent_Amount, this.Sum_September_Rent_Amount, 
      //   this.Sum_October_Rent_Amount, this.Sum_November_Rent_Amount, this.Sum_December_Rent_Amount];
      // var barColors = ["red", "green", "blue", "orange", "brown"];
      // new Chart("myChart_bar", {
      //   type: "bar",
      //   data: {
      //     labels: xValues,
      //     datasets: [{
      //       backgroundColor: barColors,
      //       data: yValues
      //     }]
      //   },
      //   // options: {
      //   //   legend: {
      //   //     display: false
      //   //   },
      //   //   title: {
      //   //     display: true,
      //   //     text: "World Wine Production 2018"
      //   //   }
      //   // }
      // });
    });





  }


  Vacant_Property_Data() {

    const source = from(this.Sub_Property_Data_for_Status);

    source.pipe(
      filter((a: any) => a.sub_property_status == 'Vacant'),
      toArray()
    ).subscribe((Vacant: any) => {
      this.Vacant_data = Vacant;
      // console.log(this.Vacant_data);
      sessionStorage.setItem('Dashboard_Data', JSON.stringify(this.Vacant_data));
      this.router.navigate(['/', 'dashboard-property-detail']);

    });





  }


  Occupied_Property_Data() {

    const source = from(this.Sub_Property_Data_for_Status);

    source.pipe(
      filter((a: any) => a.sub_property_status == 'Occupied'),
      toArray()
    ).subscribe((Occupied: any) => {
      this.Occupied_data = Occupied;
      // console.log(this.Occupied_data);
    });

    sessionStorage.setItem('Dashboard_Data', JSON.stringify(this.Occupied_data));
    this.router.navigate(['/', 'dashboard-property-detail']);








  }











  signout() {

    sessionStorage.removeItem('Tab_Data');
    sessionStorage.removeItem('property_type');
    sessionStorage.removeItem('sessionData_9');
    sessionStorage.removeItem('sessionData_8');
    sessionStorage.removeItem('sessionData_5');
    sessionStorage.removeItem('sessionData_4');
    sessionStorage.removeItem('sessionData_3');
    sessionStorage.removeItem('sessionData_2');
    sessionStorage.removeItem('sessionData');

    this.authService.logout();

    this.router.navigate(['/', 'userlogin']);

  }

  Onclick() {

    console.log(this.Registered_Tenant_Data);
    console.log(this.Array_Payment_Detail);

    let l = 0;
    while (l <= this.Registered_Tenant_Data.length - 1) {

      this.userdata.Post_Active_Tenant_Data(this.Registered_Tenant_Data[l]).subscribe((response: any) => {
        this.Active_Tenant_Payment_Data = response;
        this.Tenant_Current_Month_Payment_Status.push(this.Active_Tenant_Payment_Data);
      })

      l++;
    }

    // let m=0;
    // while(m<=this.Registered_Tenant_Data.length-1){
    //   let n=0;
    //   while(n<=this.Array_Payment_Detail.length - 1){

    //     if(this.Registered_Tenant_Data[m].payment_id == this.Array_Payment_Detail[n].payment_id ){

    //       console.log("this can be push");

    //       this.newObject = this.Registered_Tenant_Data[n];

    //      this.newObject = Object.assign({},this.newObject, {current_month_payment: 'Paid'});
    //     //  console.log(this.newObject);

    //     //  this.newObject1.push(this.newObject);
    //      this.newObject1.push(this.newObject);


    //     }else{

    //       console.log("This can't be push")

    //        this.newObject = this.Registered_Tenant_Data[n];

    //       this.newObject = Object.assign({},this.newObject, {current_month_payment: 'Not Yet Paid'});
    //       // console.log(this.newObject);

    //       // this.newObject1.push(this.newObject);
    //       this.newObject1.push(this.newObject);

    //     }
    //     n++;
    //   }
    //   m++;
    // }console.log(this.newObject1);


        //   let jsonObject = {
    //     key1: 'value1',
    //     key2: 'value2'
    // };
     
    // jsonObject = Object.assign({}, jsonObject, { newKey: 'newValue' });
    // console.log(jsonObject);


    this.dataService.sendData(this.Tenant_Current_Month_Payment_Status);
    // console.log(this.Tenant_Current_Month_Payment_Status);
    // const temp = this.Tenant_Current_Month_Payment_Status;
    // console.log(temp.length)
    // sessionStorage.setItem('Current', JSON.stringify(this.Tenant_Current_Month_Payment_Status));
    // console.log(JSON.stringify(temp))
    this.router.navigate(['/', 'tenant-payments']);
  }


  Cont_Expiring_Tenant() {


    sessionStorage.setItem('Ten_Contract_Detail', JSON.stringify(this.Array_Contract_Expiring));

    console.log(this.Array_Contract_Expiring);

    this.router.navigate(['/', 'ten-cont-details']);

  }


  Active_Ten() {

    sessionStorage.setItem('Ten_Contract_Detail', JSON.stringify(this.Active_data));

    console.log(this.Active_data);

    this.router.navigate(['/', 'ten-cont-details']);

  }


  InActive_ten() {



    sessionStorage.setItem('Ten_Contract_Detail', JSON.stringify(this.InActive_data));

    console.log(this.InActive_data);

    this.router.navigate(['/', 'ten-cont-details']);



  }










}
