import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import {
  Firestore,
  collection,
  getDocs,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    DialogAddPlayerComponent,
    MatDialogModule,
    GameInfoComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  pickCardAnimation = false;
  game: Game = new Game();
  currentCard: string = '';
  animal: string = '';
  name: string = '';

  // unsubGame;
  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {
    // this.unsubGame = this.getGamesRef();
    // this.fetchGames();
  }
  getGamesRef() {
    return collection(this.firestore, 'games');
  }
  // async fetchGames() {
  //   const gamesRef = this.getGamesRef();
  //   const gamesSnapshot = await getDocs(gamesRef);
  //   const gamesList = gamesSnapshot.docs.map((doc) => doc.data());
  //   console.log('Games:', gamesList);
  // }

  ngOnInit() {
    this.newGame();
  }

  async newGame() {
    this.game = new Game();
    await this.addNote(this.game);
  }
  async addNote(item: {}) {
    await addDoc(this.getGamesRef(), { hallo: 'ssss' })
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: :>> ', docRef?.id);
      });
  }

  takeCard() {
    if (this.game.players.length !== 0) {
      if (!this.pickCardAnimation) {
        this.currentCard = this.game.stack.pop() || '';
        this.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer =
          this.game.currentPlayer % this.game.players.length;
      }

      setTimeout(() => {
        this.game.playedCard.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name) => {
      if (name && name.length > 0) this.game.players.push(name);
    });
  }
}
