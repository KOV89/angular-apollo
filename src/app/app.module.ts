import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteHistoryService } from '../services/route-history.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [RouteHistoryService],
      useFactory:  (rhs: RouteHistoryService) => () => rhs,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
