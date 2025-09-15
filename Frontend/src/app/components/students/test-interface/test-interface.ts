import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as faceapi from 'face-api.js';

interface Question {
  id: number;
  question: string;
  type: string;
  options: string[];
}

interface Test {
  name: string;
  questions: Question[];
}

interface ViolationEvent {
  type: 'tab_switch' | 'multiple_faces' | 'no_face' | 'face_away' | 'window_blur' | 'fullscreen_exit' | 'right_click' | 'copy_paste' | 'suspicious_activity';
  timestamp: Date;
  details: string;
}

@Component({
  selector: 'app-test-interface',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './test-interface.html',
  styleUrls: ['./test-interface.css']
})
export class TestInterface implements OnInit, OnDestroy {
  @Output() onComplete = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<void>();
  @ViewChild('proctorVideo', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  testId!: string;
  test!: Test;
  readonly Date = Date;
  readonly String = String;

 testData: Record<string, Test> = {
  psychometric: {
    name: "Psychometric Assessment",
    questions: [
      { id: 1, question: "You prefer to work in teams rather than alone.", type: "likert",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
      { id: 2, question: "You remain calm under pressure.", type: "likert",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
      { id: 3, question: "You enjoy taking leadership roles in group projects.", type: "likert",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
      { id: 4, question: "You adapt quickly to new situations.", type: "likert",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
      { id: 5, question: "You are detail-oriented and thorough in your work.", type: "likert",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
      { id: 6, question: "You enjoy taking initiative without being asked.", type: "likert",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
      { id: 7, question: "You prefer structured tasks over open-ended ones.", type: "likert",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
      { id: 8, question: "You handle conflicts constructively and professionally.", type: "likert",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
      { id: 9, question: "You are motivated by achieving long-term goals.", type: "likert",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
      { id: 10, question: "You are comfortable making decisions independently.", type: "likert",
        options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
    ]
  },

  aptitude: {
    name: "Aptitude Test",
    questions: [
      { id: 1, question: "If 5 machines can produce 5 widgets in 5 minutes, how many machines are needed to produce 100 widgets in 100 minutes?", type: "multiple",
        options: ["5", "20", "25", "100"] },
      { id: 2, question: "What comes next in the sequence: 2, 6, 18, 54, ?", type: "multiple",
        options: ["108", "162", "216", "270"] },
      { id: 3, question: "A train 150m long passes a pole in 15 seconds. What is its speed?", type: "multiple",
        options: ["10 km/h", "36 km/h", "54 km/h", "60 km/h"] },
      { id: 4, question: "The average of first 10 natural numbers is:", type: "multiple",
        options: ["4.5", "5.0", "5.5", "6.0"] },
      { id: 5, question: "If a:b = 2:3 and b:c = 4:5, then a:c equals:", type: "multiple",
        options: ["8:15", "2:5", "3:5", "4:15"] },
      { id: 6, question: "The sum of angles in a pentagon is:", type: "multiple",
        options: ["360°", "450°", "540°", "720°"] },
      { id: 7, question: "If the cost price is 80 and selling price is 100, the profit % is:", type: "multiple",
        options: ["15%", "20%", "25%", "30%"] },
      { id: 8, question: "Find the odd one out: 16, 25, 36, 72, 49", type: "multiple",
        options: ["16", "25", "36", "72", "49"] },
      { id: 9, question: "Which number is divisible by 11?", type: "multiple",
        options: ["1331", "1452", "2022", "3086"] },
      { id: 10, question: "Simplify: (256)^0.5 × (16)^0.5", type: "multiple",
        options: ["64", "32", "16", "128"] }
    ]
  },

  technical: {
    name: "Technical MCQ",
    questions: [
      { id: 1, question: "Which of the following is NOT a fundamental concept in OOP?", type: "multiple",
        options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"] },
      { id: 2, question: "What is the time complexity of binary search?", type: "multiple",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"] },
      { id: 3, question: "Which data structure uses FIFO principle?", type: "multiple",
        options: ["Stack", "Queue", "Tree", "Graph"] },
      { id: 4, question: "In SQL, which command is used to remove a table?", type: "multiple",
        options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"] },
      { id: 5, question: "Which keyword in Java is used to inherit a class?", type: "multiple",
        options: ["super", "extends", "this", "implements"] },
      { id: 6, question: "Which HTTP method is idempotent?", type: "multiple",
        options: ["GET", "POST", "PATCH", "CONNECT"] },
      { id: 7, question: "Which of the following is a NoSQL database?", type: "multiple",
        options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"] },
      { id: 8, question: "Which sorting algorithm has O(n^2) complexity in worst case?", type: "multiple",
        options: ["Merge Sort", "Quick Sort", "Heap Sort", "Bubble Sort"] },
      { id: 9, question: "What is the default port of HTTP?", type: "multiple",
        options: ["21", "22", "80", "443"] },
      { id: 10, question: "Which language is primarily used for styling web pages?", type: "multiple",
        options: ["HTML", "CSS", "JavaScript", "Python"] }
    ]
  }
};


  currentQuestion = 0;
  answers: Record<number, string> = {};
  timeRemaining = 1800;
  timer: any;
  warnings: string[] = [];
  violations: ViolationEvent[] = [];
  cameraActive = false;
  mediaStream: MediaStream | null = null;

  // Proctoring states
  tabSwitchCount = 0;
  windowBlurCount = 0;
  isFullScreen = false;
  lastFaceDetectionTime = Date.now();
  suspiciousActivityCount = 0;
  warningThreshold = 3;
  
  // Face detection
  faceDetectionInterval: any;
  faceCenterPoint: { x: number, y: number } | null = null;
  faceAwayDuration = 0;
  maxFaceAwayTime = 5000;
  faceDetectionCanvas: HTMLCanvasElement | null = null;
  modelsLoaded = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.testId = this.route.snapshot.paramMap.get('id')!;
    this.test = this.testData[this.testId];
    if (!this.test) {
      console.error("Invalid testId:", this.testId);
      return;
    }

    // Initialize proctoring with proper error handling
    try {
      await this.initializeProctoring();
      this.startTimer();
    } catch (error) {
      console.error('Failed to initialize proctoring:', error);
      this.addWarning('Proctoring initialization failed');
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  // ================== HOST LISTENERS FOR SECURITY ==================

  @HostListener('window:blur', ['$event'])
  onWindowBlur(event: any): void {
    this.windowBlurCount++;
    this.addViolation('window_blur', `Window lost focus (${this.windowBlurCount} times)`);
    this.addWarning(`Window focus lost - Count: ${this.windowBlurCount}`);
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void {
    if (document.hidden) {
      this.tabSwitchCount++;
      this.addViolation('tab_switch', `Tab switched away (${this.tabSwitchCount} times)`);
      this.addWarning(`Tab switch detected - Count: ${this.tabSwitchCount}`);
      
      if (this.tabSwitchCount >= this.warningThreshold) {
        this.handleSuspiciousActivity('Excessive tab switching');
      }
    }
  }

  @HostListener('document:fullscreenchange')
  onFullScreenChange(): void {
    this.isFullScreen = !!document.fullscreenElement;
    if (!this.isFullScreen) {
      this.addViolation('fullscreen_exit', 'Exited fullscreen mode');
      this.addWarning('Fullscreen mode exited');
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    this.addViolation('right_click', 'Right-click attempted');
    this.addWarning('Right-click disabled during test');
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const forbiddenKeys = [
      'F12', 'F5',
      'Control+Shift+I', 'Control+Shift+J', 'Control+Shift+C',
      'Control+U', 'Control+S', 'Control+A', 'Control+C', 'Control+V', 'Control+X',
      'Alt+Tab', 'Control+T', 'Control+N', 'Control+W'
    ];

    const keyCombo = `${event.ctrlKey ? 'Control+' : ''}${event.shiftKey ? 'Shift+' : ''}${event.altKey ? 'Alt+' : ''}${event.key}`;
    
    if (forbiddenKeys.includes(event.key) || forbiddenKeys.includes(keyCombo)) {
      event.preventDefault();
      this.addViolation('copy_paste', `Forbidden key combination: ${keyCombo}`);
      this.addWarning(`Keyboard shortcut blocked: ${keyCombo}`);
    }
  }

  @HostListener('document:copy', ['$event'])
  onCopy(event: ClipboardEvent): void {
    event.preventDefault();
    this.addViolation('copy_paste', 'Copy attempt blocked');
    this.addWarning('Copy operation blocked');
  }

  @HostListener('document:paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    this.addViolation('copy_paste', 'Paste attempt blocked');
    this.addWarning('Paste operation blocked');
  }

  @HostListener('document:cut', ['$event'])
  onCut(event: ClipboardEvent): void {
    event.preventDefault();
    this.addViolation('copy_paste', 'Cut attempt blocked');
    this.addWarning('Cut operation blocked');
  }

  // ================== PROCTORING INITIALIZATION ==================

  async initializeProctoring(): Promise<void> {
    console.log('Initializing proctoring system...');
    
    // Start camera first
    await this.startCamera();
    
    // Wait a bit for camera to stabilize
    await this.delay(1000);
    
    // Then initialize face detection
    if (this.cameraActive) {
      await this.initializeFaceDetection();
    }
    
    // Setup security features
    await this.enterFullScreen();
    this.setupAdditionalSecurity();
    
    console.log('Proctoring system initialized successfully');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async enterFullScreen(): Promise<void> {
    try {
      await document.documentElement.requestFullscreen();
      this.isFullScreen = true;
      console.log('Entered fullscreen mode');
    } catch (err) {
      console.warn('Could not enter fullscreen:', err);
      this.addWarning('Fullscreen mode not available');
    }
  }

  setupAdditionalSecurity(): void {
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('selectstart', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
    this.monitorDevTools();
  }

  monitorDevTools(): void {
    const devtools = { open: false };
    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          this.addViolation('suspicious_activity', 'Developer tools detected');
          this.handleSuspiciousActivity('Developer tools opened');
        }
      } else {
        devtools.open = false;
      }
    }, 500);
  }

  // ================== CAMERA & FACE DETECTION ==================

  async startCamera(): Promise<void> {
    try {
      console.log('Requesting camera access...');
      
      // Check if browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      // Request camera access with specific constraints
      const constraints = {
        video: {
          width: { ideal: 640, max: 1280 },
          height: { ideal: 480, max: 720 },
          facingMode: 'user',
          frameRate: { ideal: 30, max: 30 }
        },
        audio: false // Set to true if you need audio
      };

      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera access granted');

      // Wait for DOM to be ready
      setTimeout(() => {
        this.setupVideoElement();
      }, 100);

    } catch (err) {
      console.error('Camera access failed:', err);
      this.cameraActive = false;
      this.addViolation('suspicious_activity', 'Camera access denied');
      this.addWarning('Camera access required for test');
      this.handleSuspiciousActivity('Camera not accessible');
    }
  }

  private setupVideoElement(): void {
    const videoEl = document.getElementById('proctorVideo') as HTMLVideoElement;
    
    if (!videoEl) {
      console.error('Video element not found in DOM');
      setTimeout(() => this.setupVideoElement(), 500);
      return;
    }

    if (!this.mediaStream) {
      console.error('Media stream not available');
      return;
    }

    console.log('Setting up video element...');
    
    videoEl.srcObject = this.mediaStream;
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.autoplay = true;

    videoEl.onloadedmetadata = () => {
      console.log('Video metadata loaded');
      videoEl.play().then(() => {
        console.log('Video playing successfully');
        this.cameraActive = true;
        
        // Initialize face detection after video starts playing
        if (!this.modelsLoaded) {
          this.initializeFaceDetection();
        }
      }).catch(err => {
        console.error('Video play failed:', err);
        this.cameraActive = false;
      });
    };

    videoEl.onerror = (err) => {
      console.error('Video element error:', err);
      this.cameraActive = false;
    };
  }

  async initializeFaceDetection(): Promise<void> {
    try {
      console.log('Loading face-api.js models...');
      
      // Load models with timeout
      const loadPromise = Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/assets/models')
      ]);

      // Set timeout for model loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Model loading timeout')), 10000)
      );

      await Promise.race([loadPromise, timeoutPromise]);
      
      console.log('Face-api.js models loaded successfully');
      this.modelsLoaded = true;

      // Wait for video to be ready
      const videoEl = document.getElementById('proctorVideo') as HTMLVideoElement;
      if (!videoEl || videoEl.readyState < 2) {
        console.log('Waiting for video to be ready...');
        setTimeout(() => this.initializeFaceDetection(), 1000);
        return;
      }

      this.setupFaceDetectionCanvas(videoEl);

    } catch (err) {
      console.error('Face detection initialization failed:', err);
      this.addWarning('Face detection unavailable - models failed to load');
    }
  }

  private setupFaceDetectionCanvas(videoEl: HTMLVideoElement): void {
    try {
      // Remove existing canvas if any
      if (this.faceDetectionCanvas) {
        this.faceDetectionCanvas.remove();
      }

      // Create canvas for face detection overlay
      this.faceDetectionCanvas = faceapi.createCanvasFromMedia(videoEl);
      this.faceDetectionCanvas.style.position = 'absolute';
      this.faceDetectionCanvas.style.top = '0';
      this.faceDetectionCanvas.style.left = '0';
      this.faceDetectionCanvas.style.pointerEvents = 'none';
      this.faceDetectionCanvas.style.zIndex = '10';

      // Position canvas over video
      const videoContainer = videoEl.parentElement;
      if (videoContainer) {
        videoContainer.style.position = 'relative';
        videoContainer.appendChild(this.faceDetectionCanvas);
      }

      const displaySize = { width: videoEl.videoWidth || 640, height: videoEl.videoHeight || 480 };
      faceapi.matchDimensions(this.faceDetectionCanvas, displaySize);

      console.log('Face detection canvas setup complete');
      this.startFaceDetection(videoEl, this.faceDetectionCanvas, displaySize);

    } catch (err) {
      console.error('Canvas setup failed:', err);
    }
  }

  startFaceDetection(videoEl: HTMLVideoElement, canvas: HTMLCanvasElement, displaySize: any): void {
    console.log('Starting face detection...');
    
    this.faceDetectionInterval = setInterval(async () => {
      try {
        if (!videoEl || videoEl.readyState < 2 || !this.modelsLoaded) {
          return;
        }

        const detections = await faceapi
          .detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        // Clear previous drawings
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          if (resizedDetections.length > 0) {
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          }
        }

        this.analyzeDetections(detections);

      } catch (err) {
        console.error('Face detection error:', err);
      }
    }, 1000);
  }

  analyzeDetections(detections: any[]): void {
    const currentTime = Date.now();
    
    if (detections.length === 0) {
      if (currentTime - this.lastFaceDetectionTime > this.maxFaceAwayTime) {
        this.addViolation('no_face', 'No face detected for extended period');
        if (!this.warnings.includes('No face detected')) {
          this.addWarning('Please ensure your face is visible');
        }
      }
    } else if (detections.length === 1) {
      this.lastFaceDetectionTime = currentTime;
      const detection = detections[0];
      this.checkFaceDirection(detection);
      this.removeWarning('No face detected');
      this.removeWarning('Multiple faces detected');
    } else if (detections.length > 1) {
      this.addViolation('multiple_faces', `${detections.length} faces detected`);
      if (!this.warnings.includes('Multiple faces detected')) {
        this.addWarning('Multiple faces detected - only one person allowed');
      }
    }
  }

  checkFaceDirection(detection: any): void {
    if (detection.landmarks) {
      const nose = detection.landmarks.getNose();
      const leftEye = detection.landmarks.getLeftEye();
      const rightEye = detection.landmarks.getRightEye();
      
      const eyeDistance = Math.abs(leftEye[0].x - rightEye[0].x);
      const normalEyeDistance = 50;
      
      if (eyeDistance < normalEyeDistance * 0.7) {
        this.faceAwayDuration += 1000;
        if (this.faceAwayDuration > 3000) {
          this.addViolation('face_away', 'Face turned away from screen');
          if (!this.warnings.includes('Face turned away')) {
            this.addWarning('Please face the camera');
          }
        }
      } else {
        this.faceAwayDuration = 0;
        this.removeWarning('Face turned away');
      }
    }
  }

  // ================== VIOLATION HANDLING ==================

  addViolation(type: ViolationEvent['type'], details: string): void {
    const violation: ViolationEvent = {
      type,
      timestamp: new Date(),
      details
    };
    
    this.violations.push(violation);
    console.warn('Proctoring Violation:', violation);
    
    if (this.violations.length >= 10) {
      this.handleExcessiveViolations();
    }
  }

  addWarning(warning: string): void {
    if (!this.warnings.includes(warning)) {
      this.warnings.push(warning);
    }
  }

  removeWarning(warning: string): void {
    const index = this.warnings.indexOf(warning);
    if (index > -1) {
      this.warnings.splice(index, 1);
    }
  }

  handleSuspiciousActivity(activity: string): void {
    this.suspiciousActivityCount++;
    this.addViolation('suspicious_activity', activity);
    
    if (this.suspiciousActivityCount >= 3) {
      this.handleExcessiveViolations();
    }
  }

  handleExcessiveViolations(): void {
    alert('Excessive violations detected. Test will be submitted automatically.');
    this.handleSubmit();
  }

  // ================== TIMER AND NAVIGATION ==================

  startTimer(): void {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.handleSubmit();
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  selectAnswer(answer: string, qId: number): void {
    this.answers[qId] = answer;
  }

  nextQuestion(): void {
    if (this.currentQuestion < this.test.questions.length - 1) {
      this.currentQuestion++;
    }
  }

  prevQuestion(): void {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  handleSubmit(): void {
    const results = {
      testId: this.testId,
      answers: this.answers,
      timeSpent: 1800 - this.timeRemaining,
      warnings: this.warnings,
      violations: this.violations,
      proctoringSummary: {
        tabSwitches: this.tabSwitchCount,
        windowBlurs: this.windowBlurCount,
        totalViolations: this.violations.length,
        suspiciousActivities: this.suspiciousActivityCount
      },
      completedAt: new Date().toISOString()
    };

    this.cleanup();
    this.onComplete.emit(results);
    this.router.navigate([`/students/results`, this.testId], { state: { results } });
  }

  // ================== CLEANUP ==================

  cleanup(): void {
    console.log('Cleaning up proctoring system...');

    // Stop timer
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    // Stop face detection
    if (this.faceDetectionInterval) {
      clearInterval(this.faceDetectionInterval);
      this.faceDetectionInterval = null;
    }

    // Stop media stream
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped camera track:', track.kind);
      });
      this.mediaStream = null;
    }

    // Clean up video element
    const videoEl = document.getElementById('proctorVideo') as HTMLVideoElement;
    if (videoEl) {
      videoEl.srcObject = null;
    }

    // Remove face detection canvas
    if (this.faceDetectionCanvas) {
      this.faceDetectionCanvas.remove();
      this.faceDetectionCanvas = null;
    }

    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error('Exit fullscreen error:', err));
    }

    this.cameraActive = false;
    console.log('Cleanup complete');
  }

  // ================== UTILITY METHODS ==================

  getViolationSeverity(): 'low' | 'medium' | 'high' {
    const totalViolations = this.violations.length;
    if (totalViolations >= 10) return 'high';
    if (totalViolations >= 5) return 'medium';
    return 'low';
  }

  getViolationsByType(type: ViolationEvent['type']): ViolationEvent[] {
    return this.violations.filter(v => v.type === type);
  }

  // Debug method to test camera
  async testCamera(): Promise<void> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      console.log('Available video devices:', videoDevices);
      
      if (videoDevices.length === 0) {
        console.error('No video devices found');
        this.addWarning('No camera devices detected');
        return;
      }

      const constraints = { video: { deviceId: videoDevices[0].deviceId } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera test successful:', stream);
      
      // Stop test stream
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error('Camera test failed:', err);
    }
  }
}