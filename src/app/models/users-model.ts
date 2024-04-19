//con imagen
export class UsersModel {
    name:string = "";
    email:string ="";
    phoneNumber: string = "";
    password: string = "";
    profileImage: string = "";
}
export class UserModel {
    email:string ="";
    idUser:string = "";
    name:string = "";
    password: string = "";
    phoneNumber: string = "";
}

//Modelo auxiliar para solicitar Token y UID de Firebase Auth:
export class AuthRegister{
    email:string = "";
    password: string = "";
    returnSecureToken: boolean = true;
}

//Método para hacer una consulta a la base de datos y verificar si existe el usuario manualmente:
export class LoginModel{
    email:string = "";
    password:string = "";
}

interface ServerResponse{
    idToken: string;
  }