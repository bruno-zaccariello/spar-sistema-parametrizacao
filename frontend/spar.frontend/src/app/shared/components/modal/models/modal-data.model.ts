import { ComponentRef, TemplateRef } from "@angular/core";
import { ModalOptions } from "./modal-options.model";
import { DialogRef } from "@angular/cdk/dialog";

export class ModalData<T = ComponentRef<any>> {
    constructor(
        public modalId: string,
        public modalContent?: TemplateRef<T>,
        public options?: ModalOptions
    ) { }

    public dialogRef?: DialogRef<any, any>;
}