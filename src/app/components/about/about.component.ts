import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { About } from 'src/app/Interfaces/About';
import { AboutService } from 'src/app/service/about.service';
import { UiService } from 'src/app/service/ui.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css']
})
export class AboutComponent {
	public about: About = {id: 0, parrafo: "", img: {titulo: "", tipo: "", base64: ""}};
	subscription?: Subscription;
	imageSource: any;
	
	constructor(
		private aboutService: AboutService,
		private uiService: UiService,
		public sanitizer: DomSanitizer
	) {}

	ngOnInit() {
		this.aboutService.get().subscribe((abouts) => {	
			this.about = abouts[0]
			this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.about.img.base64}`);
		})
	}

	public toggleFormAbout() {
		this.uiService.toggleFormAbout();
	}

	public editAbout(about: About) {
		this.aboutService.edit(about).subscribe(() => {
			this.about = about;
			this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.about.img.base64}`);
		})
	}
}
