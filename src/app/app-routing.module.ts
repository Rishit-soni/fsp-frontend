import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    data: { showMain: false },
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/auth/login/login.module').then((m) => m.LoginModule),
    data: { showMain: false },
  },
  {
    path: 'create-account',
    redirectTo: '/create-account/step-1',
    pathMatch: 'full',
  },
  {
    path: 'create-account/step-1',
    loadChildren: () =>
      import('./components/auth/signup/signup.module').then(
        (m) => m.SignupModule
      ),
    data: { showMain: false },
  },
  {
    path: 'create-account/step-2',
    loadChildren: () =>
      import('./components/auth/signup-step-two/signup-step-two.module').then(
        (m) => m.SignupStepTwoModule
      ),
    data: { showMain: false },
  },
  {
    path: 'create-account/step-3',
    loadChildren: () =>
      import(
        './components/auth/signup-step-three/signup-step-three.module'
      ).then((m) => m.SignupStepThreeModule),
    data: { showMain: false },
  },
  {
    path: 'add-gym',
    loadChildren: () =>
      import('./components/app/add-gym/add-gym.module').then(
        (m) => m.AddGymModule
      ),
    data: { showMain: false },
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-gym',
    loadChildren: () =>
      import('./components/app/add-gym/add-gym.module').then(
        (m) => m.AddGymModule
      ),
    data: { showMain: false },
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/app/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'membership-package',
    loadChildren: () =>
      import(
        './components/app/membership-package/membership-package.module'
      ).then((m) => m.MembershipPackageModule),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'diet-chart',
    loadChildren: () =>
      import('./components/app/diet-chart/diet-chart.module').then(
        (m) => m.DietChartModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'workout',
    loadChildren: () =>
      import('./components/app/workout/workout.module').then(
        (m) => m.WorkoutModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'measurement',
    loadChildren: () =>
      import('./components/app/measurement/measurement.module').then(
        (m) => m.MeasurementModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/app/register/register.module').then(
        (m) => m.RegisterModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'exercise',
    loadChildren: () =>
      import('./components/app/exercise/exercise.module').then(
        (m) => m.ExerciseModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./components/app/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'user-list',
    loadChildren: () =>
      import('./components/app/user/user.module').then((m) => m.UserModule),
    data: { showMain: false },
    canActivate: [AuthGuard],
  },
  {
    path: 'gym-list',
    loadChildren: () =>
      import('./components/app/gym-list/gym-list.module').then((m) => m.GymListModule),
    data: { showMain: false },
    canActivate: [AuthGuard],
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('./components/app/attendance/attendance.module').then(
        (m) => m.AttendanceModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'inquiry',
    loadChildren: () =>
      import('./components/app/inquiry/inquiry.module').then(
        (m) => m.InquiryModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'expense',
    loadChildren: () =>
      import('./components/app/expense/expense.module').then(
        (m) => m.ExpenseModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./components/app/product/product.module').then(
        (m) => m.ProductModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./components/app/sales/sales.module').then(
        (m) => m.SalesModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'purchase',
    loadChildren: () =>
      import('./components/app/purchase/purchase.module').then(
        (m) => m.PurchaseModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'pending-payment',
    loadChildren: () =>
      import('./components/app/pending-payment/pending-payment.module').then(
        (m) => m.PendingPaymentModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'receival-payment',
    loadChildren: () =>
      import('./components/app/receive-payment/receive-payment.module').then(
        (m) => m.ReceivePaymentModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'report-sales',
    loadChildren: () =>
      import('./components/app/report-sales/report-sales.module').then(
        (m) => m.ReportSalesModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./components/app/employee/employee.module').then(
        (m) => m.EmployeeModule
      ),
    data: { showMain: true },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
