import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'posts', loadChildren: './posts/posts.module#PostsPageModule' },
  { path: 'main', loadChildren: './main/main.module#MainPageModule' },
  { path: 'did', loadChildren: './did/did.module#DidPageModule' },
  { path: 'badges', loadChildren: './badges/badges.module#BadgesPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
