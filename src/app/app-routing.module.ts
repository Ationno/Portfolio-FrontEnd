import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
	{path: '', component: HomeComponent,  pathMatch: 'full', runGuardsAndResolvers: 'always',},
	{path: 'login', component: LoginComponent, pathMatch: 'full', runGuardsAndResolvers: 'always',},
	
];

@NgModule({
  	imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  	exports: [RouterModule]
})
export class AppRoutingModule { }
