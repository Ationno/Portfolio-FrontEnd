import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { About } from 'src/app/Interfaces/About';
import { AboutService } from 'src/app/service/about.service';
import { UiService } from 'src/app/service/ui.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from 'src/app/service/token.service';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css']
})
export class AboutComponent {
	public about: About = {id: 0, parrafo: "Null", imagen: {nombre: "", tipo: ""}};
	subscription?: Subscription;
	imageSource: any;
	isLogged = false;
	
	constructor(
		private aboutService: AboutService,
		private uiService: UiService,
		public sanitizer: DomSanitizer,
		private tokenService: TokenService
	) {}
	
	private textToImg(base64: Uint8Array | undefined) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${base64}`);
	}

	ngOnInit() {
		this.aboutService.get().subscribe((abouts) => {	
			if (abouts.length > 0) {
				this.about = abouts[0]	
			} else {
				this.about = {id: 0, parrafo: "Null", imagen: {nombre: "null", tipo: "null"}};
			}
			this.imageSource = this.textToImg(this.about.imagen.base64)
		})
		this.isLogged = this.tokenService.getToken() != null;
	}

	public toggleFormAbout() {
		this.uiService.toggleFormAbout();
	}

	public editAbout(about: About) {
		this.aboutService.edit(about).subscribe(() => {
			this.about = about;
			this.imageSource = this.textToImg(this.about.imagen.base64)
			this.ngOnInit()
		})
	}
}
