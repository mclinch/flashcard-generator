// * This file should define a Node module that exports a constructor for creating cloze-deletion flashcards, e.g.:
//     'module.exports = ClozeCard;'

//   * The constructor should accept two arguments: 'text' and 'cloze'.

//   * The constructed object should have a 'cloze' property that contains _only_ the cloze-deleted portion of the text.

//   * The constructed object should have a 'partial' property that contains _only_ the partial text.

//   * The constructed object should have a 'fullText' property that contains _only_ the full text.

//   * The constructor should throw or log an error when the cloze deletion does _not_ appear in the input text.

//   * Use prototypes to attach these methods, wherever possible.

function ClozeCard(text, cloze) {

  if (!(this instanceof ClozeCard)) {
    return new ClozeCard(text, cloze);
  }

  var clozePostions = clozeDelete(text, cloze);
  this.partial = getPartial(text, clozePostions);
  this.cloze = text.slice(clozePostions[0], clozePostions[1]);

  function getPartial(text, clozePostions) {
    var start = text.slice(0, clozePostions[0]);
    var end = text.slice(clozePostions[1], text.length);
    return start + "..." + end;
  }

  function clozeDelete(text, cloze) {
    var start = text.indexOf(cloze);

    if (start !== -1) {
      return [start, start + cloze.length];
    }
    throw new Error("Something is not right.");
  }
}

ClozeCard.prototype.displayCard = function displayCard() {
  return this.partial.replace(/\.\.\./, "'" + this.cloze + "'");
};

module.exports = ClozeCard;