import { Component, OnInit } from '@angular/core';
import { ProjectService } from './state/project/project.service';
import { AuthService } from './auth/auth.service';
import { LoginPayload } from '@trungk18/project/auth/loginPayload';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {EncryptionService} from '../services/encryption.service';
import {CrudServicesService} from '../services/crud-services.service';
import { Router } from '@angular/router';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  expanded: boolean;
  local:string = 'None';
  loginPage:boolean=true;
  registerPage:boolean=false;
  SignupForm:FormGroup;
  LoginForm:FormGroup;
  errors:any=[];
  constructor(private _projectService: ProjectService, 
    private _authService: AuthService,
    public fb: FormBuilder,
    private encryp:EncryptionService,
    private crudService:CrudServicesService,
    private route:Router,
    private _notification: NzNotificationService) {
    this.expanded = true;
  }

  ngOnInit(): void {
    this._authService.login(new LoginPayload());
    this._projectService.getProject();
    this.handleResize();
    if(localStorage.getItem("sessionValue"))
    {
      this.local = localStorage.getItem("sessionValue")
    }
    this.SignupForm = this.fb.group({
      id:[''],
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]],
      projectId: ["140892"]
    });

    this.LoginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    });

    this.crudService.getValue().subscribe((value) => {
      if(value.includes("Logout user"))
      {
        localStorage.removeItem('sessionValue');
        this.local = 'None';
        this.loginPage=true;
        this.registerPage=false;
      }
    });
  }

  handleResize() {
    const match = window.matchMedia('(min-width: 1024px)');
    match.addEventListener('change', (e) => {
      this.expanded = e.matches;
    });
  }

  manualToggle() {
    this.expanded = !this.expanded;
  }

  enable(val)
  {
    if(val == 2)
    {
      this.registerPage = true;
      this.loginPage = false;
    }
    else
    {
      this.registerPage = false;
      this.loginPage = true;
    }
  }

  generateRandomLink() {
    const pattern = '610451aa-10c8-4d7e-9363-311357c0b0dd';
    let link = '';
  
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === 'a') {
        link += this.getRandomCharacter('abcdef');
      } else if (pattern[i] === '0') {
        link += this.getRandomCharacter('0123456789');
      } else {
        link += pattern[i];
      }
    }
  
    return link;
  }
  
  getRandomCharacter(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  onSubmit()
  {
    this.errors = [];
    const randomLink = this.generateRandomLink();
    this.SignupForm.patchValue({
      id:randomLink
    });
    if(!this.SignupForm.invalid)
    {
      this.crudService.postUser(this.SignupForm.value).subscribe((res:any)=>{
        this._notification.create(
          'success',
          'User created successfully.',
          ''
        );
        this.SignupForm.reset();
        this.errors=[];
      });
    }
  }

  checkLogin()
  {
    this.errors = [];
    if(!this.LoginForm.invalid)
    {
      let email = this.LoginForm.controls['email'].value;
      let password = this.LoginForm.controls['password'].value;
      this.crudService.checkLogin(email,password).subscribe((res:any)=>{
        if(res.length > 0)
        {
          const expirationTime = new Date().getTime() + 60 * 60 * 1000; 
          const data = {
            value: res[0].id,
            expirationTime: expirationTime
          };
          this.local = res[0].id;
          this._notification.create(
            'success',
            'Login successfully.',
            ''
          );
          localStorage.setItem('sessionValue', JSON.stringify(data));
          this.route.navigate(['./project/board']);
        }
        else
        {
          this.errors.push("Invalid Credentials...");
          this._notification.create(
            'error',
            'Invalid Credentials.',
            ''
          );
          localStorage.removeItem('sessionValue');
          this.local = 'None';
        }
      });
    }
  }
}
