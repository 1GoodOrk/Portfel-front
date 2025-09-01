import { Injectable } from '@angular/core';
import { IPortfolioDataRO, IProjectData } from '@port/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  public testProjects: Array<IProjectData> = []
  public testPortfolios: Array<IPortfolioDataRO> = []

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
