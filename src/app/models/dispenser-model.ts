export class DispenserModel {
    cameraOnOff: boolean = false;
    configure: {
        qunantitieDispense: number;
        scheduleOfFood: number;
    } | undefined;
    foodInContainer: number = 0;
    foodInPlate:number = 0;
    onOff: boolean = false;
}
