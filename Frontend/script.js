let maxNum = 100;
let target = Math.floor(Math.random() * maxNum) + 1;
let tries = 0;
let best = localStorage.getItem('bestScore') || Infinity;

// লোড হওয়ার সময় হাই স্কোর চেক করা
if (best !== Infinity) {
    document.getElementById('highScore').textContent = best;
}

function setDiff(num, btn) {
    maxNum = num;
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('rangeText').textContent = `১ থেকে ${num} এর মধ্যে সংখ্যাটি খুঁজুন`;
    reset();
}

function play() {
    const input = document.getElementById('guessInput');
    const msg = document.getElementById('msg');
    const val = parseInt(input.value);
    
    if (isNaN(val) || val < 1 || val > maxNum) {
        showMsg("সঠিক সংখ্যা দিন!", "#d63031");
        return;
    }
    
    tries++;
    document.getElementById('attempts').textContent = tries;
    
    if (val === target) {
        showMsg(`অসাধারণ! সংখ্যাটি ছিল ${target}।`, "#00b894");
        endGame();
    } else {
        // ভুল হলে শেক এনিমেশন যোগ করা
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 400);
        
        if (val > target) {
            showMsg("বেশি বড়! একটু নিচে নামুন ↓", "#e67e22");
        } else {
            showMsg("বেশি ছোট! আরও উপরে উঠুন ↑", "#e67e22");
        }
    }
    input.value = "";
    input.focus();
}

function showMsg(text, color) {
    const msg = document.getElementById('msg');
    msg.textContent = text;
    msg.style.color = color;
}

function endGame() {
    document.getElementById('checkBtn').style.display = "none";
    document.getElementById('resetBtn').style.display = "block";
    document.getElementById('guessInput').disabled = true;
    
    if (tries < best) {
        best = tries;
        localStorage.setItem('bestScore', best);
        document.getElementById('highScore').textContent = best;
        showMsg(`নতুন রেকর্ড! মাত্র ${tries} বারে জিতলেন! 🏆`, "#00b894");
    }
}

function reset() {
    target = Math.floor(Math.random() * maxNum) + 1;
    tries = 0;
    document.getElementById('attempts').textContent = "০";
    document.getElementById('msg').textContent = "";
    document.getElementById('checkBtn').style.display = "block";
    document.getElementById('resetBtn').style.display = "none";
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessInput').value = "";
    document.getElementById('guessInput').focus();
}

// Enter কী চাপলে যাতে প্লে হয়
document.getElementById('guessInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') play();
});