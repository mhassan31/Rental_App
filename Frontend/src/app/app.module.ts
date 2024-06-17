import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';



import {HttpClientModule} from '@angular/common/http';
import { DatahandlerComponent } from './datahandler/datahandler.component';
import {UserloginComponent} from './userlogin/userlogin.component';
import {UsersignupComponent} from './usersignup/usersignup.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
Chart.register(...registerables);

import { UserprofileComponent } from './userprofile/UserprofileComponent';
import { HomeComponent } from './home/home.component';


import { MissionComponent } from './mission/mission.component';

import { TenantprofileComponent } from './tenantprofile/tenantprofile.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { SelectAccountTypeComponent } from './select-account-type/select-account-type.component';
import { RegFormRealEstateComponent } from './reg-form-real-estate/reg-form-real-estate.component';
import { RegFormLandlordComponent } from './reg-form-landlord/reg-form-landlord.component';
import { RegFormTenantComponent } from './reg-form-tenant/reg-form-tenant.component';
import { LandlordProfileComponent } from './landlord-profile/landlord-profile.component';
import { ReProfileSettingComponent } from './re-profile-setting/re-profile-setting.component';
import { ReTenantDetailsComponent } from './re-tenant-details/re-tenant-details.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { SubPropertyDetailComponent } from './sub-property-detail/sub-property-detail.component';
import { SubPropertyUploadComponent } from './sub-property-upload/sub-property-upload.component';
import { PropertyDashboardComponent } from './property-dashboard/property-dashboard.component';
import { TenantRegInPropertyComponent } from './tenant-reg-in-property/tenant-reg-in-property.component';
import { TenantRegInSubpropertyComponent } from './tenant-reg-in-subproperty/tenant-reg-in-subproperty.component';
import { TenantPropertyRegFormComponent } from './tenant-property-reg-form/tenant-property-reg-form.component';
import { TenantMyPropertyComponent } from './tenant-my-property/tenant-my-property.component';
import { TenantPaymentConfirmationComponent } from './tenant-payment-confirmation/tenant-payment-confirmation.component';
import { REUpdatePropertyDetailComponent } from './re-update-property-detail/re-update-property-detail.component';
import { ReSubPropertyUpdateComponent } from './re-sub-property-update/re-sub-property-update.component';
import { ReTenPropertyEntryComponent } from './re-ten-property-entry/re-ten-property-entry.component';
import { TenantMyPropertyDetailComponent } from './tenant-my-property-detail/tenant-my-property-detail.component';
import { ReUpdateTenantEntryComponent } from './re-update-tenant-entry/re-update-tenant-entry.component';

import { TenantProfileUpdateComponent } from './tenant-profile-update/tenant-profile-update.component';
import { TenantPaymentStatusComponent } from './tenant-payment-status/tenant-payment-status.component';
import { ReRegOtpPopupComponent } from './re-reg-otp-popup/re-reg-otp-popup.component';
import { MatModule } from './appModule/mat.module';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';
import { TenRegOtpPopupComponent } from './reg-form-tenant/ten-reg-otp-popup/ten-reg-otp-popup.component';
import { ReProfilePswrdResetComponent } from './re-profile-setting/re-profile-pswrd-reset/re-profile-pswrd-reset.component';
import { ReAccSettingComponent } from './re-profile-setting/re-acc-setting/re-acc-setting.component';
import { RePaymentSettingsComponent } from './re-profile-setting/re-payment-settings/re-payment-settings.component';
import { PropertyUploadPopupComponent } from './property-upload/property-upload-popup/property-upload-popup.component';
import { PropertyUploadSuccessfulPopupComponent } from './property-upload/property-upload-successful-popup/property-upload-successful-popup.component';
import { SubPropUploadPopupComponent } from './sub-property-upload/sub-prop-upload-popup/sub-prop-upload-popup.component';
import { SubPropUploadSuccessPopupComponent } from './sub-property-upload/sub-prop-upload-success-popup/sub-prop-upload-success-popup.component';
import { PropertyOccupiedPopupComponent } from './property-dashboard/property-occupied-popup/property-occupied-popup.component';
import { UpdateTenEntryPopupComponent } from './re-update-tenant-entry/update-ten-entry-popup/update-ten-entry-popup.component';
import { UpdateSuccessPopupComponent } from './re-update-property-detail/update-success-popup/update-success-popup.component';
import { PropertyDelPopupComponent } from './property-details/property-del-popup/property-del-popup.component';
import { SubPropDelPopupComponent } from './sub-property-detail/sub-prop-del-popup/sub-prop-del-popup.component';
import { PayCredSetPopupComponent } from './re-profile-setting/re-payment-settings/pay-cred-set-popup/pay-cred-set-popup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PropertyEntrySuccessPopupComponent } from './re-ten-property-entry/property-entry-success-popup/property-entry-success-popup.component';
import { UploadFormCompoundComponent } from './property-upload/upload-form-compound/upload-form-compound.component';
import { UploadFormVillaComponent } from './property-upload/upload-form-villa/upload-form-villa.component';
import { UploadFormVillaUnitComponent } from './property-upload/upload-form-villa-unit/upload-form-villa-unit.component';
import { UploadFormAparmentComponent } from './property-upload/upload-form-aparment/upload-form-aparment.component';
import { UploadFormOfficeComponent } from './property-upload/upload-form-office/upload-form-office.component';
import { UploadFormShowroomComponent } from './property-upload/upload-form-showroom/upload-form-showroom.component';
import { CompoundDetailsComponent } from './property-details/compound-details/compound-details.component';
import { VillaDetailsComponent } from './property-details/villa-details/villa-details.component';
import { ApartmentDetailsComponent } from './property-details/apartment-details/apartment-details.component';
import { OfficeDetailsComponent } from './property-details/office-details/office-details.component';
import { ShowroomDetailsComponent } from './property-details/showroom-details/showroom-details.component';
import { TestComponent } from './property-details/test/test.component';
import { PaymentPaidPopupComponent } from './tenant-my-property-detail/payment-paid-popup/payment-paid-popup.component';
import { CardSavePermissionPopupComponent } from './tenant-my-property-detail/card-save-permission-popup/card-save-permission-popup.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardService } from './auth-guard.service';
import { RecTxnResultPopupComponent } from './tenant-my-property-detail/rec-txn-result-popup/rec-txn-result-popup.component';
import { PaymentStatusPopupComponent } from './property-dashboard/payment-status-popup/payment-status-popup.component';
import { UpdateConfirmPopupComponent } from './re-profile-setting/update-confirm-popup/update-confirm-popup.component';
import { TenProfileUpdateConfirmPopupComponent } from './tenant-profile-update/ten-profile-update-confirm-popup/ten-profile-update-confirm-popup.component';
import { TenantDetailDashboardComponent } from './re-tenant-details/tenant-detail-dashboard/tenant-detail-dashboard.component';
import { TenantPaymentsComponent } from './userprofile/tenant-payments/tenant-payments.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardSubPropertiesComponent } from './userprofile/dashboard-sub-properties/dashboard-sub-properties.component';
import { DashboardPropertyDetailComponent } from './userprofile/dashboard-property-detail/dashboard-property-detail.component';
import { TenContDetailsComponent } from './userprofile/ten-cont-details/ten-cont-details.component';
import { ProgressBarPopupComponent } from './property-dashboard/progress-bar-popup/progress-bar-popup.component';
import { ContRenewelFormComponent } from './property-dashboard/cont-renewel-form/cont-renewel-form.component';




// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DatahandlerComponent,
    UserloginComponent,
    UsersignupComponent,
    UserprofileComponent,
    HomeComponent,
  
    MissionComponent,

    TenantprofileComponent,
    PropertyDetailsComponent,
  
    SelectAccountTypeComponent,
    RegFormRealEstateComponent,
    RegFormLandlordComponent,
    RegFormTenantComponent,
    LandlordProfileComponent,
    ReProfileSettingComponent,
    ReTenantDetailsComponent,
    SubPropertyDetailComponent,
    SubPropertyUploadComponent,
    PropertyDashboardComponent,
    TenantRegInPropertyComponent,
    TenantRegInSubpropertyComponent,
    TenantPropertyRegFormComponent,
    TenantMyPropertyComponent,
    TenantPaymentConfirmationComponent,
    REUpdatePropertyDetailComponent,
    ReSubPropertyUpdateComponent,
    ReTenPropertyEntryComponent,
    TenantMyPropertyDetailComponent,
    ReUpdateTenantEntryComponent,
   
    TenantProfileUpdateComponent,
    TenantPaymentStatusComponent,
    ReRegOtpPopupComponent,
    ClickedOutsideDirective,
    TenRegOtpPopupComponent,
    ReProfilePswrdResetComponent,
    ReAccSettingComponent,
    RePaymentSettingsComponent,
    PropertyUploadPopupComponent,
    PropertyUploadSuccessfulPopupComponent,
    SubPropUploadPopupComponent,
    SubPropUploadSuccessPopupComponent,
    PropertyOccupiedPopupComponent,
    UpdateTenEntryPopupComponent,
    UpdateSuccessPopupComponent,
    PropertyDelPopupComponent,
    SubPropDelPopupComponent,
    PayCredSetPopupComponent,
    ForgetPasswordComponent,
    PropertyEntrySuccessPopupComponent,
    UploadFormCompoundComponent,
    UploadFormVillaComponent,
    UploadFormVillaUnitComponent,
    UploadFormAparmentComponent,
    UploadFormOfficeComponent,
    UploadFormShowroomComponent,
    CompoundDetailsComponent,
    VillaDetailsComponent,
    ApartmentDetailsComponent,
    OfficeDetailsComponent,
    ShowroomDetailsComponent,
    TestComponent,
    PaymentPaidPopupComponent,
    CardSavePermissionPopupComponent,
    RecTxnResultPopupComponent,
    PaymentStatusPopupComponent,
    UpdateConfirmPopupComponent,
    TenProfileUpdateConfirmPopupComponent,
    TenantDetailDashboardComponent,
    TenantPaymentsComponent,
    DashboardSubPropertiesComponent,
    DashboardPropertyDetailComponent,
    TenContDetailsComponent,
    ProgressBarPopupComponent,
    ContRenewelFormComponent,
    
    
    
        
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatModule,
    Ng2SearchPipeModule,
    NgChartsModule,
    

    

    
  ],
  providers: [AuthGuard, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
