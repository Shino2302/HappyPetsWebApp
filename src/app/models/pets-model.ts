export class PetsModel {
    idPet:string = "";
    petAge:string = "";
    petName:string = "";
    petRace:string = "";
    petSize:string = "";
}
export class PetsWithIdModel{
    id:string = "";
    petAge:string = "";
    petName:string = "";
    petRace:string = "";
    petSize:string = "";
}

export class PetsWithIdModelAndDispenser{
    idPet:string = "";
    petAge:string = "";
    petName:string = "";
    petRace:string = "";
    petSize:string = "";
    foodInContainer:number = 0;
    foodInPlate:number = 0;
    onOff:boolean = false;
}