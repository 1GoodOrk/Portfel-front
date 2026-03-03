import { Injectable } from '@angular/core';
import { v6 } from 'uuid';

import users from '@port/asserts/data/fake-data/user.json'
import projects from '@port/asserts/data/fake-data/project.json'

@Injectable({
  providedIn: 'root',
})
export class FakeRequestService {
  private users: any = users
  // getFile() {
  //   return this.http.get(`${this.link}/file?path=data-files/house-quality.txt`);
  // }
  // sendMessage(data: any) {
  //   return this.http.post(`${this.link}/messages`, { data });
  // }

  // // TODO: JWT
  login(data: any): any {
    const userIndex = this.users.findIndex((user: any) => user.email === data.email)
    return userIndex > -1 ? this.users[userIndex] : { error: 'NOT_FOUND' }
  }
  registration(data: any): any {
    if (this.users.findIndex((user: any) => user.email === data.email) > -1) {
      this.users.push({
        _id: v6(),
        organization: data.organization,
        email: data.email,
        password: data.password,
        type: data.type ? data.type : 'USER',
        projectIds: [],
        portfolioIds: []
      })
    } else {
      return { error: 'ALREADY_EXIST' }
    }
  }
  forget(data: any) {
    return { message: 'SENDED' }
  }
  newPassword(data: any) {
    return { message: 'SENDED' }
  }
  updateUser(id: null | string, data: any) {
    const userIndex = this.users.findIndex((user: any) => user.email === data.email)
    if (userIndex > -1) {
      this.users[userIndex].organization = data.organization
      this.users[userIndex].email = data.email
      this.users[userIndex].password = data.password
      this.users[userIndex].projectIds = data.projectIds
      this.users[userIndex].portfolioIds = data.portfolioIds
    }
  }

  // getExperts(): Observable<any> {
  //   return this.http.get(`${this.link}/users?filter=EXPERT`);
  // }
  // getAllExpertise(id: null | string) {
  //   return this.http.get(`${this.link}/expertise?project=${id}`);
  // }
  // getExpertise(id: null | string) {
  //   return this.http.get(`${this.link}/expertise/${id}`);
  // }
  // addExpertise(data: any, id: null | string) {
  //   return this.http.post(`${this.link}/expertise?project=${id}`, { data });
  // }
  // removeExpertise(id: string, idProj: null | string) {
  //   return this.http.delete(`${this.link}/expertise/${id}?project=${idProj}`);
  // }
  // updateExpertise(data: any) {
  //   return this.http.put(`${this.link}/expertise`, { data });
  // }


  // getAllProjects(token: string) {
  //   return this.http.get(`${this.link}/projects-science?token=${token}`);
  // }
  // getProject(id: string) {
  //   return this.http.get(`${this.link}/projects-science/${id}`);
  // }
  // updateProject(id: string, data: any) {
  //   return this.http.put(`${this.link}/projects-science/${id}`, { data });
  // }
  // createProject(data: any, token: string) {
  //   return this.http.post(`${this.link}/projects-science?token=${token}`, { data });
  // }
  // removeProject(id: string, token: string) {
  //   return this.http.delete(`${this.link}/projects-science/${id}?token=${token}`);
  // }
}
