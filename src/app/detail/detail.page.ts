import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MazeapiService } from '../shared/mazeapi.service';
import { takeWhile, finalize} from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
  showDetail: Object;
  private alive: boolean;
  isLoading: boolean;
  isErr: boolean;
  constructor(
    private route: ActivatedRoute,
    private mas: MazeapiService
  ) { }

  ngOnInit() {
    this.isErr = false;
    this.alive = true;
    this.route.params.pipe(
      takeWhile(() => this.alive)
     ).subscribe(
      params => {
        this.getShowDetails(params.id);
      }
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private getShowDetails(id: string) {
    this.isLoading = true;
    this.mas.getShowDetails(id)
    .pipe(
      takeWhile(() => this.alive),
      finalize(() => this.isLoading = false )
    )
    .subscribe(data => {
      this.showDetail = data;
      console.log(this.showDetail);
    }, error => {
      this.isErr = true;
      console.log(error);
    });
  }

}
