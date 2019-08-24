import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
export class BatchmatesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['name', 'deptName', 'contacts'];
  depts = [
    {value: '', viewValue: 'All Dept.'},
    {value: 'Civil', viewValue: 'Civil'},
    {value: 'Mech', viewValue: 'Mech'},
    {value: 'EEE', viewValue: 'EEE'},
    {value: 'ECE', viewValue: 'ECE'}
  ];
  selectedDept = '';
  dataSub: Subscription;
  filterText = '';
  filterNameSub: Subscription;
  filterDeptSub: Subscription;
  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  filterValues = {
    name: '',
    dept: ''
  };

  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSelect) selector: MatSelect;
  // @ViewChild(MdPaginator) paginator: MdPaginator;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.dataSub = this.dataService.getBatchmates().subscribe( data => {
      this.dataSource.data = data;
      this.isLoadingResults = false;
    });
    this.dataSource.filterPredicate = this.batchmatesFilter();
  }

  ngAfterViewInit() {
    this.filterNameSub = fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(debounceTime(150))
    .pipe(distinctUntilChanged())
    .subscribe(() => {
      if (!this.dataSource) { return; }
      this.filterValues.name = this.filter.nativeElement.value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.filterDeptSub = this.selector.valueChange
      .subscribe(() => {
      if (!this.dataSource) { return; }
      this.filterValues.dept = this.selector.value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe && this.dataSub.unsubscribe();
    this.filterNameSub.unsubscribe && this.filterNameSub.unsubscribe();
    this.filterDeptSub.unsubscribe && this.filterDeptSub.unsubscribe();
  }

  batchmatesFilter(): (data: any, filter: string) => boolean {
    return (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      return (data.firstName + data.lastName).toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1
      && (data.dept === searchTerms.dept || searchTerms.dept === '');
    };
  }

  sendEmail(email: string) {
    console.log('write to' + email);
    // window.location.href = 'mailto:' + email;
  }

  callPhone(phone: string) {
    console.log('calling' + phone);
    // window.location.href = 'tel:' + phone;
  }

  clearFilterText() {
    this.filterText = '';
    this.filterValues.name = '';
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  clearSelectedDept() {
    this.selectedDept = '';
    this.filterValues.dept = '';
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  viewProfile(key: string) {
    console.log('View Profile:' + key);
    this.router.navigate(['/profile', {userId: key}], { skipLocationChange: true });
  }
}
