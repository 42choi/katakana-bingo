// 게임 상태 관리
class KatakanaBingoGame {
    constructor() {
        this.bingoData = [];
        this.selectedCells = new Set();
        this.bingoLines = 0;
        this.gameActive = true;
        
        this.initializeElements();
        this.bindEvents();
        this.startNewGame();
    }

    /**
     * DOM 요소들을 초기화
     */
    initializeElements() {
        this.bingoBoard = document.getElementById('bingoBoard');
        this.bingoCountDisplay = document.getElementById('bingoCount');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.bingoBtn = document.getElementById('bingoBtn');
        this.celebrationOverlay = document.getElementById('celebrationOverlay');
        this.fireworksContainer = document.getElementById('fireworksContainer');
        this.celebrationSound = document.getElementById('celebrationSound');
    }

    /**
     * 이벤트 리스너들을 바인딩
     */
    bindEvents() {
        // 새 게임 시작 버튼
        if (this.newGameBtn) {
            this.newGameBtn.addEventListener('click', (e) => {
                console.log('새 게임 시작 버튼 클릭됨!');
                e.preventDefault();
                this.startNewGame();
            });
            console.log('새 게임 버튼 이벤트 바인딩 완료');
        } else {
            console.error('새 게임 버튼을 찾을 수 없습니다!');
        }
        
        // 빙고 버튼
        if (this.bingoBtn) {
            this.bingoBtn.addEventListener('click', (e) => {
                console.log('빙고 버튼 클릭됨!');
                e.preventDefault();
                this.celebrateBingo();
            });
            console.log('빙고 버튼 이벤트 바인딩 완료');
        }
        
        // 축하 오버레이 클릭 시 닫기
        if (this.celebrationOverlay) {
            this.celebrationOverlay.addEventListener('click', (e) => {
                if (e.target === this.celebrationOverlay) {
                    console.log('축하 오버레이 클릭으로 닫기');
                    this.closeCelebration();
                }
            });
        }
    }

    /**
     * 새 게임을 시작
     */
    startNewGame() {
        console.log('새 게임을 시작합니다!');
        
        // 게임 상태 초기화
        this.bingoData = generateBingoKatakana();
        this.selectedCells.clear();
        this.bingoLines = 0;
        this.gameActive = true;
        
        // UI 업데이트
        this.renderBingoBoard();
        this.updateBingoCount();
        this.updateBingoButton();
        this.closeCelebration();
        
        // 버튼 상태 명시적 설정
        if (this.newGameBtn) {
            this.newGameBtn.disabled = false;
            this.newGameBtn.style.opacity = '1';
            this.newGameBtn.style.cursor = 'pointer';
        }
        
        console.log('새 게임 시작 완료!');
    }

    /**
     * 빙고판을 렌더링
     */
    renderBingoBoard() {
        this.bingoBoard.innerHTML = '';
        
        this.bingoData.forEach((katakana, index) => {
            const cell = document.createElement('div');
            cell.className = 'bingo-cell';
            cell.textContent = katakana;
            cell.dataset.index = index;
            
            if (katakana === 'FREE') {
                cell.classList.add('free');
                this.selectedCells.add(index); // FREE 칸은 기본 선택
            } else {
                cell.addEventListener('click', () => this.handleCellClick(index));
            }
            
            this.bingoBoard.appendChild(cell);
        });
    }

    /**
     * 빙고판 셀 클릭 처리
     * @param {number} index - 클릭된 셀의 인덱스
     */
    handleCellClick(index) {
        if (!this.gameActive) return;
        
        const cell = this.bingoBoard.children[index];
        
        if (this.selectedCells.has(index)) {
            // 선택 해제
            this.selectedCells.delete(index);
            cell.classList.remove('selected');
        } else {
            // 선택
            this.selectedCells.add(index);
            cell.classList.add('selected');
        }
        
        this.checkBingoLines();
        this.updateBingoCount();
        this.updateBingoButton();
    }

