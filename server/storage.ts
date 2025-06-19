import { applications, type Application, type InsertApplication } from "@shared/schema";

export interface IStorage {
  getApplication(id: number): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  getAllApplications(): Promise<Application[]>;
}

export class MemStorage implements IStorage {
  private applications: Map<number, Application>;
  currentId: number;

  constructor() {
    this.applications = new Map();
    this.currentId = 1;
  }

  async getApplication(id: number): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentId++;
    const application: Application = { 
      ...insertApplication, 
      id,
      createdAt: new Date()
    };
    this.applications.set(id, application);
    return application;
  }

  async getAllApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }
}

export const storage = new MemStorage();
