import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { addJob } from '../models/addJob.model';

@Injectable()
export class JobService{

    constructor(private db: AngularFireDatabase){}

    private jobRef = this.db.list<addJob>('addJob');

    addJob(
        company: string,
        address: string,
        contact: number,
        title: string,
        requirements: string,
        descriptions: string,
        salary: number,
        availability: number){
            return this.jobRef.push(new addJob(company, address, contact, title, requirements, descriptions, salary, availability));
        }
    
    getJob(){
        return this.jobRef;
    }
    
    editJob(key: string,
        company: string,
        address: string,
        contact: number,
        title: string,
        requirements: string,
        descriptions: string,
        salary: number,
        availability: number){
        return this.jobRef.update(key, new addJob(company, address, contact, title, requirements, descriptions, salary, availability));
    }
    
    deleteJob(key: string){
        return this.jobRef.remove(key);
    }
}