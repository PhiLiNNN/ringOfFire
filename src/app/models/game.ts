export class Game {
  public players: string[] = ['Hans', 'Peter', 'Freddy'];
  public stack: string[] = [];
  public playedCard: string[] = [];
  public currentPlayer: number = 0;
  constructor() {
    for (let index = 1; index < 14; index++) {
      this.stack.push('ace_' + index);
      this.stack.push('clubs_' + index);
      this.stack.push('diamonds_' + index);
      this.stack.push('hearts_' + index);
    }
    shuffle(this.stack);
  }
}

function shuffle(arr: string[]) {
  let currentIndex = arr.length;
  let temporaryValue: string;
  let randomIndex: number;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
}
