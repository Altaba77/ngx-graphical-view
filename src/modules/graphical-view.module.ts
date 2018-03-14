import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GraphicalViewComponent } from '../components/graphical-view.component/graphical-view.component';
import { GraphicalViewItemComponent } from '../components/graphical-view.component/graphical-view-item/graphical-view-item.component';

@NgModule({
    declarations: [
        GraphicalViewComponent,
        GraphicalViewItemComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        NgbModule.forRoot()
    ],
    exports: [
        GraphicalViewComponent,
        GraphicalViewItemComponent
    ]
})
// Consider registering providers using a forRoot() method
// when the module exports components, directives or pipes that require sharing the same providers instances.
// Consider registering providers also using a forChild() method
// when they requires new providers instances or different providers in child modules.
export class GraphicalViewModule {

    /**
     * Use in AppModule: new instance of SumService.
     */
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: GraphicalViewModule,
            providers: []
        };
    }

    /**
     * Use in features modules with lazy loading: new instance of SumService.
     */
    public static forChild(): ModuleWithProviders {
        return {
            ngModule: GraphicalViewModule,
            providers: []
        };
    }

}