    /**
     * 빙고 라인 개수 확인
     */
    checkBingoLines() {
        const lines = [
            // 가로 라인 (5개)
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            
            // 세로 라인 (5개)
            [0, 5, 10, 15, 20],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            
            // 대각선 라인 (2개)
            [0, 6, 12, 18, 24],
            [4, 8, 12, 16, 20]
        ];
        
        this.bingoLines = lines.filter(line => 
            line.every(index => this.selectedCells.has(index))
        ).length;
    }

    /**
     * 빙고 개수 표시 업데이트
     */
    updateBingoCount() {
        this.bingoCountDisplay.textContent = this.bingoLines;
    }

    /**
     * 빙고 버튼 상태 업데이트
     */
    updateBingoButton() {
        this.bingoBtn.disabled = this.bingoLines < 3;
    }

    /**
     * 빙고 축하 효과 실행
     */
    celebrateBingo() {
        if (this.bingoLines < 3) return;
        
        this.gameActive = false;
        this.showCelebrationOverlay();
        this.playSound();
        this.createFireworks();
        
        // 3초 후 자동으로 새 게임 시작 옵션 표시
        setTimeout(() => {
            this.showNewGameOption();
        }, 3000);
    }

    /**
     * 축하 오버레이 표시
     */
    showCelebrationOverlay() {
        this.celebrationOverlay.classList.add('show');
    }

    /**
     * 축하 오버레이 닫기
     */
    closeCelebration() {
        this.celebrationOverlay.classList.remove('show');
        this.fireworksContainer.innerHTML = '';
    }

    /**
     * 축하 음악 재생
     */
    playSound() {
        try {
            this.celebrationSound.currentTime = 0;
            this.celebrationSound.play().catch(e => {
                console.log('오디오 재생 실패:', e);
            });
        } catch (e) {
            console.log('오디오 재생 오류:', e);
        }
    }

    /**
     * 불꽃놀이 효과 생성
     */
    createFireworks() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
        const fireworkCount = 15;
        
        for (let i = 0; i < fireworkCount; i++) {
            setTimeout(() => {
                this.createSingleFirework(colors);
            }, i * 200);
        }
    }

    /**
     * 단일 불꽃 효과 생성
     * @param {Array} colors - 사용할 색상 배열
     */
    createSingleFirework(colors) {
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * window.innerHeight;
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework';
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 50 + Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.background = color;
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.boxShadow = `0 0 10px ${color}`;
            
            // 파티클 움직임 애니메이션
            const deltaX = Math.cos(angle) * velocity;
            const deltaY = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--deltaX', deltaX + 'px');
            particle.style.setProperty('--deltaY', deltaY + 'px');
            
            // 커스텀 애니메이션 적용
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(${deltaX}px, ${deltaY}px) scale(1)`,
                    opacity: 1,
                    offset: 0.7
                },
                {
                    transform: `translate(${deltaX * 1.5}px, ${deltaY * 1.5}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1500,
                easing: 'ease-out'
            });
            
            this.fireworksContainer.appendChild(particle);
            
            // 파티클 제거
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1500);
        }
    }

    /**
     * 새 게임 시작 옵션 표시
     */
    showNewGameOption() {
        const celebrationText = document.querySelector('.celebration-text');
        if (celebrationText) {
            celebrationText.innerHTML = '빙고완성!<br><small style="font-size: 1.5rem; margin-top: 20px; display: block;">화면을 클릭하거나 "새 게임 시작" 버튼을 눌러주세요</small>';
        }
    }
}

// 전역 변수로 게임 인스턴스 저장
let bingoGame = null;

