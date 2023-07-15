import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudServicesService {
  jsonUsersUrl:string='http://localhost:3000/users';
  jsonIssuesUrl:string='http://localhost:3000/issues';
  jsonProjectUrl:string='http://localhost:3000/project';
  private valueSubject: Subject<any> = new Subject<any>();

  constructor(private _http: HttpClient) { }


  setValue(value: string) {
    this.valueSubject.next(value);
  }

  getValue(): Observable<string> {
    return this.valueSubject.asObservable();
  }

  // Post
  postUser(data:any): Observable<any>
  {
    return this._http.post(this.jsonUsersUrl, data);
  }

  postIssues(data:any): Observable<any>
  {
    return this._http.post(this.jsonIssuesUrl, data);
  }

  // Get
  getUsers(): Observable<any>
  {
    return this._http.get(this.jsonUsersUrl);
  }

  getIssues(): Observable<any>
  {
    return this._http.get(this.jsonIssuesUrl);
  }

  //PUt
  putUser(inv: any): Observable<any> {
    const apiURL = `${this.jsonUsersUrl}/${inv.id}`;
    return this._http.put(apiURL, inv);
  }

  putIssues(inv: any): Observable<any> {
    const apiURL = `${this.jsonIssuesUrl}/${inv.id}`;
    return this._http.put(apiURL, inv);
  }

  //Delete
  deleteUser(id: number): Observable<any> {
    const apiURL = `${this.jsonUsersUrl}/${id}`;
    return this._http.delete(apiURL);
  }

  deleteIssue(id: number): Observable<any> {
    const apiURL = `${this.jsonIssuesUrl}/${id}`;
    return this._http.delete(apiURL);
  }

  // checkLogin

  checkLogin(email:any,password:any): Observable<any>
  {
    return this._http.get(`http://localhost:3000/users?email=${email}&password=${password}`);
  }

  //get Project
    getProject()
    {
      return this._http.get(this.jsonProjectUrl);
    }

    // updateProject
    putProject(inv: any): Observable<any> {
      const apiURL = `${this.jsonProjectUrl}/${inv.id}`;
      return this._http.put(apiURL, inv);
    }
}
