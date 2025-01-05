document.addEventListener('DOMContentLoaded', () => {
  const englishButtons = document.querySelectorAll('.english-words .word');
  const japaneseButtons = document.querySelectorAll('.japanese-words .word');
  let selectedEnglishButton = null;
  let selectedJapaneseButton = null;
  let correctMatches = 0;
  let round = 1;

  const vocabulary = [
    { japanese: 'おはよう', english: 'Good morning' },
    { japanese: '元気ですか？', english: 'How are you?' },
    { japanese: '元気です', english: `I'm fine` },
    { japanese: 'まあまあ・悪くない', english: 'not bad' },
    { japanese: '宿題', english: 'homework' },
    { japanese: 'しましたか？', english: 'Did you do it?' },
    { japanese: 'どうぞ', english: 'Here you are!' },
    { japanese: 'はい', english: 'yes' },
    { japanese: 'ありがとう', english: 'Thanks' },
    { japanese: 'あなたはどうですか？', english: 'How about you?' },
    { japanese: '朝', english: 'morning' },
    { japanese: '午後', english: 'afternoon' },
    { japanese: '夕方', english: 'evening' },
    { japanese: 'おやすみなさい', english: 'Goodnight' },
    { japanese: 'さようなら', english: 'Goodbye' },
    { japanese: 'やった！・よかった！', english: 'Oh good!' },
    { japanese: 'よくできたね！', english: 'Good job!' },
    { japanese: 'いいね！・よかったね！', english: `That's good!` },
    { japanese: '明日', english: 'tomorrow' },
    { japanese: '今日', english: 'today' },
  ];

  let usedVocabulary = [];

  function shuffleButtons() {
    const englishContainer = document.querySelector('.english-words');
    const japaneseContainer = document.querySelector('.japanese-words');

    // Select the next 5 unused vocabulary items for the round
    let remainingVocabulary = vocabulary.filter(item => !usedVocabulary.includes(item));
    if (remainingVocabulary.length === 0) {
      // All items used, restart the game
      usedVocabulary = [];
      remainingVocabulary = [...vocabulary]; // Copy the full vocabulary
    }

    const selectedVocabulary = remainingVocabulary.sort(() => Math.random() - 0.5).slice(0, 5);
    usedVocabulary = usedVocabulary.concat(selectedVocabulary);

    // Clear previous contents in containers
    englishContainer.innerHTML = '';
    japaneseContainer.innerHTML = '';

    // Shuffle the English and Japanese words separately
    const englishWords = selectedVocabulary.map(pair => pair.english).sort(() => Math.random() - 0.5);
    const japaneseWords = selectedVocabulary.map(pair => pair.japanese).sort(() => Math.random() - 0.5);

    // Populate the English buttons
    englishWords.forEach(word => {
      const button = document.createElement('button');
      button.classList.add('word');
      button.dataset.word = word;
      button.textContent = word;
      englishContainer.appendChild(button);
    });

    // Populate the Japanese buttons
    japaneseWords.forEach(word => {
      const button = document.createElement('button');
      button.classList.add('word');
      button.dataset.word = word;
      button.textContent = word;
      japaneseContainer.appendChild(button);
    });

    // Update round title
    document.getElementById('round-selection').textContent = `Round ${round}`;
  }

  function handleButtonClick(button, type) {
    if (button.classList.contains('correct') || button.classList.contains('incorrect')) {
      return;
    }

    // If the button is already selected, unselect it (reset to pink)
    if (button.classList.contains('selected')) {
      button.classList.remove('selected');
      if (type === 'english') {
        selectedEnglishButton = null;
      } else if (type === 'japanese') {
        selectedJapaneseButton = null;
      }
      return;
    }

    // Unselect previously selected button in the same list (English or Japanese)
    if (type === 'english' && selectedEnglishButton !== button) {
      if (selectedEnglishButton) {
        selectedEnglishButton.classList.remove('selected');
      }
      selectedEnglishButton = button;
    } else if (type === 'japanese' && selectedJapaneseButton !== button) {
      if (selectedJapaneseButton) {
        selectedJapaneseButton.classList.remove('selected');
      }
      selectedJapaneseButton = button;
    }

    // Add the "selected" class to the clicked button
    button.classList.add('selected');

    // When both buttons are selected, check if they match
    if (selectedEnglishButton && selectedJapaneseButton) {
      const englishWord = selectedEnglishButton.dataset.word;
      const japaneseWord = selectedJapaneseButton.dataset.word;

      if (englishWord === getCorrectTranslation(japaneseWord)) {
        selectedEnglishButton.classList.add('correct');
        selectedJapaneseButton.classList.add('correct');
        selectedEnglishButton.disabled = true;
        selectedJapaneseButton.disabled = true;
        selectedEnglishButton = null;
        selectedJapaneseButton = null;
        correctMatches++;

        if (correctMatches === 5) {
          if (round < 4) {
          // Wait before transitioning to the next round
          setTimeout(() => {   
            round++;
            shuffleButtons();
            correctMatches = 0;
          }, 1000); // 1 second delay
        }else {
          setTimeout(() => {
            showEndGameButtons();
          }, 1500);
        }

      }

      } else {
        selectedEnglishButton.classList.add('incorrect');
        selectedJapaneseButton.classList.add('incorrect');

        // Reset the selections immediately after marking them incorrect
        selectedEnglishButton.classList.remove('incorrect', 'selected');
        selectedJapaneseButton.classList.remove('incorrect', 'selected');

        selectedEnglishButton = null;
        selectedJapaneseButton = null;

        showTryAgainButton();
      }
    }
  }

  function getCorrectTranslation(japaneseWord) {
    const vocabulary = {
      'おはよう': 'Good morning',
      '元気ですか？': 'How are you?',
      '元気です': `I'm fine`,
      'まあまあ・悪くない': 'not bad',
      '宿題': 'homework',
      'しましたか？': 'Did you do it?',
      'どうぞ': 'Here you are!',
      'はい': 'yes',
      'ありがとう': 'Thanks',
      'あなたはどうですか？': 'How about you?',
      '朝': 'morning',
      '午後': 'afternoon',
      '夕方': 'evening',
      'おやすみなさい': 'Goodnight',
      'さようなら': 'Goodbye',
      'やった！・よかった！': 'Oh good!',
      'よくできたね！': 'Good job!',
      'いいね！・よかったね！': `That's good!`,
      '明日': 'tomorrow',
      '今日': 'today',
    };

    return vocabulary[japaneseWord] || '';
  }

  function showTryAgainButton() {
    if (document.getElementById('try-again-button')) return;

    const tryAgainButton = document.createElement('button');
    tryAgainButton.id = 'try-again-button';
    tryAgainButton.innerHTML = '<p style="color: #353535;">Incorrect!</p><p style="font-size: 1.5em;">Try Again</u></p>';
    tryAgainButton.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.3em;
      padding: 10px 30px 20px;
      background-color: #e0e0e0;
      color: #721c24;
      border: 1px double #353535;
      border-radius: 10px;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
      line-height: 2em;
      width: 210px;
      height: auto;
    `;

    tryAgainButton.addEventListener('mouseover', () => {
      tryAgainButton.style.transform = 'translate(-50%, -50%) scale(1.05)';
      tryAgainButton.style.backgroundColor = '#e0e0e0';
      tryAgainButton.style.boxShadow = '0px 15px 25px rgba(0, 0, 0, 0.3)';

    });

    tryAgainButton.addEventListener('mouseout', () => {
      tryAgainButton.style.transform = 'translate(-50%, -50%) scale(1)';
      tryAgainButton.style.backgroundColor = '#e0e0e0';
      tryAgainButton.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.2)';
    });

    tryAgainButton.addEventListener('click', () => {
      tryAgainButton.remove();
      resetButtons(); 
    });


    setTimeout(() => {
      tryAgainButton.remove();
      resetButtons(); 
  }, 1500);


    document.body.appendChild(tryAgainButton);
  }

  function showEndGameButtons() {

  const tryAgainButton = document.getElementById('try-again-button');
  if (tryAgainButton) {
    tryAgainButton.remove();
  }

    const englishWords = document.querySelectorAll('.english-words h2');
    const japaneseWords = document.querySelectorAll('.japanese-words h2');

    englishWords.forEach(h2 => h2.style.color = '#f9f9f9');
    japaneseWords.forEach(h2 => h2.style.color = '#f9f9f9');

    const endGameContainer = document.createElement('div');
    endGameContainer.id = 'end-game-buttons'; 

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.classList.add('end-game-button');
    playAgainButton.addEventListener('click', resetGame);

    const goBackButton = document.createElement('button');
    goBackButton.textContent = 'Go Back';
    goBackButton.classList.add('end-game-button');
    goBackButton.addEventListener('click', () => window.location.href = '../index2.html');

    endGameContainer.appendChild(playAgainButton);
    endGameContainer.appendChild(goBackButton);

    document.body.appendChild(endGameContainer);
  }

  function resetGame() {
      const endGameButtons = document.getElementById('end-game-buttons');
      if (endGameButtons) {
        endGameButtons.remove();
      }
    
      // Reset round and correct matches
      correctMatches = 0;
      round = 1;
    
      // Update round display
      document.getElementById('round-selection').textContent = `Round ${round}`;
    
      // Reset buttons
      const allButtons = document.querySelectorAll('.word');
      allButtons.forEach(button => {
        button.classList.remove('incorrect', 'correct', 'selected');
        button.disabled = false;
      });
    

    shuffleButtons();
  }

  shuffleButtons();

  document.querySelector('.english-words').addEventListener('click', event => {
    if (event.target.classList.contains('word')) {
      handleButtonClick(event.target, 'english');
    }
  });

  document.querySelector('.japanese-words').addEventListener('click', event => {
    if (event.target.classList.contains('word')) {
      handleButtonClick(event.target, 'japanese');
    }
  });


});