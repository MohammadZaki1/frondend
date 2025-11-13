import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class SharedService {

   // messageSource: BehaviorSubject<string> = new BehaviorSubject('');
   agentmessageSource: Subject<string> = new Subject();
   usermessageSource: Subject<string> = new Subject();
   userErrata :Subject<object> = new Subject();
   agentErrata  :Subject<object> = new Subject();
    constructor() { }
}