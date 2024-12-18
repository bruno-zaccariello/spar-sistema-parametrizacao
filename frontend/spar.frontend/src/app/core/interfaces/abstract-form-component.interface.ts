import { FormGroup } from "@angular/forms";
import { FormOf } from './../utils/form.util';

export abstract class AbstractFormComponent<T> {
    abstract form: FormGroup<{ [K in keyof FormOf<T>]: NonNullable<FormOf<T>[K]> }>;
    public getValue(): T {
        return (this.form.value as T);
    }
}