import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-questionbank',
  imports: [CommonModule],
  templateUrl: './questionbank.html',
  styleUrl: './questionbank.css'
})
export class Questionbank {

  users =[
    {question:'What is the capital of France?',subject:'geography',difficulty:'easy',createdby:'John Smith',status:'active'},
    {question:'The Earth is flat',subject:'Science',difficulty:'medium',createdby:'Mike Wilson',status:'draft'},
    {question:'Calculate the derivative of x²',subject:'Mathematics',difficulty:'hard',createdby:'John Smith',status:'active'}
  ]
}
