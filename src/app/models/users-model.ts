export class UsersModel {
    name:string = "";
    email:string ="";
    phoneNumber: string = "";
    password: string = "";
    profileImage: string = "";
}

export class AuthRegister{
    email:string = "";
    password: string = "";
    returnSecureToken: boolean = true;
}

interface ServerResponse{
    idToken: string;
  }