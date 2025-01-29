import { AbstractControl } from "@angular/forms";

export type FormOf<T> = {
    [K in keyof T]: AbstractControl<T[K]>;
};