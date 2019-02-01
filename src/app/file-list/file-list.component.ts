import { Component, OnInit } from '@angular/core';
import { FileListService } from '../file-list.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  constructor(private flSvc: FileListService) { }

  public files: string[]

  ngOnInit() {

  }

}
