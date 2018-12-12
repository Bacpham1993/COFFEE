import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


@Component({
  selector: 'page-th-ng-k',
  templateUrl: 'th-ng-k.html'
})
export class ThNgKPage {
thang:string;
URL: string = "http://works.medicafe.vn/";

public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[]=[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [], label: 'Tổng chi'},
    {data: [], label: 'Doanh thu'}
  ];
  constructor(private http: Http,private params: NavParams) {
	  let now = new Date();
	  this.thang = params.get('month');
	  this.getChart(this.thang,now.getFullYear());
  }
  getChart(month,year){
	  	 //BienDoi
		 
	
				  this.http.get(this.URL+'danhsach.php?id=1&thang='+month).map(res => res.json()).subscribe(data => {
					//  console.log(data.thu);
	
	
 this.barChartData = [
    {data: data.chi, label: 'Tổng chi'},
    {data: data.thu, label: 'Doanh thu'}];
	
		});
	this.barChartLabels = [];
			for(var f=1;f<=this.daysInMonth(month,year);f++){
			 this.barChartLabels.push(String(f));
			 }
			// console.log(this.barChartLabels);
	
  
			// console.log(this.barChartLabels)
			
  }
    public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  daysInMonth(iMonth, iYear) {
   return new Date(iYear, iMonth, 0).getDate();
}
  
}
