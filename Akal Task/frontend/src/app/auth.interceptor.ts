import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req:any,next:any) {
    let tokenizedReq=req.clone({
      setHeaders:{
        Authorization:`bearer ${localStorage.getItem('fhjsadhgvsd132vbjf@njnfe')}`
      }
    })

    return next.handle(tokenizedReq)
  }
}
