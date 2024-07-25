import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DietChartComponent } from './diet-chart.component';
import { DietExpirationComponent } from './diet-expiration/diet-expiration.component';
import { FormDietComponent } from './form-diet/form-diet.component';
import { AssignDietComponent } from './assign-diet/assign-diet.component';

const routes: Routes = [
  { path: '', redirectTo: '/diet-chart/chart', pathMatch: 'full' },
  { path: 'chart', component: DietChartComponent },
  { path: 'expiration', component: DietExpirationComponent },
  { path: 'add-diet', component: FormDietComponent },
  { path: 'edit/:edit_id', component: FormDietComponent },
  { path: 'view/:view_id', component: FormDietComponent },
  { path: 'assign-diet/:type/:id', component: AssignDietComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietChartRoutingModule {}
