import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

const components = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule
];

@NgModule({
  imports: components,
  exports: components
})
export class MaterialModule {
}
