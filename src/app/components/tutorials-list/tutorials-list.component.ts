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
  title  = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.searchTitle();
    this.retrieveTutorials();
  }

  // get param

  getRequestParams(searchTitle:string, page: number, pageSize: number){
    // tslint:disable-next-line:prefer-const
    let params = {};
  
    return params;
  }
//done
  retrieveTutorials(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    this.tutorialService.getAll(params)
      .subscribe(
        response=> {
          const { tutorials, totalItems } = response;
          this.tutorials = tutorials;
          this.count = totalItems;
        },
        error => {
          console.log(error);
        });
  }
//paginationa


  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveTutorials();
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
