import { useNavigate } from 'react-router-dom';
import { getAuth, clearAuth } from '../utils/auth';
import { useEffect, useState } from 'react';

const testSteps = [
  {
    stage: 1,
    title: "1단계: 마법의 시작",
    topic: "출력 (print)",
    desc: "마법사가 되기 위한 첫 번째 관문입니다. 두 줄에 걸쳐서 정확하게 주문을 출력해야 합니다.",
    problem: "print() 명령어를 사용하여 아래 두 줄을 똑같이 출력하세요.\n수리수리\n마수리",
    input: "없음",
    output: "수리수리\n마수리",
    answer: "print('수리수리')\nprint('마수리')"
  },
  {
    stage: 2,
    title: "2단계: 마법사의 프로필",
    topic: "변수와 자료형 (Variables, type)",
    desc: "당신의 능력치와 소지품을 변수 상자에 담고, 그 상자의 정체를 확인해보세요.",
    problem: "마나를 의미하는 'mana' 변수를 만들고 숫자 100을 넣으세요.\n물약을 의미하는 'potion' 변수를 만들고 문자 '빨간물약'을 넣으세요.\n마지막으로 마법의 돋보기인 type() 함수를 써서 mana 변수의 자료형이 무엇인지 출력하세요.",
    input: "없음",
    output: "<class 'int'>",
    answer: "mana = 100\npotion = '빨간물약'\nprint(type(mana))"
  },
  {
    stage: 3,
    title: "3단계: 연속 마법 시전",
    topic: "문자열 연산 (+, *)",
    desc: "마법 주문을 여러 번 연속으로 외쳐야 파워가 강해집니다.",
    problem: "주문을 의미하는 'spell' 변수에 '파이어'라는 문자가 들어있습니다.\n문자열 곱하기(*) 기호를 사용해서 '파이어파이어파이어' 처럼 3번 연속으로 출력되게 코드를 작성하세요.",
    input: "없음",
    output: "파이어파이어파이어",
    answer: "spell = '파이어'\nprint(spell * 3)"
  },
  {
    stage: 4,
    title: "4단계: 인벤토리(가방) 정리",
    topic: "리스트 다루기 (append, remove, len)",
    desc: "가방에 쓸데없는 물건이 들어있습니다. 정리가 필요해요!",
    problem: "inventory = ['구슬', '먼지', '마법서'] 라는 리스트가 주어집니다.\n1. 가방에서 쓸모없는 '먼지'를 삭제(remove) 하세요.\n2. 전설의 아이템인 '지팡이'를 새롭게 추가(append) 하세요.\n3. 마지막으로 len() 함수를 써서 가방에 들어있는 총 아이템 개수를 출력하세요.",
    input: "없음",
    output: "3",
    answer: "inventory = ['구슬', '먼지', '마법서']\ninventory.remove('먼지')\ninventory.append('지팡이')\nprint(len(inventory))",
    hints: [
      {
        title: "힌트 1: 코드 뼈대 잡기",
        content: "어떤 함수를 써야 할지 모르겠다면 아래 뼈대를 참고하세요.\n```python\ninventory.____('먼지')  # 삭제 명령어\ninventory.____('지팡이') # 추가 명령어\nprint(____(inventory))  # 길이 구하는 명령어\n```"
      },
      {
        title: "힌트 2: 완전히 다른 예시 (장바구니)",
        content: "리스트를 다루는 방법이 헷갈린다면 아래 장바구니 예시를 읽어보세요!\n```python\n# 장바구니 리스트 예시\ncart = ['사과', '바나나', '포도']\ncart.remove('사과')  # 사과 빼기\ncart.append('수박')  # 수박 넣기\nprint(len(cart))    # 장바구니에 담긴 물건 개수 출력\n```"
      }
    ]
  },
  {
    stage: 5,
    title: "5단계: 몬스터 스캔",
    topic: "입력과 형변환 (input, int)",
    desc: "눈앞에 나타난 몬스터의 체력을 스캔하여 정확한 숫자로 기억해야 합니다.",
    problem: "input()을 사용해 사용자에게 '몬스터 체력: ' 이라고 묻고 값을 입력받으세요.\n입력받은 값은 반드시 int()를 사용해 정수(진짜 숫자)로 변환한 뒤, 'hp' 라는 변수에 저장하고 그대로 출력하세요.",
    input: "100 (컴파일러에 직접 타이핑 해보세요)",
    output: "몬스터 체력: 100\n100",
    answer: "hp = int(input('몬스터 체력: '))\nprint(hp)",
    hints: [
      {
        title: "힌트 1: 코드 뼈대 잡기",
        content: "괄호가 두 개 겹치는 것에 주의해서 아래 빈칸을 채워보세요.\n```python\nhp = ____(input('_______: '))\nprint(hp)\n```"
      },
      {
        title: "힌트 2: 완전히 다른 예시 (나이 묻기)",
        content: "나이를 물어보고 숫자로 바꾸는 아래 코드를 참고해보세요.\n```python\n# 나이를 입력받고 숫자로 바꾸는 예시\nage = int(input(\"나이를 입력하세요: \"))\nprint(age)\n```"
      }
    ]
  },
  {
    stage: 6,
    title: "6단계: 데미지 계산",
    topic: "숫자 연산과 변수 업데이트",
    desc: "몬스터에게 마법 공격을 명중시켰습니다! 체력을 깎아볼까요?",
    problem: "앞 단계에서 몬스터의 체력(hp)이 100 이었다고 가정합시다. (hp = 100)\n몬스터에게 30의 데미지를 입혔습니다. hp 변수에서 30을 빼서 수정한 뒤, 현재 남은 체력(hp)을 출력하세요.",
    input: "없음",
    output: "70",
    answer: "hp = 100\nhp = hp - 30\nprint(hp)"
  },
  {
    stage: 7,
    title: "7단계: 몬스터 처치 판별",
    topic: "조건문 (if / else)",
    desc: "몬스터가 쓰러졌는지 확인해야 합니다.",
    problem: "현재 몬스터의 체력이 'hp = 0' 이라고 가정합시다.\nif/else 조건문을 작성하세요.\nhp가 0 이하(<= 0)라면 '몬스터 처치!'를 출력하고,\n0보다 크다면 '아직 살아있다!'를 출력하세요.",
    input: "없음",
    output: "몬스터 처치!",
    answer: "hp = 0\nif hp <= 0:\n    print('몬스터 처치!')\nelse:\n    print('아직 살아있다!')",
    hints: [
      {
        title: "힌트 1: 코드 뼈대 잡기",
        content: "어떤 조건문을 쓸지 헷갈린다면 아래 빈칸을 채워보세요!\n```python\nif hp ____ 0:  # 0 이하인지 확인하는 기호\n    print('_______')\n____:\n    print('_______')\n```"
      },
      {
        title: "힌트 2: 완전히 다른 예시 (합격/불합격 판별)",
        content: "if/else가 어떻게 작동하는지 아래 예시를 통해 구조를 파악해 보세요.\n```python\n# 시험 점수 합격/불합격 판별 예시\nscore = 80\nif score >= 60:\n    print('합격입니다!')\nelse:\n    print('불합격입니다!')\n```"
      }
    ]
  },
  {
    stage: 8,
    title: "8단계: 연쇄 번개 마법 (최종 퀘스트)",
    topic: "반복문과 종합 응용 (for, if)",
    desc: "여러 마리의 몬스터 무리가 몰려옵니다! 지금까지 배운 것을 모두 동원하세요.",
    problem: "monsters = [50, 30, 80, 10] (몬스터 4마리의 체력 리스트)\n\nfor 반복문을 사용하여 체력을 하나씩 꺼냅니다.\n꺼낸 체력이 40 이상(>= 40)이면 '강한 공격!'을 출력하고,\n40 미만이면 '약한 공격!'을 출력하는 코드를 완성하세요.",
    input: "없음",
    output: "강한 공격!\n약한 공격!\n강한 공격!\n약한 공격!",
    answer: "monsters = [50, 30, 80, 10]\n\nfor hp in monsters:\n    if hp >= 40:\n        print('강한 공격!')\n    else:\n        print('약한 공격!')",
    hints: [
      {
        title: "힌트 1: 코드 뼈대 잡기",
        content: "반복문 안에 조건문이 쏙 들어가야 해요!\n```python\nfor hp in _____:  # 어떤 리스트에서 꺼낼까요?\n    if hp ____ 40:\n        print('_______')\n    ____:\n        print('_______')\n```"
      },
      {
        title: "힌트 2: 완전히 다른 예시 (장바구니 가격 비교)",
        content: "장바구니 리스트에서 물건들을 하나씩 꺼내어 가격을 비교하는 예시입니다.\n```python\n# 장바구니에서 비싼 물건 골라내기 예시\nprices = [1000, 5000, 500, 10000]\n\nfor p in prices:\n    if p >= 3000:\n        print('비싼 물건!')\n    else:\n        print('저렴한 물건!')\n```"
      }
    ]
  }
];

