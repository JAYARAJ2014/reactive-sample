import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  apiUrl = 'http://localhost:4300/enroll';
  constructor(private httpClient : HttpClient) { }

  register(userData) {
    return this.httpClient.post<any>(this.apiUrl,userData);
  }
}
