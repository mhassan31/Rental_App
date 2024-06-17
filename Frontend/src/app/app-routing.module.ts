import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserprofileComponent } from './userprofile/UserprofileComponent';
import { UsersignupComponent } from './usersignup/usersignup.component';
import { HomeComponent } from './home/home.component';
import { MissionComponent } from './mission/mission.component';

import { TenantprofileComponent } from './tenantprofile/tenantprofile.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyUploadComponent } from './property-upload/property-upload.component';

import { SelectAccountTypeComponent } from './select-account-type/select-account-type.component';
import { RegFormRealEstateComponent } from './reg-form-real-estate/reg-form-real-estate.component';
import { RegFormLandlordComponent } from './reg-form-landlord/reg-form-landlord.component';
import { RegFormTenantComponent } from './reg-form-tenant/reg-form-tenant.component';
import { LandlordProfileComponent } from './landlord-profile/landlord-profile.component';
import { ReProfileSettingComponent } from './re-profile-setting/re-profile-setting.component';
import { ReTenantDetailsComponent } from './re-tenant-details/re-tenant-details.component';
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
import { TenRegOtpPopupComponent } from './reg-form-tenant/ten-reg-otp-popup/ten-reg-otp-popup.component';
import { ReProfilePswrdResetComponent } from './re-profile-setting/re-profile-pswrd-reset/re-profile-pswrd-reset.component';
import { ReAccSettingComponent } from './re-profile-setting/re-acc-setting/re-acc-setting.component';
import { RePaymentSettingsComponent } from './re-profile-setting/re-payment-settings/re-payment-settings.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UploadFormCompoundComponent } from './property-upload/upload-form-compound/upload-form-compound.component';
import { UploadFormVillaComponent } from './property-upload/upload-form-villa/upload-form-villa.component';
import { UploadFormVillaUnitComponent } from './property-upload/upload-form-villa-unit/upload-form-villa-unit.component';
import { UploadFormAparmentComponent } from './property-upload/upload-form-aparment/upload-form-aparment.component';
import { UploadFormOfficeComponent } from './property-upload/upload-form-office/upload-form-office.component';
import { UploadFormShowroomComponent } from './property-upload/upload-form-showroom/upload-form-showroom.component';
import { ApartmentDetailsComponent } from './property-details/apartment-details/apartment-details.component';
import { CompoundDetailsComponent } from './property-details/compound-details/compound-details.component';
import { VillaDetailsComponent } from './property-details/villa-details/villa-details.component';
import { OfficeDetailsComponent } from './property-details/office-details/office-details.component';
import { ShowroomDetailsComponent } from './property-details/showroom-details/showroom-details.component';
import { TenantDetailDashboardComponent } from './re-tenant-details/tenant-detail-dashboard/tenant-detail-dashboard.component';
import { TenantPaymentsComponent } from './userprofile/tenant-payments/tenant-payments.component';
import { TestComponent } from './property-details/test/test.component';
import { AuthGuard } from './auth.guard';
import { DashboardSubPropertiesComponent } from './userprofile/dashboard-sub-properties/dashboard-sub-properties.component';
import { DashboardPropertyDetailComponent } from './userprofile/dashboard-property-detail/dashboard-property-detail.component';
import { TenContDetailsComponent } from './userprofile/ten-cont-details/ten-cont-details.component';
import { ContRenewelFormComponent } from './property-dashboard/cont-renewel-form/cont-renewel-form.component';





