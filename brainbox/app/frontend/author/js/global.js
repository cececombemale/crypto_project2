import inlineSVG from "../../_common/js/inlineSVG"
import DecoratedInputPort from "../../_common/js/DecoratedInputPort"
import DecoratedOutputPort from "../../_common/js/DecoratedOutputPort"

import ConnectionSelectionFeedbackPolicy from "./editor/brain/ConnectionSelectionFeedbackPolicy"
import Connection from "./editor/brain/figures/Connection"
import ProbeFigure from "./editor/brain/figures/ProbeFigure"
import CircuitFigure from "./editor/brain/figures/CircuitFigure"
import ConnectionRouter from "./editor/brain/ConnectionRouter"
import Raft from "./editor/brain/figures/Raft"
import Mousetrap from "mousetrap"
import LabelInplaceEditor from "./editor/brain/LabelInplaceEditor"
import "./util/mousetrap-global"
import "./util/mousetrap-pause"
import hardware from "./hardware"


export default {
  ConnectionSelectionFeedbackPolicy,
  DecoratedInputPort,
  DecoratedOutputPort,
  Connection,
  Raft,
  hardware,
  ProbeFigure,
  Mousetrap,
  inlineSVG,
  LabelInplaceEditor,
  ConnectionRouter,
  CircuitFigure
}
