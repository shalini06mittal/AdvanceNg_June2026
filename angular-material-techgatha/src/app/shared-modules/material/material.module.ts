import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatGridTile } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

const MATERIAL_MODULE = [
  MatButtonModule, MatIconModule, MatToolbarModule, MatGridListModule,
  MatFormFieldModule, MatInputModule, MatBadgeModule,
  MatSelectModule, MatDialogModule, MatChipsModule, MatMenuModule, MatDividerModule, MatSnackBarModule,
  MatPaginatorModule, MatSortModule, MatTooltipModule, MatNativeDateModule, DragDropModule, ScrollingModule,
  MatButtonModule, MatIconModule, MatToolbarModule, MatCheckboxModule, MatDatepickerModule, MatAutocompleteModule,
  MatSidenavModule, MatListModule,
  MatProgressSpinnerModule, MatCardModule, MatTabsModule,
  MatRadioModule, MatProgressBarModule, MatIconModule, MatListModule, MatSlideToggleModule,
  MatProgressSpinnerModule, MatToolbarModule, MatTableModule,
  MatButtonModule, MatSidenavModule, MatButtonToggleModule, MatGridListModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MATERIAL_MODULE
  ],
  exports: MATERIAL_MODULE
})
export class MaterialModule { }
