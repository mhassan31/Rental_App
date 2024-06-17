import { AbstractControl } from "@angular/forms";

 

export function passwordMismatch(pswrd: string, c_pswrd: string) {

 

    return function (form: AbstractControl) {

       

        const passwordValue = form.get(pswrd)?.value

        const confirmPasswordValue = form.get(c_pswrd)?.value

 

        if (passwordValue === confirmPasswordValue)
            {
                return null;
            }
            else{
            return { passwordMismatchError: true }
            }
    }

 

}