const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'userlogin', component: UserloginComponent },
  { path: 'usersignup', component: UsersignupComponent },
  { path: 'userprofile', canActivate:[AuthGuard], component: UserprofileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'mission', component: MissionComponent },
  { path: 'tenantprofile', canActivate:[AuthGuard], component: TenantprofileComponent },

  {
    path: 'property-details', canActivate:[AuthGuard], component: PropertyDetailsComponent, children: [

      { path: 'apartment-details',  component: ApartmentDetailsComponent },
      { path: 'compound-details', component: CompoundDetailsComponent },
      { path: 'villa-details', component: VillaDetailsComponent },
      { path: 'office-details', component: OfficeDetailsComponent },
      { path: 'showroom-details', component: ShowroomDetailsComponent }

    ]
  },

  {
    path: 'property-upload', canActivate:[AuthGuard], component: PropertyUploadComponent, children: [

      { path: 'upload-form-compound', component: UploadFormCompoundComponent },
      { path: 'upload-form-villa', component: UploadFormVillaComponent },
      { path: 'upload-form-aparment', component: UploadFormAparmentComponent },
      { path: 'upload-form-villa-unit', component: UploadFormVillaUnitComponent },
      { path: 'upload-form-office', component: UploadFormOfficeComponent },
      { path: 'upload-form-showroom', component: UploadFormShowroomComponent }
    ]
  },

  { path: 'select-account-type', component: SelectAccountTypeComponent },
  { path: 'reg-form-real-estate', component: RegFormRealEstateComponent },
  { path: 'reg-form-landlord', component: RegFormLandlordComponent },
  { path: 'reg-form-tenant', component: RegFormTenantComponent },
  { path: 'landlord-profile', canActivate:[AuthGuard], component: LandlordProfileComponent },
  {
    path: 're-profile-setting',canActivate:[AuthGuard], component: ReProfileSettingComponent, children: [
      { path: 're-profile-pswrd-reset', component: ReProfilePswrdResetComponent },
      { path: 're-acc-setting', component: ReAccSettingComponent },
      { path: 're-payment-settings', component: RePaymentSettingsComponent }
    ]
  },
  { path: 're-tenant-details',canActivate:[AuthGuard], component: ReTenantDetailsComponent},
  { path: 'sub-property-detail',canActivate:[AuthGuard], component: SubPropertyDetailComponent },
  { path: 'sub-property-upload',canActivate:[AuthGuard], component: SubPropertyUploadComponent },
  { path: 'property-dashboard',canActivate:[AuthGuard], component: PropertyDashboardComponent },
  { path: 'tenant-reg-in-property',canActivate:[AuthGuard], component: TenantRegInPropertyComponent },
  { path: 'tenant-reg-in-subproperty',canActivate:[AuthGuard], component: TenantRegInSubpropertyComponent },
  { path: 'tenant-property-reg-form',canActivate:[AuthGuard], component: TenantPropertyRegFormComponent },
  { path: 'tenant-my-property',canActivate:[AuthGuard], component: TenantMyPropertyComponent },
  { path: 'tenant-payment-confirmation',canActivate:[AuthGuard], component: TenantPaymentConfirmationComponent },
  { path: 're-update-property-detail',canActivate:[AuthGuard], component: REUpdatePropertyDetailComponent },
  { path: 're-sub-property-update',canActivate:[AuthGuard], component: ReSubPropertyUpdateComponent },
  { path: 're-ten-property-entry',canActivate:[AuthGuard], component: ReTenPropertyEntryComponent },
  { path: 'tenant-my-property-detail',canActivate:[AuthGuard], component: TenantMyPropertyDetailComponent },
  { path: 're-update-tenant-entry',canActivate:[AuthGuard], component: ReUpdateTenantEntryComponent },
  { path: 'tenant-profile-update',canActivate:[AuthGuard], component: TenantProfileUpdateComponent },
  { path: 'tenant-payment-status',canActivate:[AuthGuard], component: TenantPaymentStatusComponent },
  { path: 'tenant-detail-dashboard', component: TenantDetailDashboardComponent },
  { path: 'tenant-payments', component: TenantPaymentsComponent },
  { path: 're-reg-otp-popup', component: ReRegOtpPopupComponent },
  { path: 'ten-reg-otp-popup', component: TenRegOtpPopupComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'test', component:  TestComponent },
  { path: 'dashboard-sub-properties', component: DashboardSubPropertiesComponent },
  { path: 'dashboard-property-detail', canActivate:[AuthGuard], component: DashboardPropertyDetailComponent },
  { path: 'ten-cont-details', canActivate:[AuthGuard], component: TenContDetailsComponent },
  { path: 'cont-renewel-form', canActivate:[AuthGuard], component: ContRenewelFormComponent }
  



];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration : 'enabled',
    relativeLinkResolution: 'legacy',
    useHash : true,
  })]
],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [UserloginComponent, UsersignupComponent, UserprofileComponent, HomeComponent, MissionComponent, PropertyDetailsComponent, PropertyUploadComponent,
  TenantprofileComponent, SelectAccountTypeComponent, RegFormRealEstateComponent, RegFormLandlordComponent, ReProfileSettingComponent,
  RegFormTenantComponent, LandlordProfileComponent, ReTenantDetailsComponent, SubPropertyDetailComponent, SubPropertyUploadComponent,
  PropertyDashboardComponent, TenantRegInPropertyComponent, TenantRegInSubpropertyComponent, TenantPropertyRegFormComponent,
  TenantMyPropertyComponent, TenantPaymentConfirmationComponent, REUpdatePropertyDetailComponent, ReSubPropertyUpdateComponent,
  ReTenPropertyEntryComponent, TenantMyPropertyDetailComponent, ReUpdateTenantEntryComponent, TenantProfileUpdateComponent,
  TenantPaymentStatusComponent, ReRegOtpPopupComponent, TenRegOtpPopupComponent, ReProfilePswrdResetComponent, ReAccSettingComponent,
  RePaymentSettingsComponent, ForgetPasswordComponent, UploadFormCompoundComponent, UploadFormVillaComponent, UploadFormAparmentComponent,
  UploadFormVillaUnitComponent, UploadFormOfficeComponent, UploadFormShowroomComponent, ApartmentDetailsComponent, CompoundDetailsComponent,
  VillaDetailsComponent, OfficeDetailsComponent, ShowroomDetailsComponent,  TestComponent, TenantDetailDashboardComponent, TenantPaymentsComponent, 
  DashboardSubPropertiesComponent, DashboardPropertyDetailComponent, TenContDetailsComponent, ContRenewelFormComponent]
