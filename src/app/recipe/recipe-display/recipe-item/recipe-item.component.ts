import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/recipe';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input() recipe:Recipe;
 public authStatus:boolean=false;
  constructor(private router:Router,private authService:AuthService) { 
    this.authService.authStatus.subscribe((status:boolean)=>{
      this.authStatus=status
    })
  }

  ngOnInit(): void {
  }
  viewDetails(id:number){
    console.log({id})
    this.router.navigate([`recipes/details/${id}`])
  }
}
