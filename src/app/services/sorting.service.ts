import { Injectable } from '@angular/core';
import { IPortfolioDataRO, IProjectData } from '@port/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  public testProjects: Array<IProjectData> = [
    {
      _id: 'string id 1',
      name: 'Test 1',
      subinfo: 'sub info 1',
      type: 'bridge',
      budget: 342000,
      budgetSource: 'BUILD COOP',
      processDuration: 60,
      profit: 500000,
      traffic: 324,
      road: 5432,
      distance: 140,
      mainRoad: true,
      inTown: true,
      town: 'Town',
      addressStart: 'string',
      addressEnd: 'string',
      des: 'string',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      portfolioId: {
        tier: 1,
        _id: 'portfolio'
      },
      dateCreation: 'string',
      dateInitialization: 'string',
      permissionDuration: 75,
      score: 17,
      priority: 10,
      options: {
        eco: 50,
        war: 40,
        log: 25,
        soc: 25,
        struc: 100
      }
    }, {
      _id: 'string id 2',
      name: 'Test 2',
      subinfo: 'sub info 2',
      type: 'bridge',
      budget: 32000,
      budgetSource: 'BUILD COOP',
      processDuration: 20,
      profit: 50000,
      traffic: 24,
      road: 432,
      distance: 100,
      mainRoad: true,
      inTown: true,
      town: 'Town',
      addressStart: 'string',
      addressEnd: 'string',
      des: 'string',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      portfolioId: {
        tier: 1,
        _id: 'portfolio'
      },
      dateCreation: 'string',
      dateInitialization: 'string',
      permissionDuration: 75,
      score: 20,
      priority: 7,
      options: {
        eco: 50,
        war: 40,
        log: 25,
        soc: 25,
        struc: 100
      }
    }, {
      _id: 'string id 3',
      name: 'Test 3',
      subinfo: 'sub info 3',
      type: 'bridge',
      budget: 32000,
      budgetSource: 'BUILD COOP',
      processDuration: 20,
      profit: 50000,
      traffic: 24,
      road: 433,
      distance: 100,
      mainRoad: true,
      inTown: true,
      town: 'Town',
      addressStart: 'string',
      addressEnd: 'string',
      des: 'string',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      portfolioId: {
        tier: 2,
        _id: 'portfolio'
      },
      dateCreation: 'string',
      dateInitialization: 'string',
      permissionDuration: 75,
      score: 20,
      priority: 7,
      options: {
        eco: 50,
        war: 40,
        log: 25,
        soc: 25,
        struc: 100
      }
    }, {
      _id: 'string id 4',
      name: 'Test 4',
      subinfo: 'sub info 4',
      type: 'bridge',
      budget: 32000,
      budgetSource: 'BUILD COOP',
      processDuration: 20,
      profit: 50000,
      traffic: 24,
      road: 434,
      distance: 100,
      mainRoad: true,
      inTown: true,
      town: 'Town',
      addressStart: 'string',
      addressEnd: 'string',
      des: 'string',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      portfolioId: {
        tier: 2,
        _id: 'portfolio'
      },
      dateCreation: 'string',
      dateInitialization: 'string',
      permissionDuration: 75,
      score: 20,
      priority: 7,
      options: {
        eco: 50,
        war: 40,
        log: 25,
        soc: 25,
        struc: 100
      }
    }, {
      _id: 'string id 5',
      name: 'Test 5',
      subinfo: 'sub info 5',
      type: 'bridge',
      budget: 32000,
      budgetSource: 'BUILD COOP',
      processDuration: 20,
      profit: 50000,
      traffic: 24,
      road: 435,
      distance: 100,
      mainRoad: true,
      inTown: true,
      town: 'Town',
      addressStart: 'string',
      addressEnd: 'string',
      des: 'string',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      portfolioId: {
        tier: 2,
        _id: 'portfolio'
      },
      dateCreation: 'string',
      dateInitialization: 'string',
      permissionDuration: 75,
      score: 20,
      priority: 7,
      options: {
        eco: 50,
        war: 40,
        log: 25,
        soc: 25,
        struc: 100
      }
    }, {
      _id: 'string id 6',
      name: 'Test 6',
      subinfo: 'sub info 6',
      type: 'bridge',
      budget: 32000,
      budgetSource: 'BUILD COOP',
      processDuration: 20,
      profit: 2000,
      traffic: 24,
      road: 436,
      distance: 100,
      mainRoad: true,
      inTown: true,
      town: 'Town',
      addressStart: 'string',
      addressEnd: 'string',
      des: 'string',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      portfolioId: {
        tier: 3,
        _id: 'portfolio'
      },
      dateCreation: 'string',
      dateInitialization: 'string',
      permissionDuration: 75,
      score: 20,
      priority: 7,
      options: {
        eco: 50,
        war: 40,
        log: 25,
        soc: 25,
        struc: 100
      }
    }, {
      _id: 'string id 7',
      name: 'Test 7',
      subinfo: 'sub info 7',
      type: 'bridge',
      budget: 32000,
      budgetSource: 'BUILD COOP',
      processDuration: 20,
      profit: 2000,
      traffic: 24,
      road: 437,
      distance: 100,
      mainRoad: true,
      inTown: true,
      town: 'Town',
      addressStart: 'string',
      addressEnd: 'string',
      des: 'string',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      portfolioId: {
        tier: 3,
        _id: 'portfolio'
      },
      dateCreation: 'string',
      dateInitialization: 'string',
      permissionDuration: 75,
      score: 20,
      priority: 7,
      options: {
        eco: 50,
        war: 40,
        log: 25,
        soc: 25,
        struc: 100
      }
    }, {
      _id: 'string id 8',
      name: 'Test 8',
      subinfo: 'sub info 8',
      type: 'bridge',
      budget: 32000,
      budgetSource: 'BUILD COOP',
      processDuration: 20,
      profit: 2000,
      traffic: 24,
      road: 438,
      distance: 100,
      mainRoad: true,
      inTown: true,
      town: 'Town',
      addressStart: 'string',
      addressEnd: 'string',
      des: 'string',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      portfolioId: {
        tier: 3,
        _id: 'portfolio'
      },
      dateCreation: 'string',
      dateInitialization: 'string',
      permissionDuration: 75,
      score: 20,
      priority: 7,
      options: {
        eco: 50,
        war: 40,
        log: 25,
        soc: 25,
        struc: 100
      }
    }, {
      _id: 'string id 9',
      name: 'Test 9',
      subinfo: 'sub info 9',
      type: 'bridge',
      budget: 32000,
      budgetSource: 'BUILD COOP',
      processDuration: 20,
      profit: 2000,
      traffic: 24,
      road: 439,
      distance: 100,
      mainRoad: true,
      inTown: true,
      town: 'Town',
      addressStart: 'string',
      addressEnd: 'string',
      des: 'string',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      portfolioId: {
        tier: 3,
        _id: 'portfolio'
      },
      dateCreation: 'string',
      dateInitialization: 'string',
      permissionDuration: 75,
      score: 20,
      priority: 7,
      options: {
        eco: 50,
        war: 40,
        log: 25,
        soc: 25,
        struc: 100
      }
    }, {
      _id: 'string id 10',
      name: 'Test 10',
      subinfo: 'sub info 10',
      type: 'bridge',
      budget: 32000,
      budgetSource: 'BUILD COOP',
      processDuration: 20,
      profit: 2000,
      traffic: 24,
      road: 440,
      distance: 100,
      mainRoad: true,
      inTown: true,
      town: 'Town',
      addressStart: 'string',
      addressEnd: 'string',
      des: 'string',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      portfolioId: {
        tier: 3,
        _id: 'portfolio'
      },
      dateCreation: 'string',
      dateInitialization: 'string',
      permissionDuration: 75,
      score: 20,
      priority: 7,
      options: {
        eco: 50,
        war: 40,
        log: 25,
        soc: 25,
        struc: 100
      }
    }
  ]
  public testPortfolios: Array<IPortfolioDataRO> = [
    {
      _id: 'port id 1',
      name: 'Portfolio 1',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      des: 'string',
      projects: 0,
      projectIds: {
        tierI: [],
        tierII: [],
        tierIII: []
      },
      subinfo: 'string',
      budget: 600000,
      profit: 0,
      duration: 50,
      location: 'COMPLEX',
      town: 'Town',
      options: {
        eco: 50,
        war: 50,
        log: 0,
        soc: 50,
        struc: 0
      }
    }, {
      _id: 'port id 2',
      name: 'Portfolio 2',
      img: 'https://primefaces.org/cdn/primeng/images/card-ng.jpg',
      des: 'string',
      projects: 0,
      projectIds: {
        tierI: [],
        tierII: [],
        tierIII: []
      },
      subinfo: 'string',
      budget: 600000,
      profit: 0,
      duration: 50,
      location: 'COMPLEX',
      town: 'Town',
      options: {
        eco: 50,
        war: 50,
        log: 0,
        soc: 50,
        struc: 0
      }
    }
  ]

  public sortingSystem(projects: Array<IProjectData>, sortingType: string): Array<IProjectData> {
    switch (sortingType) {
      case 'HIFO':
        return this.hifoSorting(projects)
      case 'LIFO':
        return this.lifoSorting(projects)
      case 'FIFO':
        return this.fifoSorting(projects)
      case 'FEFO':
        return this.fefoSorting(projects)
      case 'FEFOHIFO':
        return this.fefohifoSorting(projects)
      case 'FIFOLIFO':
        return this.fifolifoSorting(projects)
      case 'FEFOFIFOHIFO':
        return this.fefofifohifoSorting(projects)

      default:
        return projects
    }
  }

  private hifoSorting(projects: Array<IProjectData>): Array<IProjectData> {
    projects.sort((prev: IProjectData, next: IProjectData) => {
      const profitPrev = prev.profit - prev.budget
      const profitNext = next.profit - next.budget
      if (profitPrev > profitNext) return 1
      if (profitPrev < profitNext) return -1
      return 0
    })
    return projects
  }

  private lifoSorting(projects: Array<IProjectData>): Array<IProjectData> {
    projects.sort((prev: IProjectData, next: IProjectData) => {
      const profitPrev = prev.profit - prev.budget
      const profitNext = next.profit - next.budget
      if (profitPrev > profitNext) return 1
      if (profitPrev < profitNext) return -1
      return 0
    })
    return projects
  }

  private fifoSorting(projects: Array<IProjectData>): Array<IProjectData> {
    projects.sort((prev: IProjectData, next: IProjectData) => {
      if (prev.score > prev.score && prev.priority > prev.priority) return 1
      if (prev.score < prev.score && prev.priority < prev.priority) return -1
      return 0
    })
    return projects
  }

  private fefoSorting(projects: Array<IProjectData>): Array<IProjectData> {
    projects.sort((prev: IProjectData, next: IProjectData) => {
      if (prev.score < prev.score && prev.priority < prev.priority) return 1
      if (prev.score > prev.score && prev.priority > prev.priority) return -1
      return 0
    })
    return projects
  }

  private fefohifoSorting(projects: Array<IProjectData>): Array<IProjectData> {
    projects.sort((prev: IProjectData, next: IProjectData) => {
      const profitPrev = prev.profit - prev.budget
      const profitNext = next.profit - next.budget
      if (prev.permissionDuration > prev.permissionDuration && profitPrev > profitNext) return 1
      if (prev.permissionDuration < prev.permissionDuration && profitPrev > profitNext) return -1
      return 0
    })
    return projects
  }

  private fifolifoSorting(projects: Array<IProjectData>): Array<IProjectData> {
    // TODO: sorting FIFO LIFO rules
    projects.sort((prev: IProjectData, next: IProjectData) => {
      const profitPrev = prev.profit - prev.budget
      const profitNext = next.profit - next.budget
      if (prev.permissionDuration > prev.permissionDuration && profitPrev > profitNext) return 1
      if (prev.permissionDuration < prev.permissionDuration && profitPrev > profitNext) return -1
      return 0
    })
    return projects
  }

  private fefofifohifoSorting(projects: Array<IProjectData>): Array<IProjectData> {
    // TODO: sorting FEFO FIFO HIFO rules
    projects.sort((prev: IProjectData, next: IProjectData) => {
      if (prev.name > prev.name) return 1
      if (prev.name < prev.name) return -1
      return 0
    })
    return projects
  }

  public tierFormatting(projects: Array<IProjectData>, portfolio: IPortfolioDataRO): IPortfolioDataRO {
    console.log(projects.length)
    portfolio.projectIds = {
      tierI: [],
      tierII: [],
      tierIII: []
    }
    const options = {
      maxScore: projects[0].score,
      minScore: projects[0].score,
      averageDownScore: projects[0].score,
      averageUpScore: projects[0].score
    }
    projects.forEach((el: IProjectData) => {
      portfolio.budget += el.budget
      portfolio.profit += el.profit
      if (el.score > options.maxScore) {
        options.maxScore = el.score
      }
      if (el.score < options.minScore) {
        options.minScore = el.score
      }
    })
    options.averageDownScore = (options.maxScore + options.minScore) / 2
    options.averageUpScore = Math.round((options.maxScore + options.averageDownScore) / 2)
    options.averageDownScore = Math.round((options.averageDownScore + options.minScore) / 2)
    projects.forEach((el: IProjectData) => {
      if (el.score >= options.minScore && el.score < options.averageDownScore) {
        portfolio.projectIds.tierI.push(el)
      } else if (el.score >= options.averageDownScore && el.score < options.averageUpScore) {
        portfolio.projectIds.tierII.push(el)
      } else {
        portfolio.projectIds.tierIII.push(el)
      }
    })
    return portfolio
  }
}
