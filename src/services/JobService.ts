import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { addJob } from '../models/addJob.model';

@Injectable()
export class JobService{

    constructor(private db: AngularFireDatabase){}

    private jobRef = this.db.list<addJob>('addJob');

    addJob(id: string,
        job: string,
        requirements: string,
        description: string,
        salary: number,
        availability: number){
            return this.jobRef.push(new addJob(id, job, requirements, description, salary, availability));
        }
}