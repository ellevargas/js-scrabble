var Scrabble = function() {

  letterScores = {"A":1, "B":3, "C":3, "D":2, "E":1, "F":4, "G":2, "H":4, "I":1, "J":8, "K":5, "L":1, "M":3, "N":1, "O":1, "P":3, "Q":10, "R":1, "S":1, "T":1, "U":1, "V":4, "W":4, "X":8, "Y":4, "Z":10}

  Scrabble.prototype.score = function(word) {
    this.word = word.toUpperCase().split(/(?=.)/u);
    var score = 0;

    if (this.word.length == 7) {
      score += 50;
    };

    this.word.forEach(function(char) {
      score += letterScores[char]
    });

    return score;
  };

  Scrabble.prototype.scoreHighest = function(wordArray) {
    var highestScore = ["", 0];

    for (var i = 0; i < wordArray.length; i++) {
      var word = wordArray[i]

      if (this.score(word) > highestScore[1]) {
        var highestScore = [word, this.score(word)]
      }
      else if (highestScore[1] == this.score(word)) {
        var highestScore = this.tieBreaker(highestScore, [word, this.score(word)]);
      };
    }
    return highestScore[0];
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
  };

};


var Player = function(name) {
  this.name = name.toUpperCase();
  this.playerWords = [];
  var scrabble = new Scrabble();

  Player.prototype.playerName = function() {
    return this.name;
  };

  Player.prototype.plays = function() {
    return this.playerWords;
  };

  Player.prototype.play = function(word) {
    if (this.hasWon()) {
      return false;
    }
    else {
      this.playerWords.push(word);
    }
  };

  Player.prototype.totalScore = function() {
    var totalScore = 0;

    this.playerWords.forEach(function(word) {
      totalScore += scrabble.score(word);
    });

    return totalScore;
  }

  Player.prototype.hasWon = function() {
    if (this.totalScore() > 100) {
      return true;
    }
    else {
      return false;
    };
  }

  Player.prototype.highestScoringWord = function() {
    return scrabble.scoreHighest(this.playerWords);
  }

  Player.prototype.highestScoringWord = function() {
    return scrabble.scoreHighest(this.playerWords);
  }

  Player.prototype.highestWordScore = function() {
    return scrabble.score(this.highestScoringWord());
  }

};

module.exports = Scrabble;

var scrabble = new Scrabble();

var player1 = new Player("Elle");
var player2 = new Player("Jessica");

// console.log(scrabble.score("potatoes")) // 10
// console.log(scrabble.score("majesty")) // 69
// console.log(scrabble.score("apples")) // 10
// console.log(scrabble.score("queen")) // 14

// console.log(scrabble.scoreHighest(["potatoes","apples", "lumberjack"]))

console.log(player1.playerName("Elle"))

player1.play("sandwich")
player1.play("potato")
player1.play("majesty")

console.log(player1.plays())
console.log(player1.totalScore())
// console.log(player1.hasWon())
console.log(player1.highestScoringWord())
console.log(player1.highestWordScore())
