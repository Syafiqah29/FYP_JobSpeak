import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { addJob } from '../models/addJob.model';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class JobService {

    userId: string;

    constructor(private db: AngularFireDatabase,
        private afAuth: AngularFireAuth){

            this.afAuth.authState.subscribe(user => {
                if(user) this.userId = user.uid
            })
        }

    private jobRef = this.db.list<addJob>('addJob');

    addJob(
        company: string,
        address: string,
        contact: number,
        title: string,
        requirements: string,
        age: string,
        gender: string,
        descriptions: string,
        salary: number,
        availability: number){
            return this.jobRef.push(new addJob(company, address, contact, title, requirements, age, gender, descriptions, salary, availability));
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
        age: string,
        gender: string,
        descriptions: string,
        salary: number,
        availability: number){
        return this.jobRef.update(key, new addJob(company, address, contact, title, requirements, age, gender, descriptions, salary, availability));
    }
    
    deleteJob(key: string){
        return this.jobRef.remove(key);
    }

    appliedJob(addJobKey){
        const data = {[this.userId] : true}
        const users =this.db.object(`addJob/${addJobKey}/users`)
        users.update(data)
    }
}