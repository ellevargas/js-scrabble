var Scrabble = function() {};

  letterScores = {"A":1, "B":3, "C":3, "D":2, "E":1, "F":4, "G":2, "H":4, "I":1, "J":8, "K":5, "L":1, "M":3, "N":1, "O":1, "P":3, "Q":10, "R":1, "S":1, "T":1, "U":1, "V":4, "W":4, "X":8, "Y":4, "Z":10}

Scrabble.prototype.score = function(word) {
  this.word = word.toUpperCase().split("");

  if (this.word.length == 7) {
    var score = 50;
  }
  else {
    var score = 0;
  };

  this.word.forEach(function(char) {
    score += letterScores[char]
  });

  return score;
};

Scrabble.prototype.score_highest = function(word_array) {
  var highest_score = ["", 0];

  for (var i = 0; i < word_array.length; i++) {
    var word = word_array[i]

    if (this.score(word) > highest_score[1]) {
      var highest_score = [word, this.score(word)]
    }
    else if (highest_score[1] == this.score(word)) {
      var highest_score = this.tieBreaker(highest_score, [word, this.score(word)]);
    };
  }
  return highest_score[0];
};

Scrabble.prototype.tieBreaker = function(pair1, pair2) {
  if (pair1[0].length != 7 && pair2[0].length != 7) {

    if (pair1[0].length < pair2[0].length) {
      return pair1;
    }
    else if (pair1[0].length > pair2[0].length) {
      return pair2;
    }
    else {
      return pair1;
    };
  }
  else if (pair1[0].length == 7 || pair2[0].length == 7) {
    if (pair1[0].length == 7 && pair2[0].length == 7) {
      return pair1;
    }
    else if (pair1[0].length == 7) {
      return pair1;
    }
    else {
      return pair2;
    }
  }
}


// Scrabble.prototype.helloWorld = function() {
//   return 'hello world!';
// };

module.exports = Scrabble;

var scrabble = new Scrabble();

// console.log(scrabble.score("potatoes")) // 10
// console.log(scrabble.score("majesty")) // 69
// console.log(scrabble.score("apples")) // 10
// console.log(scrabble.score("queen")) // 14

console.log(scrabble.score_highest(["potatoes","apples"]))
