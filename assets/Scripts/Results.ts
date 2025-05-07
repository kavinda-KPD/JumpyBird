import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Results")
export class Results extends Component {
  @property({
    type: Label,
    tooltip: "this is score label",
  })
  public scoreLabel: Label;

  @property({
    type: Label,
    tooltip: "this is high score label",
  })
  public highScore: Label;

  @property({
    type: Label,
    tooltip: "this is game over node",
  })
  public resultEnd: Label;

  maxScore: number = 0;
  currentScore: number;

  updateScore(num: number) {
    this.currentScore = num;
    this.scoreLabel.string = this.currentScore.toString();
  }

  resetScore() {
    this.updateScore(0);

    this.hideResults();

    this.scoreLabel.string = this.currentScore.toString();
  }

  addScore() {
    this.updateScore(this.currentScore + 1);
  }

  showResult() {
    this.maxScore = Math.max(this.currentScore, this.maxScore);
    this.highScore.string = "High Score: " + this.maxScore.toString();
    this.resultEnd.node.active = true;
    this.highScore.node.active = true;
  }

  hideResults() {
    this.highScore.node.active = false;
    this.resultEnd.node.active = false;
  }
}
