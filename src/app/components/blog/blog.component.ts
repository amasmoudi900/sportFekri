import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  articlesTab: any = [
    { id: 1, date: "15/02/2022", title: "Title 1", description: "Description 1", img: "assets/images/img_1.jpg" },
    { id: 2, date: "17/02/2022", title: "Title 2", description: "Description 2", img: "assets/images/img_2.jpg" },
    { id: 3, date: "12/02/2022", title: "Title 3", description: "Description 3", img: "assets/images/img_3.jpg" }
  ]
  constructor() { }

  ngOnInit() {
  }

}
