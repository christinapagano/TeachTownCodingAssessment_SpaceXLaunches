import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { SpaceXService } from '../services/spacex.service';
import { MediaModalComponent } from '../media.modal.component/media.modal';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.css'],
  standalone: true,
  imports: [NgFor, MatTableModule, MatPaginatorModule, MatSortModule],
})
export class LaunchesComponent implements OnInit {

  columnsToDisplay = ['flight_number', 'launch_year', 'rocket_name', 'details'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private spacexService: SpaceXService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // Fetch launch data from API response
    this.spacexService.getLaunches().subscribe(
      (data: any[]) => {
        // Add launch_year to each launch's data. The API response returns a full date
        data.forEach(launch => {
          launch.launch_year=launch.date_utc.substring(0,4)
        })
        // Assign values needed for table
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error fetching launches', error);
      }
    );
  }

  viewMediaLinksModal(launch: any) {
    //if (launch.links && launch.links.youtube_id) {
      // Navigate to YouTube link if available
    //  window.open(`https://www.youtube.com/watch?v=${launch.links.youtube_id}`, '_blank');
    //} else {
    //  console.log('No media links available for this launch');
    //}
    if (launch.links && launch.links.youtube_id) {
      this.dialog.open(MediaModalComponent, {
        width: '500px',
        data: { youtubeId: launch.links.youtube_id }
      });
    } else {
      console.log('No media links available for this launch');
    }
  }

  ngAfterViewInit() {
    if(this.dataSource){
      this.dataSource.paginator = this.paginator;
    }
  }

}
