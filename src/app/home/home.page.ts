import { Component, OnInit, OnDestroy } from '@angular/core';
import { MazeapiService } from '../shared/mazeapi.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { takeWhile, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit, OnDestroy {
  searchControl: FormControl = new FormControl();
  programsList: any;
  airdate: any;
  private alive: boolean;
  isLoading: boolean;
  isErr: boolean;

  constructor(private mas: MazeapiService) { }

  ngOnInit() {
    this.isErr = false;
    this.alive = true;
    this.getSchedules();
    this.setupSearch();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getSchedules() {
    this.isLoading = true;
    this.mas.getFullSchedule().pipe(
      takeWhile(() => this.alive),
      finalize(() => this.isLoading = false )
     )
    .subscribe(data => {
       this.programsList = data;
       console.log(data);
      }, error => {
        this.isErr = true;
        console.log(error);
      });
  }

  private setupSearch() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (query) {
        return this.mas.searchShows(query);
        } else {
          return this.mas.getFullSchedule();
        }
      })
    ).subscribe(shows => {
       console.log(shows);
      this.programsList = shows;
    });
  }

}
