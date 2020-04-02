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
      apiKey: "AIzaSyDW0TJ3dnJ3D196uzZ2nvtyvoMy_-XmEj8",
      authDomain: "recipe-project-bb1a4.firebaseapp.com",
    })
  }
}
