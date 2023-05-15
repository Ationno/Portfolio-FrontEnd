import { Component } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	public responsive: boolean = false;
	constructor(public breakpointObserver: BreakpointObserver) {}

	ngOnInit() {
		this.breakpointObserver
			.observe(['(min-width: 400px)'])
			.subscribe((state: BreakpointState) => {
				if (state.matches) {
					this.responsive = true;
				} else {
					this.responsive = false;
				}
			});
	}
}
