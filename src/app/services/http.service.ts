import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserData } from '@port/interfaces';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public link: string = 'http://localhost:27182/api'
  private SECRET = 'EAAFCE8ECC522E391DEC31D8F5C54';
  constructor(private http: HttpClient) { }

  getFile() {
    return this.http.get(`${this.link}/file?path=data-files/house-quality.txt`);
  }
  sendMessage(data: any) {
    return this.http.post(`${this.link}/messages`, { data });
  }

  // TODO: JWT
  login(data: any): Observable<any> {
    return this.http.get(`${this.link}/login`, { headers: {
      'Authorization': `Bearer ${CryptoJS.AES.encrypt(JSON.stringify(data), this.SECRET).toString()}`
    }});
  }
  registration(data: any): Observable<any> {
    return this.http.post(`${this.link}/users`, { data: CryptoJS.AES.encrypt(JSON.stringify(data), this.SECRET).toString() });
  }
  forget(data: any) {
    return this.http.post(`${this.link}/forget`, { data });
  }
  newPassword(data: any) {
    return this.http.post(`${this.link}/new-password`, { data });
  }
  updateUser(id: null | string, data: any) {
    return this.http.post(`${this.link}/update/${id}`, { data });
  }

  getExperts(): Observable<any> {
    return this.http.get(`${this.link}/users?filter=EXPERT`);
  }
  getAllExpertise(id: null | string) {
    return this.http.get(`${this.link}/expertise?project=${id}`);
  }
  getExpertise(id: null | string) {
    return this.http.get(`${this.link}/expertise/${id}`);
  }
  addExpertise(data: any, id: null | string) {
    return this.http.post(`${this.link}/expertise?project=${id}`, { data });
  }
  removeExpertise(id: string, idProj: null | string) {
    return this.http.delete(`${this.link}/expertise/${id}?project=${idProj}`);
  }
  updateExpertise(data: any) {
    return this.http.put(`${this.link}/expertise`, { data });
  }


  getAllProjects(token: string) {
    return this.http.get(`${this.link}/enterprise-log?token=${token}`);
  }
  getProject(id: string) {
    return this.http.get(`${this.link}/enterprise-log/${id}`);
  }
  updateProject(id: string, data: any) {
    return this.http.put(`${this.link}/enterprise-log/${id}`, { data });
  }
  createProject(data: any, token: string) {
    return this.http.post(`${this.link}/enterprise-log?token=${token}`, { data });
  }
  removeProject(id: string, token: string) {
    return this.http.delete(`${this.link}/enterprise-log/${id}?token=${token}`);
  }
  parsingReq(search: string) {
    return this.http.get(`${this.link}/enterprise-parsing/?search=${search}`);
  }

}
