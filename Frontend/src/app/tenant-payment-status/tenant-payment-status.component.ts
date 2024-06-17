import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tenant-payment-status',
  templateUrl: './tenant-payment-status.component.html',
  styleUrls: ['./tenant-payment-status.component.css']
})
export class TenantPaymentStatusComponent implements OnInit {
  payment_status: any;
  tranxn_data: any;

  constructor(private route : ActivatedRoute, private userdata:ApiService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((result: any)=>{
      this.tranxn_data = result;
      if(result.err_code == '000'){
        
        this.payment_status = "Successful";

        this.userdata.check_tranxn_Data(this.tranxn_data).subscribe((result1:any)=>{

          if(result1==null){

          this.userdata.post_transaction_data(result).subscribe((res:any)=>{
            console.log(res);
          })

          }else{
            console.log("Data already posted by checkout API")
          }

        })
      }
      else{
        console.log("Payment Failure");
        this.payment_status = "Failure";
        
        this.userdata.check_tranxn_Data(this.tranxn_data).subscribe((result1:any)=>{

          if(result1==null){

          this.userdata.post_transaction_data(result).subscribe((res:any)=>{
            console.log(res);
          })

          }else{
            console.log("Data already posted by checkout API")
          }

        })
      }
    })
    
  }

}
