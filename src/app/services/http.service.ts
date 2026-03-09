import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserData } from '@port/interfaces';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { v6 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public link: string = 'http://localhost:27182/api'
  private SECRET = 'EAAFCE8ECC522E391DEC31D8F5C54';
  constructor(private http: HttpClient) { }

  testLocalData() {
    if (!this.getItem('users')) {
      this.setItem('users', [
        {
          "_id": "1f110e6f-c745-6180-951e-57d0bf5b8a75",
          "email": "111@111.com",
          "password": "$argon2id$v=19$m=65536,t=3,p=4$dij9tXQU/5QsEzyNkuDq3w$Td4fUJ1kLDFKmM40u6AudAM48rd0P+nvz+09Cb5NSaU",
          "type": "USER",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IiRhcmdvbjJpZCR2PTE5JG09NjU1MzYsdD0zLHA9NCRkaWo5dFhRVS81UXNFenlOa3VEcTN3JFRkNGZVSjFrTERGS21NNDB1NkF1ZEFNNDhyZDBQK252eiswOUNiNU5TYVUiLCJlbWFpbCI6IjExMUAxMTEuY29tIiwiZXhwIjoxNzc4MjQ4NzQyLjE0NiwiaWF0IjoxNzczMDY0NzQyfQ.4ZaMYNYpCFZV5OitQz1-eLhzYGK97SG6Y582wmKm5Sk",
          "organization": "SpecialWorld",
          "portfolioIds": [
            "1f11bbe6-f9cf-66d0-8cc4-1c0643e05d52"
          ],
          "projectIds": [
            "1f110e71-e78a-6970-b20a-a19b4264cfc8",
            "1f116420-c370-6120-a4a1-a9d1ee14dc6a",
            "1f11bb5c-cfb5-6550-89be-a18d84fb009b",
            "1f11bb92-4c90-66d0-86cf-5e23ed6b96d1",
            "1f11bbc6-b440-6ee0-9ea5-630d13bd8596",
            "1f11bbd6-8deb-6230-88c8-b203ca84563a"
          ]
        }
      ])
    }
    if (!this.getItem('projects')) {
      this.setItem('projects', [
        {
          "_id": "1f11bb5c-cfb5-6550-89be-a18d84fb009b",
          "name": "Проспект М. Бажана",
          "subinfo": "Осокорки, Позняки, Харківський",
          "type": "Ремонт",
          "responsibleName": "Бедромир Олександр Петрович",
          "managerName": "Гончар Ганна Петрівна",
          "responsibleOrganization": "Build&Prod",
          "budget": 200000,
          "budgetSource": "Государство",
          "processDuration": 200,
          "profit": 400000,
          "traffic": 300,
          "forecastProjectTaskAmount": 200,
          "road": "M-03",
          "distance": 6400,
          "mainRoad": "Дорога регіонального значення",
          "inTown": true,
          "town": "Київ",
          "addressStart": "Південний міст",
          "addressEnd": "ст. м. «Бориспільська»",
          "des": "Це велика магістраль у Дарницькому районі Києва (Осокорки, Позняки, Харківський), що з'єднує Південний міст та Харківську площу. Попід ним розташовані шість станцій метро зеленої гілки: «Славутич», «Осокорки», «Позняки», «Харківська», «Вірлиця» та «Бориспільська».",
          "img": "https://upload.wikimedia.org/wikipedia/commons/5/57/%D0%9F%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82_%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B8_%D0%91%D0%B0%D0%B6%D0%B0%D0%BD%D0%B0.JPG",
          "portfolioId": {
            "name": "Перевірка та усунення проблем А3462",
            "tier": "tierI",
            "_id": "1f11bbe6-f9cf-66d0-8cc4-1c0643e05d52"
          },
          "dateCreation": "2026-03-24T21:00:00.000Z",
          "dateInitialization": "2026-05-28T21:00:00.000Z",
          "permissionDuration": 200,
          "score": 66132,
          "priority": 10,
          "options": {
            "eco": 40,
            "war": 50,
            "log": 20,
            "soc": 20,
            "struc": 50
          }
        },
        {
          "_id": "1f11bb92-4c90-66d0-86cf-5e23ed6b96d1",
          "name": "Дніпровська набережна",
          "subinfo": "Від ПМП до Березняківської",
          "type": "Ремонт",
          "responsibleName": "Бедромир Олександр Петрович",
          "managerName": "Гончар Ганна Петрівна",
          "responsibleOrganization": "Build&Prod",
          "budget": 50000,
          "budgetSource": "Держава",
          "processDuration": 300,
          "profit": 0,
          "traffic": 150,
          "forecastProjectTaskAmount": 200,
          "road": "M-03",
          "distance": 250,
          "mainRoad": "Дорога міжмуніципального значення",
          "inTown": false,
          "town": null,
          "addressStart": "ПМП",
          "addressEnd": "Ву́лиця Євге́на Сверстюка́",
          "des": "Це мальовнича вулиця та зона відпочинку на Лівому березі (Дарницький район, масиви Березняки та Позняки), що пролягає від проспекту Соборності до проспекту Миколи Бажана. Вона відома пляжами, ресторанами, яхт-клубом та чудовою панорамою на правий берег (ботанічний сад ім. Гришка)",
          "img": "https://f.kyivmaps.com/location/794/emjGu.jpg",
          "portfolioId": {
            "name": "Перевірка та усунення проблем А3462",
            "tier": "tierI",
            "_id": "1f11bbe6-f9cf-66d0-8cc4-1c0643e05d52"
          },
          "dateCreation": "2026-03-03T21:00:00.000Z",
          "dateInitialization": "2026-06-25T21:00:00.000Z",
          "permissionDuration": 200,
          "score": 16632,
          "priority": 7,
          "options": {
            "eco": 20,
            "war": 20,
            "log": 50,
            "soc": 60,
            "struc": 30
          }
        },
        {
          "_id": "1f11bbc6-b440-6ee0-9ea5-630d13bd8596",
          "name": "Вулиця Антоновича",
          "subinfo": "Від вул. Саксаганського до станції метро \"Олімпійська\"",
          "type": "Диджиталізація",
          "responsibleName": "Бедромир Олександр Петрович",
          "managerName": "Гончар Ганна Петрівна",
          "responsibleOrganization": "Новий Погляд",
          "budget": 2000000,
          "budgetSource": "Держава",
          "processDuration": 1000,
          "profit": 0,
          "traffic": 200,
          "forecastProjectTaskAmount": 15,
          "road": "33В",
          "distance": 173,
          "mainRoad": "Дорога федерального значення",
          "inTown": false,
          "town": null,
          "addressStart": "вул. Саксаганського",
          "addressEnd": " станції метро «Олімпійська» ",
          "des": "Це мальовнича вулиця та зона відпочинку на Лівому березі (Дарницький район, масиви Березняки та Позняки), що пролягає від проспекту Соборності до проспекту Миколи Бажана. Вона відома пляжами, ресторанами, яхт-клубом та чудовою панорамою на правий берег (ботанічний сад ім. Гришка)",
          "img": "https://gals.kiev-foto.info/wp-content/uploads/2018/08/ulitsa_antonovicha_vecherom.jpg",
          "portfolioId": {
            "name": "Перевірка та усунення проблем А3462",
            "tier": "tierIII",
            "_id": "1f11bbe6-f9cf-66d0-8cc4-1c0643e05d52"
          },
          "dateCreation": "2026-03-17T21:00:00.000Z",
          "dateInitialization": "2026-09-15T21:00:00.000Z",
          "permissionDuration": 100,
          "score": 660037.95,
          "priority": 1,
          "options": {
            "eco": 70,
            "war": 90,
            "log": 30,
            "soc": 40,
            "struc": 30
          }
        },
        {
          "_id": "1f11bbd6-8deb-6230-88c8-b203ca84563a",
          "name": "Автомаг Євгена Харченка",
          "subinfo": "ул. Евгения Харченка - вул. Івана Дяченка",
          "type": "Будівництво",
          "responsibleName": "Бедромир Олександр Петрович",
          "managerName": "Гончар Ганна Петрівна",
          "responsibleOrganization": "Build&Prod",
          "budget": 200000,
          "budgetSource": "Держава",
          "processDuration": 100,
          "profit": 0,
          "traffic": 15,
          "forecastProjectTaskAmount": 75,
          "road": "Т1016",
          "distance": 50,
          "mainRoad": "Проїзд",
          "inTown": false,
          "town": null,
          "addressStart": "ул. Евгения Харченка",
          "addressEnd": "вул. Івана Дяченка",
          "des": "Вулиця Євгена Харченка - вулиця в Дарницькому районі міста Києва, історично сформована місцевість Бортничі. Пролягає від перехрестя вулиць Світла та Лісова до перехрестя вулиць Переяславська, Івана Богуна та Автотранспортна.",
          "img": "https://apostrophe.ua/img/forall/u/90/63/_DSC2875.jpg",
          "portfolioId": {
            "name": "Перевірка та усунення проблем А3462",
            "tier": "tierII",
            "_id": "1f11bbe6-f9cf-66d0-8cc4-1c0643e05d52"
          },
          "dateCreation": "2026-03-16T21:00:00.000Z",
          "dateInitialization": "2026-07-16T21:00:00.000Z",
          "permissionDuration": 200,
          "score": 66090.75,
          "priority": 2,
          "options": {
            "eco": 40,
            "war": 80,
            "log": 20,
            "soc": 20,
            "struc": 10
          }
        }
    ])
    }
    if (!this.getItem('portfolios')) {
      this.setItem('portfolios', [
        {
          "_id": "1f11bbe6-f9cf-66d0-8cc4-1c0643e05d52",
          "name": "Перевірка та усунення проблем А3462",
          "img": "https://cfts.org.ua/imglib/_newimage/news/119193/1068.png",
          "des": "Пр. Бажана, Дніпровська Набережна, вирішення проблем на вулиці Антоновича",
          "responsibleName": "Олександр",
          "responsibleSurname": "Петрович",
          "responsibleLastname": "Бедромир",
          "responsibleOrganization": "Build&Prod",
          "projects": 4,
          "projectIds": {
            "tierI": [
              "1f11bb5c-cfb5-6550-89be-a18d84fb009b",
              "1f11bb92-4c90-66d0-86cf-5e23ed6b96d1",
              "1f11bbd6-8deb-6230-88c8-b203ca84563a"
            ],
            "tierII": [],
            "tierIII": [
              "1f11bbc6-b440-6ee0-9ea5-630d13bd8596"
            ]
          },
          "subinfo": "Пр. Бажана та інші",
          "budget": 7350000,
          "profit": 1200000,
          "location": "",
          "town": null
        }
      ])
    }
  }

  private setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // Get data from localStorage
  private getItem(key: string): any | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  loginLocal(data: any): Promise<any> {
    return new Promise((resolve) => {
      resolve({ data: this.getItem('users').find((user: any) => user.email === data.email) })
    })
  }
  registrationLocal(data: any): Promise<any> {
    return new Promise((resolve) => {
      const current = this.getItem('users')
      data._id = v6()
      current.push(data)
      this.setItem('users', current)
      resolve({ data: this.getItem('users').find((user: any) => user.email === data.email) })
    })
  }
  forgetLocal(): Promise<any> {
    return new Promise((resolve) => {
      resolve({ local: 'true' })
    })
  }
  newPasswordLocal(data: any): Promise<any> {
    return new Promise((resolve) => {
      const current = this.getItem('users')
      const currentIndex = this.getItem('users').findIndex((user: any) => user.email === data.email)
      Object
        .keys(data)
        .forEach((key: string) => {
          current[currentIndex][key] = data[key]
        })
      this.setItem('users', current)
      resolve({ data: this.getItem('users').find((user: any) => user.email === data.email) })
    })
  }
  updateUserLocal(data: any): Promise<any> {
    return new Promise((resolve) => {
      const current = this.getItem('users')
      const currentIndex = this.getItem('users').findIndex((user: any) => user.email === data.email)
      Object
        .keys(data)
        .forEach((key: string) => {
          current[currentIndex][key] = data[key]
        })
      this.setItem('users', current)
      resolve({ data: this.getItem('users').find((user: any) => user.email === data.email) })
    })
  }

  getAllProjectsLocal(token: string): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.getItem('projects'))
    })
  }
  getProjectLocal(id: string): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.getItem('projects').find((project: any) => project._id === id))
    })
  }
  updateProjectLocal(id: string, data: any): Promise<any> {
    return new Promise((resolve) => {
      const current = this.getItem('projects')
      const currentIndex = this.getItem('projects').findIndex((project: any) => project.email === data.email)
      Object
        .keys(data)
        .forEach((key: string) => {
          current[currentIndex][key] = data[key]
        })
      this.setItem('projects', current)
      resolve({})
    })
  }
  createProjectLocal(data: any, token: string): Promise<any> {
    return new Promise((resolve) => {
      const current = this.getItem('projects')
      data._id = v6()
      current.push(data)
      this.setItem('projects', current)
      resolve({})
    })
  }
  removeProjectLocal(id: string, token: string): Promise<any> {
    return new Promise((resolve) => {
      let current = this.getItem('projects')
      const currentIndex = this.getItem('projects').findIndex((project: any) => project._id === id)
      current.splice(currentIndex, 1)
      this.setItem('projects', current)
      resolve({})
    })
  }

  getAllPortfolioLocal(id: string | null): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.getItem('portfolios'))
    })
  }
  getPortfolioLocal(id: string): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.getItem('portfolios').find((project: any) => project._id === id))
    })
  }
  createPortfolioLocal(data: any, token: string): Promise<any> {
    return new Promise((resolve) => {
      const current = this.getItem('portfolios')
      data._id = v6()
      current.push(data)
      this.setItem('portfolios', current)
      resolve({})
    })
  }
  updatePortfolioLocal(id: string, data: any): Promise<any> {
    return new Promise((resolve) => {
      const current = this.getItem('portfolios')
      const currentIndex = this.getItem('portfolios').findIndex((portfolio: any) => portfolio._id === id)
      Object
        .keys(data)
        .forEach((key: string) => {
          current[currentIndex][key] = data[key]
        })
      this.setItem('portfolios', current)
      resolve({})
    })
  }
  removePortfolioLocal(id: string, token: string): Promise<any> {
    return new Promise((resolve) => {
      let current = this.getItem('portfolios')
      const currentIndex = this.getItem('portfolios').findIndex((portfolio: any) => portfolio._id === id)
      current.splice(currentIndex, 1)
      this.setItem('portfolios', current)
      resolve({})
    })
  }

  getFile() {
    // return this.http.get(`${this.link}/file?path=data-files/house-quality.txt`);
    return { STATUS: 'DONE' }
  }
  sendMessage(data: any) {
    // return this.http.post(`${this.link}/messages`, { data });
    return { STATUS: 'DONE' }
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

  getAllProjects(token: string) {
    return this.http.get(`${this.link}/projects?token=${token}`);
  }
  getProject(id: string) {
    return this.http.get(`${this.link}/project/${id}`);
  }
  updateProject(id: string, data: any) {
    return this.http.put(`${this.link}/projects/${id}`, { data });
  }
  createProject(data: any, token: string) {
    return this.http.post(`${this.link}/projects?token=${token}`, { data });
  }
  removeProject(id: string, token: string) {
    return this.http.delete(`${this.link}/projects/${id}?token=${token}`);
  }

  getAllPortfolios(id: string | null) {
    return this.http.get(`${this.link}/portfolios?user=${id}`);
  }
  getPortfolio(id: string) {
    return this.http.get(`${this.link}/portfolios/${id}`);
  }
  createPortfolio(data: any, token: string) {
    return this.http.post(`${this.link}/portfolios?token=${token}`, { data });
  }
  updatePortfolio(id: string, data: any) {
    return this.http.put(`${this.link}/portfolios/${id}`, { data });
  }
  removePortfolio(id: string, token: string) {
    return this.http.delete(`${this.link}/portfolios/${id}?token=${token}`);
  }

}
