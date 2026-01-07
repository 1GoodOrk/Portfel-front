import { Injectable } from '@angular/core';
import { IProjectData } from '@port/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  public testProjects: Array<IProjectData> = []

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
}
