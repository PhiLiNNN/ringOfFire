import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  pickCardAnimation = false;
  game: Game = new Game();
  currentCard: string = '';

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
    }

    setTimeout(() => {
      this.pickCardAnimation = false;
    }, 1500);
  }
}
