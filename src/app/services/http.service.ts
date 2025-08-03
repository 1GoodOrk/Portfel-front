import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public link: string = 'http://localhost:27182/api/v1'
  constructor(private http: HttpClient) { }

  getFile() {
    return this.http.get(`${this.link}/file?path=data-files/house-quality.txt`);
  }
  sendMessage(data: any) {
    return this.http.post(`${this.link}/message`, data);
  }

  login(data: any) {
    return this.http.get(`${this.link}/login`, { headers: {
      'Auth': JSON.stringify(data)
    }});
  }
  registration(data: any) {
    return this.http.post(`${this.link}/registration`, data);
  }
  forget(data: any) {
    return this.http.post(`${this.link}/forget`, data);
  }
  newPassword(data: any) {
    return this.http.post(`${this.link}/new-password`, data);
  }
  updateUser(id: null | string, data: any) {
    return this.http.post(`${this.link}/update/${id}`, data);
  }

  getAllProjects(id: string | null) {
    return this.http.get(`${this.link}/projects?user=${id}`);
  }
  getProject(id: string) {
    return this.http.get(`${this.link}/project/${id}`);
  }
  updateProject(id: string, data: any) {
    return this.http.put(`${this.link}/project/${id}`, data);
  }
  createProject(data: any) {
    return this.http.post(`${this.link}/project`, data);
  }
  removeProject(id: string) {
    return this.http.delete(`${this.link}/project/${id}`);
  }

  getAllPortfolios(id: string | null) {
    return this.http.get(`${this.link}/portfolios?user=${id}`);
  }
  getPortfolio(id: string) {
    return this.http.get(`${this.link}/portfolio/${id}`);
  }
  createPortfolio(data: any) {
    return this.http.post(`${this.link}/portfolio`, data);
  }
  updatePortfolio(id: string, data: any) {
    return this.http.put(`${this.link}/portfolio/${id}`, data);
  }
  removePortfolio(id: string) {
    return this.http.delete(`${this.link}/portfolio/${id}`);
  }

}
