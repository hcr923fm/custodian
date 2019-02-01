import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { FileListComponent } from './file-list/file-list.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: "home",
    component: HomepageComponent
  },
  {
    path: "list",
    component: FileListComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FileListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