// 게임 초기화 함수
function initGame() {
    console.log('게임 초기화 시작...');
    
    // DOM 요소들이 존재하는지 확인
    const bingoBoard = document.getElementById('bingoBoard');
    const newGameBtn = document.getElementById('newGameBtn');
    const bingoBtn = document.getElementById('bingoBtn');
    
    if (!bingoBoard || !newGameBtn || !bingoBtn) {
        console.log('DOM 요소가 아직 준비되지 않음, 0.5초 후 재시도...');
        setTimeout(initGame, 500);
        return;
    }
    
    console.log('DOM 요소 확인 완료');
    
    try {
        bingoGame = new KatakanaBingoGame();
        console.log('게임 초기화 성공!');
    } catch (error) {
        console.error('게임 초기화 오류:', error);
        console.log('수동 게임 시작으로 대체');
        manualStartGame();
    }
}

// 여러 방법으로 초기화 시도
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}

// 추가 보험
setTimeout(initGame, 1000);

// 전역 함수로 버튼 이벤트 처리 (HTML onclick에서 직접 호출)
function startNewGameDirect() {
    console.log('직접 새 게임 시작 호출됨!');
    
    if (bingoGame && bingoGame.startNewGame) {
        bingoGame.startNewGame();
    } else {
        console.log('게임 인스턴스가 없음, 수동으로 게임 시작');
        manualStartGame();
    }
}

function celebrateBingoDirect() {
    console.log('직접 빙고 축하 호출됨!');
    
    if (bingoGame && bingoGame.celebrateBingo) {
        bingoGame.celebrateBingo();
    } else {
        console.log('게임 인스턴스가 없음');
    }
}

// 수동 게임 시작 함수 (백업용)
function manualStartGame() {
    console.log('수동 게임 시작');
    
    const bingoBoard = document.getElementById('bingoBoard');
    const bingoCountDisplay = document.getElementById('bingoCount');
    const bingoBtn = document.getElementById('bingoBtn');
    
    if (!bingoBoard) {
        console.error('빙고판을 찾을 수 없습니다');
        return;
    }
    
    // 빙고판 초기화
    bingoBoard.innerHTML = '';
    
    // 카타카나 데이터 생성
    const katakanaData = generateBingoKatakana();
    
    // 선택된 셀 추적
    const selectedCells = new Set();
    selectedCells.add(12); // FREE 칸
    
    // 빙고판 생성
    katakanaData.forEach((katakana, index) => {
        const cell = document.createElement('div');
        cell.className = 'bingo-cell';
        cell.textContent = katakana;
        
        if (katakana === 'FREE') {
            cell.classList.add('free');
        } else {
            cell.addEventListener('click', () => {
                console.log(`셀 ${index} 클릭: ${katakana}`);
                
                if (selectedCells.has(index)) {
                    selectedCells.delete(index);
                    cell.classList.remove('selected');
                } else {
                    selectedCells.add(index);
                    cell.classList.add('selected');
                }
                
                // 빙고 라인 확인
                const bingoLines = checkBingoLines(selectedCells);
                
                if (bingoCountDisplay) {
                    bingoCountDisplay.textContent = bingoLines;
                }
                
                if (bingoBtn) {
                    bingoBtn.disabled = bingoLines < 3;
                }
                
                console.log(`현재 빙고 라인: ${bingoLines}`);
            });
        }
        
        bingoBoard.appendChild(cell);
    });
    
    // 초기 상태 설정
    if (bingoCountDisplay) {
        bingoCountDisplay.textContent = '0';
    }
    if (bingoBtn) {
        bingoBtn.disabled = true;
    }
    
    console.log('수동 게임 시작 완료!');
}

// 빙고 라인 확인 함수
function checkBingoLines(selectedCells) {
    const lines = [
        // 가로 라인
        [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
        // 세로 라인  
        [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
        // 대각선 라인
        [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
    ];
    
    return lines.filter(line => line.every(index => selectedCells.has(index))).length;
}

// 더 나은 축하 음향을 위한 웹 오디오 API 사용 (선택사항)
function createCelebrationTone() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    } catch (e) {
        console.log('웹 오디오 API 사용 불가:', e);
    }
}