export default function LevelTestPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    if (!auth || (auth.username !== 'test' && auth.role !== 'teacher')) {
      navigate('/login');
    }
  }, [navigate]);

  const [currentStep, setCurrentStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  const auth = getAuth();
  const isTeacher = auth?.role === 'teacher';

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const nextStep = () => {
    if (currentStep < testSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setShowAnswer(false);
      setHintLevel(0);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setShowAnswer(false);
      setHintLevel(0);
      window.scrollTo(0, 0);
    }
  };

  const stepData = testSteps[currentStep];

  return (
    <div className="page-container animate-fade-in">
      {/* Progress Bar */}
      <div style={{ background: '#ecf0f1', height: '8px', borderRadius: '4px', marginBottom: '16px', overflow: 'hidden' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', 
          height: '100%', 
          width: `${((currentStep + 1) / testSteps.length) * 100}%`,
          transition: 'width 0.4s ease'
        }} />
      </div>

      {/* Step Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {testSteps.map((step, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentStep(idx);
              setShowAnswer(false);
              setHintLevel(0);
              window.scrollTo(0, 0);
            }}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: 'none',
              background: currentStep === idx ? '#6c5ce7' : '#ecf0f1',
              color: currentStep === idx ? '#fff' : '#7f8c8d',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: currentStep === idx ? '0 4px 10px rgba(108, 92, 231, 0.4)' : 'none',
              transform: currentStep === idx ? 'scale(1.1)' : 'scale(1)'
            }}
            title={`${idx + 1}단계로 이동`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <div className="mission-detail">
        <div className="mission-detail-header" style={{ background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', position: 'relative' }}>
          <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '8px', color: '#fff', fontWeight: 'bold' }}>
            🎓 레벨 진단 테스트 - {currentStep + 1} / {testSteps.length}
          </div>
          <h1 style={{ color: 'white' }}>{stepData.title}</h1>
          <p className="mission-objective" style={{ color: 'white', opacity: 0.9 }}>
            🎯 평가 영역: {stepData.topic}
          </p>
        </div>

        <div className="mission-section">
          <h2>📖 상황 설명</h2>
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <img 
              src={`/images/step${currentStep + 1}.png`} 
              alt={`마법사 미션 ${currentStep + 1}단계`} 
              style={{ width: '100%', maxWidth: '350px', borderRadius: '12px', alignSelf: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>
              {stepData.desc}
            </p>
          </div>
        </div>

        <div className="mission-section" style={{ borderLeft: '4px solid #FFD166', background: '#fffcf2' }}>
          <h2>📝 코딩 미션</h2>
          <p style={{ fontSize: '1.1rem', fontWeight: 500, whiteSpace: 'pre-line', lineHeight: '1.6' }}>
            {stepData.problem}
          </p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px', background: '#2d3436', padding: '16px', borderRadius: '8px' }}>
              <h4 style={{ color: '#fff', borderBottom: '1px solid #636e72', paddingBottom: '8px', margin: '0 0 12px 0' }}>입력</h4>
              <div style={{ fontFamily: 'monospace', color: '#a29bfe', whiteSpace: 'pre-wrap' }}>{stepData.input}</div>
            </div>
            <div style={{ flex: 1, minWidth: '250px', background: '#2d3436', padding: '16px', borderRadius: '8px' }}>
              <h4 style={{ color: '#fff', borderBottom: '1px solid #636e72', paddingBottom: '8px', margin: '0 0 12px 0' }}>실행 결과 (출력)</h4>
              <div style={{ fontFamily: 'monospace', color: '#55efc4', whiteSpace: 'pre-wrap' }}>{stepData.output}</div>
            </div>
          </div>
        </div>

        <div className="mission-section" style={{ borderLeft: '4px solid #4ECDC4' }}>
          <h2>🖥️ 실습 및 확인</h2>
          <p style={{ marginBottom: '16px' }}>
            아래 내장된 컴파일러 창에 코드를 직접 작성하고 <strong>[Run]</strong> 버튼을 눌러 실행 결과를 바로 확인해 보세요!
          </p>
          <div style={{ marginTop: '16px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', height: '500px' }}>
            <iframe 
              src="https://www.programiz.com/python-programming/online-compiler/" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              marginWidth="0" 
              marginHeight="0" 
              allowFullScreen
              title="Python Compiler"
            ></iframe>
          </div>
          <div style={{ marginTop: '12px', textAlign: 'right' }}>
            <a 
              href="https://www.programiz.com/python-programming/online-compiler/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-sm btn-mint"
              style={{ fontSize: '0.85rem' }}
            >
              💻 컴파일러 새 창으로 열기
            </a>
          </div>
        </div>

        {stepData.hints && stepData.hints.length > 0 && (
          <div className="mission-section" style={{ borderLeft: '4px solid #FFD166', background: '#fffcf2' }}>
            <h2>💡 힌트 (어려울 때만 보세요!)</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              {stepData.hints.map((hint, index) => (
                index < hintLevel ? (
                  <div key={index} className="animate-fade-in" style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
                    <h4 style={{ color: '#d35400', marginBottom: '8px' }}>{hint.title}</h4>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.95rem' }}>
                      {hint.content.split('```python').map((part, i) => {
                        if (i === 0) return part;
                        const [code, text] = part.split('```');
                        return (
                          <span key={i}>
                            <div style={{ background: '#2c3e50', color: '#ecf0f1', padding: '12px', borderRadius: '6px', margin: '8px 0', fontFamily: 'monospace' }}>
                              {code}
                            </div>
                            {text}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ) : null
              ))}
            </div>

            {hintLevel < stepData.hints.length && (
              <button 
                className="btn" 
                style={{ background: '#f39c12', color: '#fff', marginTop: hintLevel > 0 ? '16px' : '0' }}
                onClick={() => setHintLevel(prev => prev + 1)}
              >
                👀 {hintLevel === 0 ? '힌트 1 보기 (코드 뼈대)' : '힌트 2 보기 (비슷한 예시)'}
              </button>
            )}
          </div>
        )}

        {isTeacher && (
          <div className="mission-section" style={{ borderLeft: '4px solid #FF6B6B', background: '#fff0f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ color: '#c0392b', margin: 0 }}>👩‍🏫 선생님용 정답 확인</h2>
              <button 
                className="btn btn-sm" 
                style={{ background: '#ff7675', color: '#fff' }}
                onClick={() => setShowAnswer(!showAnswer)}
              >
                {showAnswer ? '정답 숨기기' : '정답 코드 보기'}
              </button>
            </div>
            
            {showAnswer && (
              <div className="code-block animate-fade-in" style={{ background: '#2c3e50', padding: '16px', borderRadius: '8px', overflowX: 'auto' }}>
                <pre style={{ margin: 0, color: '#ecf0f1', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                  {stepData.answer}
                </pre>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-secondary" 
            onClick={prevStep}
            disabled={currentStep === 0}
            style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
          >
            ← 이전 단계
          </button>
          
          <button className="btn" style={{ background: '#636e72', color: '#fff' }} onClick={handleLogout}>
            테스트 중단
          </button>

          <button 
            className="btn btn-primary" 
            onClick={nextStep}
            disabled={currentStep === testSteps.length - 1}
            style={{ opacity: currentStep === testSteps.length - 1 ? 0.5 : 1 }}
          >
            다음 단계 →
          </button>
        </div>
        
        {currentStep === testSteps.length - 1 && (
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h3 style={{ color: '#27ae60', marginBottom: '10px' }}>🎉 모든 진단 테스트가 끝났습니다!</h3>
            <p style={{ color: '#7f8c8d' }}>선생님께 결과를 말씀해 주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
