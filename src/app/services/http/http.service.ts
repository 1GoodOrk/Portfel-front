import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFormProjectData, IMessageData, IProjectRO, IUserData } from '@port/interfaces';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { HttpGenericService } from './http-generic.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService extends HttpGenericService {

  public link: string = 'http://localhost:27182/api'
  private SECRET = 'EAAFCE8ECC522E391DEC31D8F5C54';
  constructor(private http: HttpClient) {
    super(http)
  }

  public getFile(): Observable<any> {
    return this.getRequestProcessing<any>({ url: `${this.link}/projects-meliksetov/save` })
    // return this.postRequestProcessing<any, IMessageData>({ url: `${this.link}/messages` }, data);
    // return this.http.get(`${this.link}/file?path=data-files/house-quality.txt`);
  }
  public sendMessage(data: any): Observable<any> {
    return this.postRequestProcessing<any, IMessageData>({ url: `${this.link}/messages` }, data);
    // return this.http.post(`${this.link}/messages`, { data });
  }

  public login(data: any): Observable<any> {
    return this.getRequestProcessing<any>({
      url: `${this.link}/login`,
      headers: {
        'Authorization': `Bearer ${CryptoJS.AES.encrypt(JSON.stringify(data), this.SECRET).toString()}`
      }
    })
  }
  public registration(data: any): Observable<any> {
    return this.postRequestProcessing<any, string>({ url: `${this.link}/users` }, CryptoJS.AES.encrypt(JSON.stringify(data), this.SECRET).toString());
  }
  public forget(data: any): Observable<any> {
    return this.postRequestProcessing<any, IUserData>({ url: `${this.link}/forget` }, data);
  }
  public newPassword(data: IUserData): Observable<any> {
    return this.postRequestProcessing<any, IUserData>({ url: `${this.link}/new-password` }, data);
  }
  public updateUser(id: null | string, data: IUserData): Observable<any> {
    return this.postRequestProcessing<any, IUserData>({ url: `${this.link}/update/${id}` }, data);
  }

  public getAllProjects(token: string): Observable<any> {
    return this.getRequestProcessing<any>({ url: `${this.link}/projects-meliksetov?token=${token}` })
  }
  public getProject(id: string): Observable<any> {
    return this.getRequestProcessing<any>({ url: `${this.link}/projects-meliksetov/${id}` })
  }
  public updateProject(id: string, data: IFormProjectData): Observable<any> {
    return this.putRequestProcessing<any, IProjectRO>({ url: `${this.link}/projects-meliksetov/${id}` }, { data })
    // return this.http.put(`${this.link}/projects-meliksetov/${id}`, { data });
  }
  public createProject(data: IFormProjectData, token: string): Observable<any> {
    return this.postRequestProcessing<any, IProjectRO>({ url: `${this.link}/projects-meliksetov?token=${token}` }, { data })
    // return this.http.post(`${this.link}/projects-meliksetov?token=${token}`, { data });
  }
  public removeProject(id: string, token: string): Observable<any> {
    return this.deleteRequestProcessing<any>({ url: `${this.link}/projects-meliksetov/${id}?token=${token}` })
  }

}
