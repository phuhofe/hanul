import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@auth0/auth0-angular';

import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
      },

      {
        path: 'app-manager',
        loadChildren: () =>
          import('./app-manager/app-manager.module').then(
            (m) => m.AppManagerModule
          ),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./accounts/accounts.module').then((m) => m.AccountsModule),
      },
      {
        path: 'receivable',
        loadChildren: () =>
          import('./receivable/receivable.module').then(
            (m) => m.ReceivableModule
          ),
      },
      {
        path: 'finance',
        loadChildren: () =>
          import('./finance/finance.module').then((m) => m.FinanceModule),
      },

      {
        path: 'inventory',
        loadChildren: () =>
          import('./inventory/inventory.module').then((m) => m.InventoryModule),
      },

      {
        path: 'loss',
        loadChildren: () =>
          import('./loss/loss.module').then((m) => m.LossModule),
      },

      {
        path: 'contacts',
        loadChildren: () =>
          import('./contacts/contacts.module').then((m) => m.ContactsModule),
      },

      {
        path: 'cashflow',
        loadChildren: () =>
          import('./cashflow/cashflow.module').then((m) => m.CashflowModule),
      },

      {
        path: 'payable-receivable',
        loadChildren: () =>
          import('./payable-receivable/payable-receivable.module').then(
            (m) => m.PayableReceivableModule
          ),
      },

      {
        path: 'tax-office',
        loadChildren: () =>
          import('./tax-office/tax-office.module').then(
            (m) => m.TaxOfficeModule
          ),
      },

      {
        path: 'accounting',
        redirectTo: 'payable-receivable',
      },

      {
        path: 'manager',
        loadChildren: () =>
          import('./manager/manager.module').then((m) => m.ManagerModule),
      },

      {
        path: 'history',
        loadChildren: () =>
          import('./history/history.module').then((m) => m.HistoryModule),
      },

      {
        path: 'cost-price',
        loadChildren: () =>
          import('./cost-price/cost-price.module').then(
            (m) => m.CostPriceModule
          ),
      },

      {
        path: 'payable-receivable',
        loadChildren: () =>
          import('./payable-receivable/payable-receivable.module').then(
            (m) => m.PayableReceivableModule
          ),
      },

      {
        path: 'payable',
        loadChildren: () =>
          import('./payable/payable.module').then(
            (m) => m.PayableModule
          ),
      },
      
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'orders',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
