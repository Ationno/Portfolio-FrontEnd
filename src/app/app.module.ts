import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ExperienceElementComponent } from './components/experience/experience-element/experience-element.component';
import { FormExperienceComponent } from './components/experience/form-experience/form-experience.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LayoutModule } from '@angular/cdk/layout';

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
      FormAboutComponent,
      ExperienceElementComponent,
      FormExperienceComponent,
      HomeComponent,
      LoginComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		LayoutModule,
		ReactiveFormsModule,
		NgCircleProgressModule.forRoot({
			// set defaults here
			radius: 100,
			outerStrokeWidth: 16,
			innerStrokeWidth: 8,
			outerStrokeColor: "#78C000",
			innerStrokeColor: "#C7E596",
			animationDuration: 300,
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
