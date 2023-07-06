import { EmployeeService } from './../service/employee.service';
import { AfterViewInit, Component, ViewChild,OnInit, TemplateRef } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableDataSource, TableItem } from './table-datasource';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  @ViewChild('loadingIndicator') loadingIndicator!: TemplateRef<any>;
  dataSource: MatTableDataSource<any>;
  filterValue: string ='';
  isLoading: boolean = false;
  value = 'Clear me';

  displayedColumns = ['_id', 'firstName', 'lastName','userName','email','position','jobType','phoneNumber'];



  constructor(private http: HttpClient,private employeeService:EmployeeService) {
    this.dataSource = new MatTableDataSource<any>();
   }

  ngOnInit() {
    this.getEmployees();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return (
        data.firstName.toLowerCase().includes(filter.toLowerCase()) ||
        data.userName.toLowerCase().includes(filter.toLowerCase())
      );
    };
  }
  getEmployees(){
    let limit = 10;
    let skip = 1;

    this.employeeService.getAllEmployees().subscribe((data:any) => {
    limit = data.data.totalDocs
    this.dataSource = new MatTableDataSource<any>(data.data.docs);
      this.dataSource.paginator = this.paginator;

      this.paginator.page.subscribe(() => {
        skip = (this.paginator.pageIndex - 1) * this.paginator.pageSize;
        this.getDataWithLimitAndSkip(limit, skip);
      });

      this.getDataWithLimitAndSkip(limit, skip);
    });
  }
  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  getDataWithLimitAndSkip(limit: number, skip: number) {
    this.isLoading = true;
    let params = new HttpParams();
    params = params.append('limit', limit.toString());
    params = params.append('skip', skip.toString());

    this.http.get<any[]>('https://employee-xpert.onrender.com/admin-emp/', { params })
      .subscribe((data: any) => {
        this.dataSource.data = data.data.docs;
        this.isLoading = false;
      });
  }
}
