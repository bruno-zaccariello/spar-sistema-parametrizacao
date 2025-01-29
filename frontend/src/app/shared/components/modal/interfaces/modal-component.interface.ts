import { TemplateRef } from "@angular/core";
import { ModalOptions } from "../models/modal-options.model";

export abstract class IModalComponent {
    abstract modalId: string;
    abstract options: ModalOptions;
    abstract modalTemplate: TemplateRef<any>;
}