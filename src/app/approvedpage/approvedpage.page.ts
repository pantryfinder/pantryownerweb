import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approvedpage',
  templateUrl: './approvedpage.page.html',
  styleUrls: ['./approvedpage.page.scss'],
})
export class ApprovedpagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  home(){
    this.router.navigate(['/approved']);
  }

}
