import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AudioFile } from './audio-file';


@Injectable({
  providedIn: 'root'
})
export class FileListService {

  constructor(private httpClient: HttpClient) { }

  private last_check_time: Date
  private audio_file_list: AudioFile[]

  private parseFileName(file_name: string): Date {
    let date_string_full = file_name.split(".")[0]

    let date_string = date_string_full.split(" ")[0]
    let time_string = date_string_full.split(" ")[1]

    let year = +date_string.split("-")[0]
    let month = +date_string.split("-")[1] - 1 // Month index is 0-based
    let day = +date_string.split("-")[2]

    let hour = +time_string.substr(0, 2)
    let min = +time_string.substr(2, 2)
    let sec = +time_string.substr(4, 2)

    return new Date(year, month, day, hour, min, sec)
  }

  private updateFileList(): Promise<AudioFile[]> {

    return this.httpClient.get<any>(`//${process.env["CUSTODIAN_HOST"]}:8080/file_list`)
      .toPromise()
      .then((file_list) => {
        return <string[]>file_list
      })
      .then((file_names) => {
        return file_names.sort()
      })
      .then((file_names) => {
        this.last_check_time = new Date()
        return file_names.map((file_name) => {
          return <AudioFile>{
            download_link: `//${process.env["CUSTODIAN_HOST"]}:8080/file/${file_name}`,
            file_name: file_name,
            start_date: this.parseFileName(file_name)
          }
        })
      })
  }

  async getFileList(from: Date, to: Date, start: number, limit: number): Promise<AudioFile[]> {
    let files: AudioFile[] = []
    let one_hour_ago = new Date().setUTCHours(new Date().getUTCHours() - 1)

    if (!this.last_check_time || this.last_check_time.getUTCDate() < one_hour_ago || !this.audio_file_list) {
      this.audio_file_list = await this.updateFileList()
    }

    return this.audio_file_list
  }
}
