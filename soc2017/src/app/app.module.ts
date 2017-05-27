import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TopbarComponent } from './home/topbar/topbar.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { ModuleComponent } from './home/module/module.component';
import { WallComponent } from './home/module/wall/wall.component';
import { ModuleMatesComponent } from './home/module/module-mates/module-mates.component';
import { ChatroomComponent } from './home/module/chatroom/chatroom.component';
import { OfficialComponent } from './home/module/wall/official/official.component';
import { GeneralComponent } from './home/module/wall/general/general.component';
import { CourseComponent } from './home/course/course.component';
import { CourseConnectComponent } from './home/course/course-connect/course-connect.component';
import { ProgressChartComponent } from './home/course/progress-chart/progress-chart.component';
import { ConnectDiscoverComponent } from './home/course/course-connect/connect-discover/connect-discover.component';
import { ConnectRequestComponent } from './home/course/course-connect/connect-request/connect-request.component';
import { ConnectFriendsComponent } from './home/course/course-connect/connect-friends/connect-friends.component';
import { DropdownDirective } from './dropdown.directive';
import { UsersService } from './Users.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home/:firstName/:lastName' , component: HomeComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TopbarComponent,
    SidebarComponent,
    ModuleComponent,
    WallComponent,
    ModuleMatesComponent,
    ChatroomComponent,
    OfficialComponent,
    GeneralComponent,
    CourseComponent,
    CourseConnectComponent,
    ProgressChartComponent,
    ConnectDiscoverComponent,
    ConnectRequestComponent,
    ConnectFriendsComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
