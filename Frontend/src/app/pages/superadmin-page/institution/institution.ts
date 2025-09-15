import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-institution',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './institution.html',
  styleUrl: './institution.css'
})
export class Institution {

  institution =[
    {
      name:'MIT College of Engineering',college:'Engineering',location:'America',users:'users 5',mail:'mit@gmail.com',phone:'+91 987654321',website:'https://mit.College',admin:'John',status: 'active'
    } ,
    {
      name:'MMC College of Arts',college:'Arts and science',location:'Theni',users:'users 4',mail:'mmc@gmail.com',phone:'+91 34567654',website:'https://mmc.College',admin:'Ganesh',status: 'pending' 
    }, 
    {
      name:'SRM College of Engineering',college:'Engineering',location:'Chennai',users:'users 10',mail:'srm@gmail.com',phone:'+91 432156784',website:'https://srm.College',admin:'Raj',status: 'suspended' 
    }
  ]
}
