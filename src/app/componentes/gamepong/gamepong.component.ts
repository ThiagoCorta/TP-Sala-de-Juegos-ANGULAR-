import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AuthService } from "../../servicios/auth.service";

@Component({
  selector: "app-gamepong",
  templateUrl: "./gamepong.component.html",
  styleUrls: ["./gamepong.component.css"],
})
export class GamepongComponent implements AfterViewInit {
  public ctx;

  constructor(private authService: AuthService) {}
  // Pelota
  public ballRadius = 10;
  public x: number;
  public y: number;
  public dx = 2;
  public dy = -2;
  public paddleHeight = 10;
  public paddleWidth = 75;
  public paddleX: number;
  public brickRowCount = 3;
  public brickColumnCount = 5;
  public brickWidth = 75;
  public brickHeight = 20;
  public brickPadding = 10;
  public brickOffsetTop = 30;
  public brickOffsetLeft = 30;
  public bricks = [];
  public rightPressed = false;
  public leftPressed = false;

  public endGame;
  public ganaste: number = 0;
  public perdiste: number = 0;

  public interval;
  @ViewChild("myCanvas", { static: false }) canvas: ElementRef;
  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == 39) {
      this.rightPressed = false;
    } else if (event.keyCode == 37) {
      this.leftPressed = false;
    }
  }

  @HostListener("window:keydown", ["$event"])
  keyDown(event: KeyboardEvent) {
    if (event.keyCode == 39) {
      this.rightPressed = true;
    } else if (event.keyCode == 37) {
      this.leftPressed = true;
    }
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
  }

  startGame() {
    this.restart();
    this.createBricks();

    this.interval = setInterval(() => {
      this.clear();
      this.drawBricks();
      this.drawBall();
      this.drawPaddle();
      this.paddleMovement();
      this.collisionDetection();
      this.evalEndGame();

      // posicion pelota
      this.x = this.x + this.dx;
      this.y = this.y + this.dy;
    }, 10);
  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, 2 * Math.PI);
    this.ctx.fillstyle = "white";
    this.ctx.fillStroke = "white";
    this.ctx.Stroke = "10";
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.paddleX,
      this.canvas.nativeElement.height - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight
    );
    this.ctx.fillstyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }

  createBricks() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
        const brickX =
          c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
        const brickY =
          r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
        this.bricks[c][r] = { x: brickX, y: brickY, status: 1 };
      }
    }
  }

  drawBricks() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        if (this.bricks[c][r].status == 1) {
          const brickX = this.bricks[c][r].x;
          const brickY = this.bricks[c][r].y;
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          this.ctx.fillStyle = "white";
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }

  paddleMovement() {
    if (this.rightPressed == true && this.paddleX <= 400) {
      this.paddleX += 5;
    } else if (this.leftPressed == true && this.paddleX >= 5) {
      this.paddleX -= 5;
    }
  }

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        if (this.bricks[c][r].status == 1) {
          if (
            this.x > this.bricks[c][r].x &&
            this.x < this.bricks[c][r].x + this.brickWidth &&
            this.y > this.bricks[c][r].y &&
            this.y < this.bricks[c][r].y + this.brickHeight
          ) {
            this.bricks[c][r].status = 0;
            this.dy *= -1;
          }
        }
      }
    }
    if (
      this.x + this.dx >= this.canvas.nativeElement.width - this.ballRadius ||
      this.x < this.ballRadius
    ) {
      this.dx *= -1;
    }
    if (this.y + this.dy <= this.ballRadius) {
      this.dy *= -1;
    }
    if (this.y >= this.canvas.nativeElement.height - this.ballRadius) {
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
        this.dy *= -1;
      } else {
        clearInterval(this.interval);
        this.perdiste++;
        this.authService.perdio();
        this.clear();
      }
    }
  }

  evalEndGame() {
    var contador = 0;
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        if (this.bricks[c][r].status == 0) {
          contador++;
        }
      }
    }
    if (contador == this.brickColumnCount * this.brickRowCount) {
      clearInterval(this.interval);
      this.authService.gano();
      this.ganaste++;
      this.clear();
    }
  }

  clear() {
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }

  restart() {
    this.x = this.canvas.nativeElement.width / 2;
    this.y = this.canvas.nativeElement.height - 30;
    this.paddleX = (this.canvas.nativeElement.width - this.paddleWidth) / 2;
    this.ballRadius = 10;

    this.dx = 2;
    this.dy = -2;
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.bricks = [];
    this.rightPressed = false;
    this.leftPressed = false;
  }
}
