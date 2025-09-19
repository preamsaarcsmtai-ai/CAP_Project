import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-questionbank',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questionbank.html',
  styleUrls: ['./questionbank.css']   // ✅ fixed (plural)
})
export class Questionbank {

  questions = [   // ✅ renamed from users → questions
    {
      question: 'What is the capital of France?',
      subject: 'geography',
      difficulty: 'easy',
      createdby: 'John Smith',
      status: 'active'
    },
    {
      question: 'The Earth is flat',
      subject: 'Science',
      difficulty: 'medium',
      createdby: 'Mike Wilson',
      status: 'draft'
    },
    {
      question: 'Calculate the derivative of x²',
      subject: 'Mathematics',
      difficulty: 'hard',
      createdby: 'John Smith',
      status: 'active'
    }
  ];
}
