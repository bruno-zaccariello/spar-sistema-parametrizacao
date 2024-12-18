import { NgModule } from "@angular/core";
import { ContentComponent } from "./components/content/content.component";
import { MenuComponent } from "./components/menu/menu.component";

@NgModule({
    imports: [ContentComponent, MenuComponent],
    providers: [],
    exports: []
})
export class SparModule { }