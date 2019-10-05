import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { addJob } from '../models/addJob.model';

@Injectable()
export class JobService{

    constructor(private db: AngularFireDatabase){}

    private jobRef = this.db.list<addJob>('addJob');

    addJob(
        job: string,
        requirements: string,
        descriptions: string,
        salary: number,
        availability: number){
            return this.jobRef.push(new addJob(job, requirements, descriptions, salary, availability));
        }
    
    getJob(){
        return this.jobRef;
    }
    
    editJob(key: string,
        job: string,
        requirements: string,
        descriptions: string,
        salary: number,
        availability: number){
        return this.jobRef.update(key, new addJob(job, requirements, descriptions, salary, availability));
    }
    
    deleteJob(key: string){
        return this.jobRef.remove(key);
    }
}