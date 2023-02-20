import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { SkillElementComponent } from './components/skills/skill-element/skill-element.component';
import { FormSkillComponent } from './components/skills/form-skill/form-skill.component';
import { ProjectElementComponent } from './components/projects/project-element/project-element.component';
import { FormProjectComponent } from './components/projects/form-project/form-project.component';
import { EducationElementComponent } from './components/education/education-element/education-element.component';
import { FormEducationComponent } from './components/education/form-education/form-education.component';
import { FormAboutComponent } from './components/about/form-about/form-about.component';

/* const appRoutes: Routes = [
	{path: '', component: HomeComponent}
]
*/

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
  		HeaderComponent,
    	AboutComponent,
    	ExperienceComponent,
    	EducationComponent,
    	SkillsComponent,
    	ProjectsComponent,
    	FooterComponent,
    	SkillElementComponent,
     	FormSkillComponent,
      ProjectElementComponent,
      FormProjectComponent,
      EducationElementComponent,
      FormEducationComponent,
      FormAboutComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		//RouterModule.forRoot(appRoutes, {enableTracing: true})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
