/*
                   s1    n(r)   n(x)    s2     n(j)   c    n(s)
Subject            
        s1         ^-----r------x--------------j------|----------
        s2         ---------------------^------j------|----------
AsyncSubject       
        s1         ^----------------------------------j|---------
        s1         ---------------------^-------------j|---------
BehaviorSubject    
        s1         ^a----r------x--------------j------|----------
        s2         ---------------------^x-----j------|----------
ReplaySubject      
        s1         ^-----r------x--------------j------|----------
        s2         ---------------------^r-x---j------|----------
*/

console.clear();
import { Subject, AsyncSubject, BehaviorSubject, ReplaySubject } from 'rxjs';

const subject = new Subject();
const asyncSubject = new AsyncSubject();
const behaviorSubject = new BehaviorSubject('a');
const replaySubject = new ReplaySubject(2);

const subjects = [subject, asyncSubject, behaviorSubject, replaySubject];
const log = subjectType => e => console.log(`${subjectType}: ${e}`);

console.log('SUBSCRIBE 1');
subject.subscribe(log('s1 subject'));
asyncSubject.subscribe(log('s1 asyncSubject'));
behaviorSubject.subscribe(log('s1 behaviorSubject'));
replaySubject.subscribe(log('s1 replaySubject'));

console.log('\nNEXT(B)');
subjects.forEach(o => o.next('B'));

console.log('\nNEXT(C)');
subjects.forEach(o => o.next('C'));

console.log('\nSUBSCRIBE 2');
subject.subscribe(log('s2 subject'));
asyncSubject.subscribe(log('s2 asyncSubject'));
behaviorSubject.subscribe(log('s2 behaviorSubject'));
replaySubject.subscribe(log('s2 replaySubject'));

console.log('\nNEXT(D)');
subjects.forEach(o => o.next('D'));

console.log('\nCOMPLETE');
subjects.forEach(o => o.complete());

console.log('\nNEXT(E)');
subjects.forEach(o => o.next('E'));

/*
OUTPUT:

SUBSCRIBE 1
s1 behaviorSubject: a

NEXT(r)
s1 subject: r
s1 behaviorSubject: r
s1 replaySubject: r

NEXT(x)
s1 subject: x
s1 behaviorSubject: x
s1 replaySubject: x

SUBSCRIBE 2
s2 behaviorSubject: x
s2 replaySubject: r
s2 replaySubject: x

NEXT(j)
s1 subject: j
s2 subject: j
s1 behaviorSubject: j
s2 behaviorSubject: j
s1 replaySubject: j
s2 replaySubject: j

COMPLETE
s1 asyncSubject: j
s2 asyncSubject: j

NEXT(s)
*/