import { DialogRef } from "@angular/cdk/dialog";
import { ModalEventType } from "../enums/modal-event-types.enum";
import { ModalData } from "./modal-data.model";

export class ModalEvent {
    constructor(
        public eventType: ModalEventType,
        public data: ModalData
    ) { }

}