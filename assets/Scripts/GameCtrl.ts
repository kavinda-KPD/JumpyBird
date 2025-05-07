import {
  __private,
  _decorator,
  CCInteger,
  Component,
  director,
  EventKeyboard,
  Input,
  input,
  KeyCode,
  Node,
} from "cc";
const { ccclass, property } = _decorator;
import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";

@ccclass("GameCtrl")
export class GameCtrl extends Component {
  @property({
    type: Ground,
    tooltip: "this is ground component",
  })
  public ground: Ground;

  @property({
    type: Results,
    tooltip: "this is bird node",
  })
  public result: Results;

  @property({
    type: Bird,
    tooltip: "this is bird node",
  })
  public bird: Bird;

  @property({
    type: CCInteger,
  })
  public speed: number = 300;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 200;

  onLoad(): void {
    this.initListener();

    this.result.resetScore();

    director.pause();
  }

  initListener() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    this.node.on(Node.EventType.TOUCH_START, () => {
      this.bird.fly();
    });
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.gameOver();
        break;

      case KeyCode.KEY_P:
        this.result.addScore();
        break;

      case KeyCode.KEY_Q:
        this.resetGame();
        this.bird.resetBird();
        break;
    }
  }

  startGame() {
    this.result.hideResults();
    director.resume();
  }

  resetGame() {
    this.result.resetScore();

    this.startGame();
  }

  gameOver() {
    this.result.showResult();

    director.pause();
  }
}
