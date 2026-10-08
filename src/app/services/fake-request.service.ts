import { Injectable } from '@angular/core';
import { v6 } from 'uuid';

import users from '@port/asserts/data/fake-data/user.json'
import projects from '@port/asserts/data/fake-data/project.json'
import { IError, IFormMessage, IFormUser, IMessage, IUserData } from '@port/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FakeRequestService {
  private users: IUserData[] = users
  private projects: any = projects

  public login(data: IFormUser): IUserData | IError {
    const userIndex = this.users.findIndex((user: IUserData) => user.email === data.email)
    return userIndex > -1 ? this.users[userIndex] : { message: 'NOT_FOUND' }
  }

  public registration(data: IFormUser): IUserData | IError {
    if (this.users.findIndex((user: IUserData) => user.email === data.email) > -1) {
      this.users.push({
        _id: v6(),
        organization: data.organization!,
        email: data.email!,
        password: data.password!,
        token: '',
        type: data.type ? data.type : 'USER',
        projectIds: []
      })
      return this.users[this.users.length - 1]
    } else {
      return { message: 'ALREADY_EXIST' }
    }
  }

  public forget(data: IFormUser): IMessage {
    return { message: 'SENDED' }
  }

  public newPassword(data: IFormUser): IMessage {
    return { message: 'SENDED' }
  }

  public updateUser(data: IFormUser): void {
    const userIndex = this.users.findIndex((user: IUserData) => user.email === data.email)
    if (userIndex > -1) {
      this.users[userIndex].organization = data.organization!
      this.users[userIndex].email = data.email!
      this.users[userIndex].password = data.password!
      this.users[userIndex].projectIds = data.projectIds!
    }
  }

  getProjects(): any {
    return this.projects
  }

  deleteProjects(id: string): any {
    const index = this.projects.findIndex((el: any) => el._id === id)
    this.projects.splice(index, 1)
  }

  updateProject(id: string, data: any) {
    const index = this.projects.findIndex((el: any) => el._id === id)
    console.log(data)
    Object.keys(data).forEach((key: string) => {
      this.projects[index][key] = data[key]
    })
  }


  createProject(data: any) {
    data._id = v6()
    this.projects.push(data)
  }

  public sendMessage(data: IFormMessage): IMessage {
    return { message: 'SENDED' }
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
