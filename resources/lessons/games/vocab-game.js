document.addEventListener('DOMContentLoaded', () => {
    const englishButtons = document.querySelectorAll('.english-words .word');
    const japaneseButtons = document.querySelectorAll('.japanese-words .word');
    let selectedEnglishButton = null;
    let selectedJapaneseButton = null;
    let correctMatches = 0;
  
    // Shuffle function to randomize buttons
    function shuffleButtons() {
      const englishContainer = document.querySelector('.english-words');
      const japaneseContainer = document.querySelector('.japanese-words');
  
      const englishArray = Array.from(englishContainer.querySelectorAll('.word'));
      const japaneseArray = Array.from(japaneseContainer.querySelectorAll('.word'));
  
      // Shuffle English and Japanese arrays
      englishArray.sort(() => Math.random() - 0.5);
      japaneseArray.sort(() => Math.random() - 0.5);
  
      // Reattach shuffled buttons to the container
      englishArray.forEach(button => englishContainer.appendChild(button));
      japaneseArray.forEach(button => japaneseContainer.appendChild(button));
    }
  
    // Handle button clicks
    function handleButtonClick(button, type) {
      if (button.classList.contains('correct') || button.classList.contains('incorrect')) {
        return; // Don't allow clicks on already matched or incorrect buttons
      }
  
      button.classList.add('selected');
  
      if (type === 'english') {
        selectedEnglishButton = button;
      } else if (type === 'japanese') {
        selectedJapaneseButton = button;
      }
  
      // If both buttons are selected, check if they match
      if (selectedEnglishButton && selectedJapaneseButton) {
        const englishWord = selectedEnglishButton.dataset.word;
        const japaneseWord = selectedJapaneseButton.dataset.word;
  
        if (englishWord === getCorrectTranslation(japaneseWord)) {
          // Correct match
          selectedEnglishButton.classList.add('correct');
          selectedJapaneseButton.classList.add('correct');
          selectedEnglishButton.disabled = true;
          selectedJapaneseButton.disabled = true;
          selectedEnglishButton = null;
          selectedJapaneseButton = null;
          correctMatches++;
  
          // Check if the game is complete
          if (correctMatches === englishButtons.length) {
            showEndGameButtons();
          }
        } else {
          // Incorrect match
          selectedEnglishButton.classList.add('incorrect');
          selectedJapaneseButton.classList.add('incorrect');
  
          // Show the "Try Again" button
          showTryAgainButton();
  
          // Reset buttons after a short delay (without resetting the game)
          setTimeout(() => {
            selectedEnglishButton.classList.remove('incorrect');
            selectedJapaneseButton.classList.remove('incorrect');
            selectedEnglishButton.classList.remove('selected');
            selectedJapaneseButton.classList.remove('selected');
            selectedEnglishButton = null;
            selectedJapaneseButton = null;
          }, 1000);
        }
      }
    }
  
    // Map Japanese word to correct English word
    function getCorrectTranslation(japaneseWord) {
      switch (japaneseWord) {
        case 'りんご': return 'apple';
        case 'バナナ': return 'banana';
        case 'ねこ': return 'cat';
        case 'いぬ': return 'dog';
        case 'ぞう': return 'elephant';
        default: return '';
      }
    }
  
    // Show the "Incorrect! Try Again" button
    function showTryAgainButton() {
      const tryAgainButton = document.createElement('button');
      tryAgainButton.id = 'try-again-button';
      tryAgainButton.innerHTML = '<p>Incorrect!</p><p>Click to Try Again</p>';
      tryAgainButton.style.position = 'fixed';
      tryAgainButton.style.top = '50%';
      tryAgainButton.style.left = '50%';
      tryAgainButton.style.transform = 'translate(-50%, -50%)';
      tryAgainButton.style.fontSize = '2em';
      tryAgainButton.style.padding = '15px 30px';
      tryAgainButton.style.backgroundColor = '#f8d7da';
      tryAgainButton.style.color = '#721c24';
      tryAgainButton.style.border = 'none';
      tryAgainButton.style.borderRadius = '10px';
      tryAgainButton.style.cursor = 'pointer';
      tryAgainButton.style.zIndex = '1000';
      tryAgainButton.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.2)';
      tryAgainButton.style.transition = 'all 0.3s ease-in-out';
  
      // Add event listener to reset the game when clicked
      tryAgainButton.addEventListener('click', () => {
        const tryAgainButtonElement = document.getElementById('try-again-button');
        if (tryAgainButtonElement) tryAgainButtonElement.remove();
      });
      
      document.body.appendChild(tryAgainButton);
    }
  
    // Show the "Play Again" and "Go Back" buttons
      function showEndGameButtons() {
                // Inside the showEndGameButtons function, add this:
      const englishWords = document.querySelectorAll('.english-words h2');
      const japaneseWords = document.querySelectorAll('.japanese-words h2');

    // Hide the h2 elements by changing their color to #f9f9f9
      englishWords.forEach(h2 => h2.style.color = '#f9f9f9');
      japaneseWords.forEach(h2 => h2.style.color = '#f9f9f9');

      const endGameContainer = document.createElement('div');
      endGameContainer.id = 'end-game-buttons';
      endGameContainer.style.position = 'fixed';
      endGameContainer.style.top = '50%';
      endGameContainer.style.left = '50%';
      endGameContainer.style.transform = 'translate(-50%, -50%)';
      endGameContainer.style.textAlign = 'center';
      endGameContainer.style.zIndex = '1000';
  
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
  
    // Reset the game when the "Play Again" button is clicked
    function resetGame() {
      const endGameButtons = document.getElementById('end-game-buttons');
      if (endGameButtons) {
        endGameButtons.remove();
      }
  
      correctMatches = 0;
  
      // Reset button states
      const allButtons = document.querySelectorAll('.word');
      allButtons.forEach(button => {
        button.classList.remove('incorrect', 'correct', 'selected');
        button.disabled = false;
      });
  
      // Shuffle buttons again
      shuffleButtons();
    }
  
    // Shuffle the buttons at the start
    shuffleButtons();
  
    // Attach event listeners to all buttons
    englishButtons.forEach(button => button.addEventListener('click', () => handleButtonClick(button, 'english')));
    japaneseButtons.forEach(button => button.addEventListener('click', () => handleButtonClick(button, 'japanese')));
  });
  