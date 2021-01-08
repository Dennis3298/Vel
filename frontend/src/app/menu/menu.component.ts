import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  private route: ActivatedRoute

  onInterviewClick(): void{
    this.router.navigate(['/frageboegen'])
  }

  onErgebnisseClick(): void{
    this.router.navigate(['/frageboegenListe'])
  }

  ngOnInit(): void {
  }

}
