import { Component, OnInit } from '@angular/core';
import * as firebase from  'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipeApp';
  ngOnInit()
  {
    firebase.initializeApp({
      apiKey: "AIzaSyCzgnNhVfH0Vq1qHE6eQxAcdgeBpuXs1Io",
      authDomain: "recipeapp26.firebaseapp.com",
    })
  }
}
