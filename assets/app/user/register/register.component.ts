import { Component, Input } from '@angular/core';
import { UserRegisterService } from './register.service';
import { User } from '../user.model';

@Component({
    selector: 'user-register',
    templateUrl: './register.component.html'

})

export class RegisterComponent {
    //getting the entered values by two way binding
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    success: boolean = false;
    failure: boolean = false;
    message: string;

    constructor(private registerService: UserRegisterService) { }

    onSubmit() {
        //Construct a new user of user.model.ts with the values entered on pressing submit
        const user = new User(
            this.firstName,
            this.lastName,
            this.username,
            this.password,
            this.confirmPassword,
            this.email
        )

        /*
        Calling the signUp function from the service to handle the register operation
        Gets back data and error messages then handling them by bootstrap alerts
        Setting the success and failure booleans to check on them in the html file
        */
        this.registerService.signUp(user)
            .subscribe(
            data => {
                this.failure = false;
                this.success = true;
                this.message = data.msg;
            },
            error => {
                this.success = false;
                this.failure = true;
                this.message = error.error.msg;
            }
            );
    };
}
