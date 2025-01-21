import * as vsc from "vscode";
import { config } from "~/config";

type SortSelections = {
  (editor: vsc.TextEditor, direction?: "asc" | "desc"): vsc.Selection[];
  (selections: readonly vsc.Selection[], direction?: "asc" | "desc"): vsc.Selection[];
};

/**
 * Sorts an array of VSCode selections based on cursor position.
 *
 * If a TextEditor instance is passed, `editor.selections` is updated automatically.
 *
 * @param selections Array of VSCode selections to sort, or a TextEditor instance
 * @param direction Sort direction - "asc" sorts from top to bottom, "desc" sorts from bottom to top
 * @returns New array of sorted selections.
 */

export const sortSelections: SortSelections = (arg1, direction = "asc") => {
  const isEditor = "selections" in arg1;

  const selections = isEditor ? arg1.selections : arg1;

  const directionNum = direction === "asc" ? 1 : -1;

  const sortedSelections = [...selections].sort((sel1, sel2) =>
    sel1.active.isBefore(sel2.active) ? -1 * directionNum : 1 * directionNum,
  );

  if (isEditor) {
    arg1.selections = sortedSelections;
    return sortedSelections;
  } else {
    return sortedSelections;
  }
};

/**
 * Re-selects empty selections after a replace operation
 * @param oldSelections Array of old selections
 * @param editor Editor instance
 * @returns New array of re-selected selections
 *
 */

export const reselectAfterReplace = (
  oldSelections: readonly vsc.Selection[],
  editor: vsc.TextEditor,
) => {
  const newSelections = editor.selections.map((currSel, currSelInd) => {
    const oldSel = oldSelections[currSelInd];
    if (!oldSel.isEmpty) return currSel;
    return new vsc.Selection(oldSel.active, currSel.active);
  });

  editor.selections = newSelections;
};

/**
 * Checks if all selections are empty
 * @param selections Array of selections
 * @returns True if all selections are empty, false otherwise
 */

export const selectionsAreEmpty = (selections: readonly vsc.Selection[]) => {
  return selections.every((sel) => sel.isEmpty);
};

/**
 * Checks if all selections are sorted in ascending order
 * @param selections Array of selections
 * @returns True if all selections are sorted, false otherwise
 */

export const selectionsAreSorted = (selections: readonly vsc.Selection[]) => {
  return selections.every(
    (sel, ind) => ind === selections.length - 1 || sel.active.isBefore(selections[ind + 1].active),
  );
};

/**
 * Reveals the first selection in the editor
 * @param editor Editor instance
 * @param threshold If `selection.active`.character is less than threshold, reveal range will be from line start to `selection.active`, otherwise it will be from `selection.active` - offset to `selection.active`
 * @param offset How far to offset the reveal range from `selection.active` to the left
 */

export const revealFirstSelection = ({ editor }: { editor: vsc.TextEditor }) => {
  const { threshold, offset } = config.reveal;
  const {
    selection: { active },
  } = editor;
  if (active.character <= threshold) {
    editor.revealRange(new vsc.Range(new vsc.Position(active.line, 0), active));
  } else {
    editor.revealRange(new vsc.Range(active.translate({ characterDelta: offset * -1 }), active));
  }
};
