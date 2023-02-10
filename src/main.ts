import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
/* import showAddSkill from './app/components/skills/skills.component' */


platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => console.error(err));
