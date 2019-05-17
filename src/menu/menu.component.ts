import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isCollapsed = true;
  adr:any;

  constructor(private route: ActivatedRoute,private router: Router) { 
    route.params.subscribe(params => {this.adr = params['adr'];});
   }

  ngOnInit() {}
}
