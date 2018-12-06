import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingupPage } from './singup';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    SingupPage,
  ],
  imports: [
    IonicPageModule.forChild(SingupPage),
  ],
  providers: [
    CidadeService,
    EstadoService
  ]
})
export class SingupPageModule {}
