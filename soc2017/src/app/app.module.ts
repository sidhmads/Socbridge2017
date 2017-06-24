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
import { ChatComponent } from './home/module/chatroom/chat.component';
import { CourseComponent } from './home/course/course.component';
import { CourseConnectComponent } from './home/course/course-connect/course-connect.component';
import { ProgressChartComponent } from './home/course/progress-chart/progress-chart.component';
import { ConnectDiscoverComponent } from './home/course/course-connect/connect-discover/connect-discover.component';
import { ConnectRequestComponent } from './home/course/course-connect/connect-request/connect-request.component';
import { ConnectFriendsComponent } from './home/course/course-connect/connect-friends/connect-friends.component';
import { DropdownDirective } from './dropdown.directive';
import { UsersService } from './Users.service';
import { RouterModule, Routes } from '@angular/router';
import { QuillEditorModule } from 'ngx-quill-editor';
import { HttpService } from './http.service';
import { JwtHelper } from 'ng2-jwt';
import {WallService} from "./home/module/wall/Wall.service";
import { IVLEComponent } from './login/ivle/ivle.component';
import { WelcomeComponent } from './login/welcome/welcome.component';
import { ChatService } from './chat.service';



const appRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {path: 'welcome', component: WelcomeComponent},
  {path: 'IVLE', component: IVLEComponent},
  { path: 'home/:firstName', component: HomeComponent, children: [
    {path: 'course', component: CourseComponent, pathMatch: 'full' },
    {path: ':module', component: ModuleComponent, children: [
      {path: 'wall', component: WallComponent},
      {path: 'chat', component: ChatComponent}
    ]}
  ]},
  { path: '**', component: LoginComponent}
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
    ChatComponent,
    CourseComponent,
    CourseConnectComponent,
    ProgressChartComponent,
    ConnectDiscoverComponent,
    ConnectRequestComponent,
    ConnectFriendsComponent,
    DropdownDirective,
    IVLEComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    QuillEditorModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService, UsersService, JwtHelper, WallService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
