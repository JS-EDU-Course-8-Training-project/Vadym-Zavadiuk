import { NgModule } from '@angular/core';
import { EditorComponent } from './editor.component';
import { EditorResolver } from './editor-resolver.service';
import { SharedModule } from '../shared';
import { EditorRoutingModule } from './editor-routing.module';

@NgModule({
  imports: [SharedModule, EditorRoutingModule],
  declarations: [EditorComponent],
  providers: [EditorResolver],
})
export class EditorModule {}
