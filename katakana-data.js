// 카타카나 데이터
const KATAKANA_DATA = [
    // ア행
    'ア', 'イ', 'ウ', 'エ', 'オ',
    // カ행
    'カ', 'キ', 'ク', 'ケ', 'コ',
    // サ행
    'サ', 'シ', 'ス', 'セ', 'ソ',
    // タ행
    'タ', 'チ', 'ツ', 'テ', 'ト',
    // ナ행
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
    // ハ행
    'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    // マ행
    'マ', 'ミ', 'ム', 'メ', 'モ',
    // ヤ행
    'ヤ', 'ユ', 'ヨ',
    // ラ행
    'ラ', 'リ', 'ル', 'レ', 'ロ',
    // ワ행
    'ワ', 'ヲ', 'ン'
];

/**
 * 배열을 무작위로 섞는 함수
 * @param {Array} array - 섞을 배열
 * @returns {Array} 섞인 새 배열
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * 빙고판용 카타카나 25개를 랜덤하게 선택
 * 중앙(12번 인덱스)는 FREE로 설정
 * @returns {Array} 빙고판용 카타카나 배열
 */
function generateBingoKatakana() {
    const shuffled = shuffleArray(KATAKANA_DATA);
    const selected = shuffled.slice(0, 24); // 24개 선택 (FREE 칸 제외)
    
    // 25칸 배열 생성 (중앙은 FREE)
    const bingoArray = [];
    for (let i = 0; i < 25; i++) {
        if (i === 12) { // 중앙 (2행 2열)
            bingoArray.push('FREE');
        } else if (i < 12) {
            bingoArray.push(selected[i]);
        } else {
            bingoArray.push(selected[i - 1]);
        }
    }
    
    return bingoArray;
}
