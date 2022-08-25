import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
  tutorials: any;
  currentTutorial = {
    id:'',
    title: '',
    description: '',
    published: false
  };
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }
//done
  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {
      id:'',
      title: '',
      description: '',
      published: false
    };
    this.currentIndex = -1;
  }
  setActiveTutorial(tutorial:any, index:number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }
  //done
  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTutorials();
        },
        error => {
          console.log(error);
        });
  }

  //done
  searchTitle(): void {
    this.tutorialService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
