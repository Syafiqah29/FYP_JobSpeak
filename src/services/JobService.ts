import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { addJob } from '../models/addJob.model';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class JobService {

    userId: string;

    constructor(private db: AngularFireDatabase,
        private afAuth: AngularFireAuth){
        }

    private jobRef = this.db.list<addJob>('addJob');

    addJob(
        id: string,
        company: string,
        address: string,
        contact: number,
        title: string,
        requirements: string,
        age: string,
        gender: string,
        descriptions: string,
        salary: number,
        availability: number,
        date: string){
            return this.jobRef.push(new addJob(id, company, address, contact, title, requirements, age, gender, descriptions, salary, availability, date));
        }
    
    getJob(){
        return this.jobRef;
    }
    
    editJob(key: string,
        id: string,
        company: string,
        address: string,
        contact: number,
        title: string,
        requirements: string,
        age: string,
        gender: string,
        descriptions: string,
        salary: number,
        availability: number,
        date: string){
        return this.jobRef.update(key, new addJob(id, company, address, contact, title, requirements, age, gender, descriptions, salary, availability, date));
    }
    
    deleteJob(key: string){
        return this.jobRef.remove(key);
    }
}