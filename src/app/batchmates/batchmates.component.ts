import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material';

import { MatTableDataSource } from '@angular/material';
import { DataService } from '../service/data.service';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-batchmates',
  templateUrl: './batchmates.component.html',
  styleUrls: ['./batchmates.component.css']
})
export class BatchmatesComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'deptName', 'contacts'];
  depts = [
    {value: '0', viewValue: 'All'},
    {value: '1', viewValue: 'Civil'},
    {value: '2', viewValue: 'Mech'},
    {value: '3', viewValue: 'EEE'},
    {value: '4', viewValue: 'ECE'}
  ];
  filterText = '';
  filterSub: Subscription;
  selectedDept = '0';
  dataSource = new MatTableDataSource();
  isLoadingResults = true;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSelect) selector: MatSelect;
  // @ViewChild(MdPaginator) paginator: MdPaginator;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.dataService.getBatchmates().subscribe( data => {
      this.dataSource.data = data;
      this.isLoadingResults = false;
    });

    this.filterSub = fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(debounceTime(150))
    .pipe(distinctUntilChanged())
    .subscribe(() => {
      if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  ngOnDestroy() {
    this.filterSub.unsubscribe && this.filterSub.unsubscribe();
  }

  sendEmail(email) {
    console.log('write to' + email);
    // window.location.href = 'mailto:' + email;
  }

  callPhone(phone) {
    console.log('calling' + phone);
    // window.location.href = 'tel:' + phone;
  }

  clearFilterText() {
    this.filterText = '';
    this.dataSource.filter = '';
  }

  viewProfile(key: string) {
    console.log('View Profile:' + key);
    this.router.navigate(['/profile', {userId: key}], { skipLocationChange: true });
  }
}
