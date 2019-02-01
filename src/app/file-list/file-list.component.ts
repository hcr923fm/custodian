import { Component, OnInit, Input } from '@angular/core';
import { FileListService } from '../file-list.service';
import { AudioFile } from '../audio-file';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  constructor(private flSvc: FileListService) { }

  public files: AudioFile[]
  @Input() public from_date: Date
  @Input() public to_date: Date
  private current_offset: number = 0

  ngOnInit() {
    this.flSvc.getFileList(this.from_date,
      this.to_date,
      this.current_offset + 1,
      20)
      .then((file_list) => {
        this.files = file_list
      })
  }

}
