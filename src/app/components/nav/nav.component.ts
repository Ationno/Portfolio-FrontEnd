import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})

export class NavComponent {
    isLogged = false;
    navigationSubscription;     
    
    constructor(private tokenService: TokenService, private router: Router) {
        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
            	this.isLogged = this.tokenService.getToken() != null;
            }
          });
    }

    ngOnInit() {
        this.isLogged = this.tokenService.getToken() != null;
    }

    logOut(): void {
        this.tokenService.logOut();
    }
}
