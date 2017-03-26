import { Component, OnInit } from '@angular/core';
import { ScientistService } from '../shared/services/name-list/name-list.service';


/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];

  /**
   * Creates an instance of the HomeComponent with the injected
   * ScientistService.
   *
   * @param {ScientistService} nameListService - The injected ScientistService.
   */
  constructor(public nameListService: ScientistService) {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.list()
        .subscribe(
            names => this.names = names,
            error => this.errorMessage = <any>error
        );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameListService
        .post(this.newName)
        .then((res) => {
          if (res) {
            this.names.push(this.newName);
            this.newName = '';
          } else {
            this.errorMessage = 'Your name sounds bad.';
          }
        })
    return false;
  }

  deleteName(name:string):boolean {
    if (confirm('Really? You think ' + name + ' is not a scientist?'))
      this.nameListService.delete(name)
          .then((res:boolean) => {
            if (res)
              this.getNames();
          });
      //alert('Maybe later');

    return false;
  }
}
