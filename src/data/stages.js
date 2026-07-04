export const stages = [
  {
    id: 1,
    title: "첫 번째 코드 시작하기",
    topic: "프로그래밍이란?",
    icon: "🚀",
    unlockCoins: 0,
    description: "컴퓨터는 스스로 생각해서 움직이지 않아요. 우리가 정확한 명령을 적어주면 그 순서대로 실행해요. 이번 스테이지에서는 코딩이 무엇인지 알고, print로 첫 번째 명령을 내려봅니다.",
    missions: [
      {
        id: "stage1-mission1",
        title: "컴퓨터에게 인사시키기",
        rewardCoins: 200,
        rewardExp: 140,
        objective: "print()를 사용해서 컴퓨터 화면에 문장을 출력할 수 있다.",
        story: "파이썬 플레이그라운드에 처음 입장했어요. 입장하려면 컴퓨터에게 첫 인사를 해야 해요.",
        concept: "print()는 화면에 글자나 숫자를 보여주는 명령어입니다.\n괄호 안에 보여주고 싶은 내용을 넣습니다.\n글자는 따옴표로 감싸야 합니다.",
        analogy: 'print()는 컴퓨터에게 "이 말을 화면에 보여줘!"라고 부탁하는 명령어예요.',
        code: 'print("안녕!")\nprint("나는 파이썬을 배우고 있어.")',
        explanation: [
          "print는 화면에 출력하라는 명령어입니다.",
          '괄호 안에는 출력할 내용을 넣습니다.',
          '"안녕!"처럼 글자는 따옴표로 감싸야 합니다.'
        ],
        practice: '"안녕!" 대신 자신의 이름이나 좋아하는 문장으로 바꿔보세요.',
        challenge: "자기 이름, 좋아하는 음식, 오늘 기분을 각각 한 줄씩 출력해보세요.",
        quizzes: [
          {
            question: "화면에 글자를 출력할 때 사용하는 명령어는?",
            options: ["input()", "print()", "list()"],
            answer: 1
          },
          {
            question: "글자를 출력할 때 글자는 무엇으로 감싸야 할까요?",
            options: ["따옴표", "중괄호", "대괄호"],
            answer: 0
          }
        ]
      },
      {
        id: "stage1-mission2",
        title: "나만의 자기소개 화면 만들기",
        rewardCoins: 220,
        rewardExp: 160,
        objective: "여러 줄의 문장을 출력해서 자기소개 화면을 만들 수 있다.",
        story: "플레이그라운드에서 사용할 나만의 소개 화면을 만들어봅니다.",
        concept: "print()를 여러 번 사용하면 여러 줄의 문장을 화면에 출력할 수 있습니다.",
        analogy: "print() 한 개는 한 줄짜리 말풍선이고, 여러 개를 쓰면 소개 카드가 됩니다.",
        code: 'print("====================")\nprint("이름: 김민수")\nprint("취미: 축구")\nprint("좋아하는 음식: 치킨")\nprint("====================")',
        explanation: [
          "print()를 여러 번 쓰면 여러 줄이 출력됩니다.",
          '"=" 기호를 반복해서 구분선을 만들 수 있습니다.',
          "각 print()는 한 줄씩 출력합니다."
        ],
        practice: "이름, 취미, 좋아하는 음식을 자신의 정보로 바꿔보세요.",
        challenge: "나만의 자기소개 카드 5줄 이상 만들기",
        quizzes: [
          {
            question: "여러 줄을 출력하려면 print()를 어떻게 사용해야 할까요?",
            options: ["여러 번 사용한다", "사용할 수 없다", "반드시 input()을 써야 한다"],
            answer: 0
          },
          {
            question: 'print("=" * 10)을 실행하면 어떤 일이 생길까요?',
            options: ["=가 10번 출력된다", "오류가 난다", "숫자 10이 출력된다"],
            answer: 0
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "데이터 보관함",
    topic: "자료형",
    icon: "📦",
    unlockCoins: 200,
    description: "파이썬은 숫자, 글자, 참과 거짓을 서로 다르게 생각해요. 이번 스테이지에서는 자료형이 무엇인지 배우고, 변수라는 상자에 값을 담아봅니다.",
    missions: [
      {
        id: "stage2-mission1",
        title: "변수 상자에 값 담기",
        rewardCoins: 230,
        rewardExp: 170,
        objective: "변수를 사용해서 값을 저장하고 출력할 수 있다.",
        story: "플레이그라운드에서는 이름, 나이, 점수 같은 정보를 보관해야 해요. 이 정보를 변수라는 상자에 담아봅니다.",
        concept: "변수는 값을 저장하는 이름표가 붙은 상자입니다.\nname이라는 변수에는 이름을, age라는 변수에는 나이를 넣을 수 있습니다.",
        analogy: '변수는 이름이 적힌 보관함입니다.\n"이름 보관함"에는 이름을 넣고, "나이 보관함"에는 나이를 넣는 것과 같습니다.',
        code: 'name = "민수"\nage = 14\n\nprint(name)\nprint(age)',
        explanation: [
          'name = "민수"는 name이라는 상자에 "민수"를 넣는 것입니다.',
          "age = 14는 age라는 상자에 14를 넣는 것입니다.",
          "print(name)은 name 상자 안의 값을 화면에 보여줍니다."
        ],
        practice: "name과 age 값을 자신의 정보로 바꿔보세요.",
        challenge: "내 이름, 나이, 좋아하는 과목을 변수에 저장하고 출력해보세요.",
        quizzes: [
          {
            question: "변수는 무엇을 하기 위해 사용할까요?",
            options: ["값을 저장하기 위해", "컴퓨터를 끄기 위해", "인터넷을 켜기 위해"],
            answer: 0
          },
          {
            question: 'name = "민수"에서 변수 이름은 무엇인가요?',
            options: ["name", "민수", "print"],
            answer: 0
          }
        ]
      },
      {
        id: "stage2-mission2",
        title: "숫자와 글자의 차이 알아보기",
        rewardCoins: 240,
        rewardExp: 180,
        objective: "문자열과 숫자의 차이를 이해할 수 있다.",
        story: '컴퓨터는 "14"와 14를 다르게 생각해요. 겉보기에는 비슷하지만 하나는 글자이고 하나는 숫자입니다.',
        concept: '"14"는 따옴표로 감싸져 있어서 글자입니다.\n14는 따옴표가 없어서 숫자입니다.\n숫자는 계산할 수 있지만, 글자는 바로 계산할 수 없습니다.',
        analogy: '"14"는 종이에 적힌 숫자 모양 글자이고, 14는 계산기에 넣을 수 있는 진짜 숫자입니다.',
        code: 'age_text = "14"\nage_number = 14\n\nprint(age_text)\nprint(age_number + 1)',
        explanation: [
          'age_text = "14"는 글자 "14"를 저장합니다.',
          "age_number = 14는 숫자 14를 저장합니다.",
          "age_number + 1은 숫자끼리 더해서 15가 됩니다."
        ],
        practice: "age_number 값을 자신의 나이로 바꿔서 내년 나이를 출력해보세요.",
        challenge: "현재 나이를 숫자 변수에 저장하고, 1년 뒤, 5년 뒤, 10년 뒤 나이를 출력해보세요.",
        quizzes: [
          {
            question: '"13"은 어떤 자료형에 가까울까요?',
            options: ["글자", "숫자", "리스트"],
            answer: 0
          },
          {
            question: "13 + 1의 결과는?",
            options: ["14", "131", "오류"],
            answer: 0
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "대사 제작소",
    topic: "문자열",
    icon: "💬",
    unlockCoins: 500,
    description: "문자열은 글자를 다루는 자료형이에요. 게임 캐릭터의 대사, 닉네임, 자기소개 문장처럼 글자로 된 모든 것을 문자열로 만들 수 있어요.",
    missions: [
      {
        id: "stage3-mission1",
        title: "문자열 이어 붙이기",
        rewardCoins: 240,
        rewardExp: 180,
        objective: "문자열을 이어 붙여서 문장을 만들 수 있다.",
        story: "플레이그라운드 캐릭터에게 환영 인사를 만들어줘야 합니다.",
        concept: "문자열은 + 기호로 서로 이어 붙일 수 있습니다.",
        analogy: "문자열 더하기는 레고 블록처럼 글자 조각을 이어 붙이는 것과 같습니다.",
        code: 'name = "지우"\nprint(name + "님, 환영합니다!")',
        explanation: [
          'name 변수에 "지우"라는 글자가 저장됩니다.',
          "name + \"님, 환영합니다!\"는 두 글자를 이어 붙입니다.",
          '결과는 "지우님, 환영합니다!"가 됩니다.'
        ],
        practice: "name 값을 자신의 이름으로 바꿔보세요.",
        challenge: '이름과 좋아하는 음식을 사용해서 "OO님은 OO을 좋아합니다!" 문장을 출력해보세요.',
        quizzes: [
          {
            question: "문자열을 이어 붙일 때 사용하는 기호는?",
            options: ["+", "-", "/"],
            answer: 0
          },
          {
            question: '"파이" + "썬"의 결과는?',
            options: ["파이썬", "파이 썬", "오류"],
            answer: 0
          }
        ]
      },
      {
        id: "stage3-mission2",
        title: "문자열 반복하기",
        rewardCoins: 240,
        rewardExp: 180,
        objective: "문자열을 여러 번 반복해서 출력할 수 있다.",
        story: "미션 완료 화면을 예쁘게 꾸미기 위해 구분선을 만들어봅니다.",
        concept: "문자열에 * 숫자를 사용하면 같은 문자열을 여러 번 반복할 수 있습니다.",
        analogy: '"하" * 3은 "하" 스티커를 3장 붙이는 것과 같습니다.',
        code: 'print("=" * 20)\nprint("파이썬 시작!")\nprint("=" * 20)',
        explanation: [
          '"=" * 20은 = 기호를 20번 반복합니다.',
          '결과는 "===================="이 됩니다.',
          "이렇게 예쁜 구분선을 만들 수 있어요."
        ],
        practice: "= 대신 *, -, # 같은 기호를 사용해보세요.",
        challenge: "나만의 예쁜 제목 상자를 만들어보세요.",
        quizzes: [
          {
            question: '"안녕" * 3의 결과는?',
            options: ["안녕안녕안녕", "안녕3", "오류"],
            answer: 0
          },
          {
            question: "문자열 반복에 사용하는 기호는?",
            options: ["*", "/", "%"],
            answer: 0
          }
        ]
      },
      {
        id: "stage3-mission3",
        title: "닉네임 생성기 만들기",
        rewardCoins: 260,
        rewardExp: 200,
        objective: "여러 문자열을 조합해서 닉네임을 만들 수 있다.",
        story: "플레이그라운드에서 사용할 나만의 닉네임을 만들어봅니다.",
        concept: "여러 문자열 변수를 조합하면 새로운 문장을 만들 수 있습니다.",
        analogy: "닉네임 생성은 색깔 카드와 동물 카드를 뽑아서 새 이름을 만드는 것과 같습니다.",
        code: 'color = "파란"\nanimal = "고양이"\nprint(color + " " + animal + " 용사")',
        explanation: [
          'color 변수에 "파란"이 저장됩니다.',
          'animal 변수에 "고양이"가 저장됩니다.',
          '+ 기호로 이어 붙여서 "파란 고양이 용사"가 됩니다.'
        ],
        practice: "color와 animal 값을 원하는 단어로 바꿔보세요.",
        challenge: "색깔, 동물, 직업을 조합해서 나만의 별명을 만들어보세요.",
        quizzes: [
          {
            question: "문자열 사이에 띄어쓰기를 넣으려면 무엇을 추가하면 좋을까요?",
            options: ['" "', "0", "[]"],
            answer: 0
          },
          {
            question: 'color = "빨간", animal = "여우"일 때 color + " " + animal의 결과는?',
            options: ["빨간 여우", "빨간여우만 가능", "오류"],
            answer: 0
          }
        ]
      },
      {
        id: "stage3-mission4",
        title: "글자 길이 확인하기",
        rewardCoins: 260,
        rewardExp: 200,
        objective: "len()을 사용해서 문자열의 길이를 확인할 수 있다.",
        story: "닉네임이 너무 긴지 확인하는 기능을 만들어봅니다.",
        concept: "len()은 글자 수를 알려주는 함수입니다.",
        analogy: "len()은 글자가 몇 개인지 세어주는 자와 같습니다.",
        code: 'name = "Python"\nprint(len(name))',
        explanation: [
          'name 변수에 "Python"이 저장됩니다.',
          "len(name)은 name의 글자 수를 알려줍니다.",
          '"Python"은 6글자이므로 6이 출력됩니다.'
        ],
        practice: "name 값을 자신의 이름으로 바꿔서 글자 수를 확인해보세요.",
        challenge: "좋아하는 단어 3개의 글자 수를 각각 출력해보세요.",
        quizzes: [
          {
            question: 'len("cat")의 결과는?',
            options: ["3", "cat", "0"],
            answer: 0
          },
          {
            question: "글자 수를 확인하는 함수는?",
            options: ["len()", "print()", "input()"],
            answer: 0
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "아이템 가방",
    topic: "리스트",
    icon: "🎒",
    unlockCoins: 900,
    description: "리스트는 여러 개의 값을 한 곳에 보관하는 가방과 같아요. 좋아하는 음식 목록, 게임 아이템 목록, 친구 이름 목록처럼 여러 데이터를 저장할 수 있어요.",
    missions: [
      {
        id: "stage4-mission1",
        title: "좋아하는 것 목록 만들기",
        rewardCoins: 260,
        rewardExp: 200,
        objective: "리스트를 만들고 리스트 안의 값을 꺼내서 출력할 수 있다.",
        story: "플레이그라운드 탐험에 필요한 좋아하는 음식 목록을 만들어봅니다.",
        concept: "리스트는 여러 값을 한 번에 저장하는 자료형입니다.\n대괄호 []를 사용하고, 값들은 쉼표로 구분합니다.\n리스트의 첫 번째 위치 번호는 0입니다.",
        analogy: "리스트는 여러 물건이 들어 있는 가방입니다.",
        code: 'foods = ["치킨", "피자", "떡볶이"]\n\nprint(foods)\nprint(foods[0])\nprint(foods[1])\nprint(foods[2])',
        explanation: [
          "foods라는 리스트에 3개의 음식 이름이 저장됩니다.",
          "foods[0]은 첫 번째 값인 '치킨'을 가져옵니다.",
          "foods[1]은 두 번째 값인 '피자'를 가져옵니다.",
          "리스트의 위치 번호는 0부터 시작합니다."
        ],
        practice: "foods 안의 음식 이름을 자신이 좋아하는 음식으로 바꿔보세요.",
        challenge: "좋아하는 게임, 음식, 과목 목록을 각각 리스트로 만들어보세요.",
        quizzes: [
          {
            question: "리스트를 만들 때 사용하는 괄호는?",
            options: ["[]", "{}", "()"],
            answer: 0
          },
          {
            question: "리스트의 첫 번째 값은 몇 번 위치일까요?",
            options: ["0", "1", "10"],
            answer: 0
          }
        ]
      },
      {
        id: "stage4-mission2",
        title: "아이템 추가하기",
        rewardCoins: 280,
        rewardExp: 220,
        objective: "append()를 사용해서 리스트에 값을 추가할 수 있다.",
        story: "탐험 중에 새로운 아이템을 발견했어요. 아이템 가방에 새 물건을 추가해봅니다.",
        concept: "append()는 리스트의 맨 뒤에 새로운 값을 추가하는 기능입니다.",
        analogy: "append()는 가방 맨 뒤에 새 물건을 넣는 행동입니다.",
        code: 'items = []\n\nitems.append("물약")\nitems.append("검")\nitems.append("방패")\n\nprint(items)',
        explanation: [
          "items = []는 빈 리스트를 만듭니다.",
          'items.append("물약")은 리스트에 "물약"을 추가합니다.',
          "append()를 사용할 때마다 리스트 맨 뒤에 추가됩니다."
        ],
        practice: "자신이 원하는 아이템 이름을 추가해보세요.",
        challenge: "빈 리스트를 만들고 좋아하는 음식 3개를 append()로 추가해보세요.",
        quizzes: [
          {
            question: "리스트에 값을 추가하는 함수는?",
            options: ["append()", "print()", "len()"],
            answer: 0
          },
          {
            question: "items = []는 무엇을 뜻할까요?",
            options: ["빈 리스트", "문자열", "숫자"],
            answer: 0
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "대화형 프로그램",
    topic: "입출력",
    icon: "⌨️",
    unlockCoins: 1200,
    description: "지금까지는 컴퓨터가 정해진 말만 했어요. 이번에는 사용자가 직접 입력한 값을 컴퓨터가 받아서 대답하게 만들어봅니다.",
    missions: [
      {
        id: "stage5-mission1",
        title: "이름 입력받기",
        rewardCoins: 280,
        rewardExp: 220,
        objective: "input()을 사용해서 사용자의 입력을 받을 수 있다.",
        story: "플레이그라운드 입장 게이트가 사용자의 이름을 물어봅니다.",
        concept: "input()은 사용자가 키보드로 입력한 값을 받아오는 함수입니다.\n입력받은 값은 변수에 저장할 수 있습니다.",
        analogy: "input()은 컴퓨터가 사용자에게 질문하는 마이크입니다.",
        code: 'name = input("이름을 입력하세요: ")\nprint(name + "님, 안녕하세요!")',
        explanation: [
          'input("이름을 입력하세요: ")는 화면에 질문을 보여주고 입력을 기다립니다.',
          "사용자가 입력한 값은 name 변수에 저장됩니다.",
          "입력받은 name을 이용해 인사 문장을 만듭니다."
        ],
        practice: "질문 문장을 원하는 말로 바꿔보세요.",
        challenge: "이름과 좋아하는 음식을 입력받아서 소개 문장을 출력해보세요.",
        quizzes: [
          {
            question: "사용자에게 값을 입력받는 함수는?",
            options: ["input()", "print()", "len()"],
            answer: 0
          },
          {
            question: "input()으로 입력받은 값은 어디에 저장할 수 있나요?",
            options: ["변수", "모니터", "키보드"],
            answer: 0
          }
        ]
      },
      {
        id: "stage5-mission2",
        title: "친구 소개 카드 만들기",
        rewardCoins: 300,
        rewardExp: 240,
        objective: "여러 개의 입력값을 받아서 소개 카드를 만들 수 있다.",
        story: "새 친구를 등록하는 소개 카드를 만들어봅니다.",
        concept: "input()을 여러 번 사용하면 여러 정보를 입력받을 수 있습니다.",
        analogy: "여러 개의 input()은 설문지의 여러 질문과 같습니다.",
        code: 'name = input("이름: ")\nfood = input("좋아하는 음식: ")\nhobby = input("취미: ")\n\nprint("===== 소개 카드 =====")\nprint("이름:", name)\nprint("좋아하는 음식:", food)\nprint("취미:", hobby)\nprint("===================")',
        explanation: [
          "input()을 3번 사용해서 이름, 음식, 취미를 입력받습니다.",
          "입력받은 값들은 각각 name, food, hobby 변수에 저장됩니다.",
          "print()로 예쁜 소개 카드 형태로 출력합니다."
        ],
        practice: "좋아하는 색깔, 장래희망 같은 질문을 추가해보세요.",
        challenge: "질문 5개 이상을 사용해서 자기소개 카드를 만들어보세요.",
        quizzes: [
          {
            question: "input()을 여러 번 쓰면 어떻게 될까요?",
            options: ["여러 정보를 입력받을 수 있다", "오류가 무조건 난다", "컴퓨터가 꺼진다"],
            answer: 0
          },
          {
            question: 'print("이름:", name)은 무엇을 할까요?',
            options: ["이름이라는 글자와 name 값을 함께 출력한다", "name 값을 삭제한다", "입력을 받는다"],
            answer: 0
          }
        ]
      },
      {
        id: "stage5-mission3",
        title: "숫자 입력받아 계산하기",
        rewardCoins: 300,
        rewardExp: 240,
        objective: "input()으로 받은 값을 int()로 바꿔 계산할 수 있다.",
        story: "나이 계산기를 만들어서 내년 나이를 알려주는 프로그램을 만듭니다.",
        concept: "input()으로 받은 값은 기본적으로 문자열입니다.\n숫자로 계산하려면 int()를 사용해서 정수로 바꿔야 합니다.",
        analogy: "input()으로 받은 숫자는 숫자 모양의 글자입니다.\nint()는 그 글자를 계산 가능한 숫자로 바꿔주는 변환기입니다.",
        code: 'age = int(input("나이: "))\nprint("내년 나이:", age + 1)',
        explanation: [
          'input("나이: ")는 사용자에게 나이를 입력받습니다.',
          "int()는 입력받은 글자를 숫자로 바꿉니다.",
          "age + 1로 내년 나이를 계산합니다."
        ],
        practice: "5년 뒤, 10년 뒤 나이도 출력해보세요.",
        challenge: "현재 나이를 입력받고, 중학교 졸업 예상 나이를 출력해보세요.",
        quizzes: [
          {
            question: "input()으로 받은 값을 숫자로 바꾸는 함수는?",
            options: ["int()", "print()", "list()"],
            answer: 0
          },
          {
            question: 'age = int(input("나이: "))에서 int()는 무엇을 하나요?',
            options: ["입력값을 숫자로 바꾼다", "입력값을 지운다", "화면에 출력한다"],
            answer: 0
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "점수 계산실",
    topic: "연산자",
    icon: "🧮",
    unlockCoins: 1600,
    description: "파이썬은 계산도 잘해요. 이번 스테이지에서는 더하기, 빼기, 곱하기, 나누기를 사용해서 간단한 계산 프로그램을 만들어봅니다.",
    missions: [
      {
        id: "stage6-mission1",
        title: "용돈 계산기 만들기",
        rewardCoins: 300,
        rewardExp: 240,
        objective: "산술 연산자를 사용해서 간단한 계산을 할 수 있다.",
        story: "편의점에서 간식을 사고 남은 돈을 계산해봅니다.",
        concept: "파이썬에서는 +, -, *, / 기호로 계산할 수 있습니다.\n+는 더하기, -는 빼기, *는 곱하기, /는 나누기입니다.",
        analogy: "파이썬의 연산자는 계산기 버튼과 같습니다.",
        code: 'money = int(input("가진 돈: "))\nsnack = int(input("과자 가격: "))\n\nprint("남은 돈:", money - snack)',
        explanation: [
          "money 변수에 가진 돈을 입력받아 저장합니다.",
          "snack 변수에 과자 가격을 입력받아 저장합니다.",
          "money - snack으로 남은 돈을 계산합니다."
        ],
        practice: "음료 가격도 추가해서 계산해보세요.",
        challenge: "가진 돈, 과자 가격, 음료 가격을 입력받고 남은 돈을 출력해보세요.",
        quizzes: [
          {
            question: "곱하기 연산자는 무엇인가요?",
            options: ["*", "x", "#"],
            answer: 0
          },
          {
            question: "빼기 연산자는 무엇인가요?",
            options: ["-", "+", "/"],
            answer: 0
          }
        ]
      },
      {
        id: "stage6-mission2",
        title: "친구들과 나눠 내기 계산기",
        rewardCoins: 320,
        rewardExp: 260,
        objective: "나눗셈을 사용해서 한 명당 내야 할 금액을 계산할 수 있다.",
        story: "친구들과 피자를 먹고 돈을 나눠 내야 합니다.",
        concept: '나눗셈은 / 기호를 사용합니다.\n총 금액을 사람 수로 나누면 한 명당 금액을 구할 수 있습니다.',
        analogy: "나눗셈은 피자를 친구 수만큼 똑같이 나누는 것과 같습니다.",
        code: 'price = int(input("총 가격: "))\npeople = int(input("몇 명인가요? "))\n\nprint("한 명당:", price / people)',
        explanation: [
          "price 변수에 총 가격을 입력받습니다.",
          "people 변수에 사람 수를 입력받습니다.",
          "price / people로 한 명당 금액을 계산합니다."
        ],
        practice: "치킨 가격, 떡볶이 가격 등으로 바꿔보세요.",
        challenge: "총 금액과 사람 수를 입력받고, 한 명당 금액과 남는 금액을 출력해보세요.",
        quizzes: [
          {
            question: "나누기 연산자는 무엇인가요?",
            options: ["/", "*", "+"],
            answer: 0
          },
          {
            question: "10000 / 2의 결과는?",
            options: ["5000", "20000", "100002"],
            answer: 0
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: "선택의 갈림길",
    topic: "if/else",
    icon: "🧭",
    unlockCoins: 2000,
    description: "프로그램은 조건에 따라 다른 결과를 만들 수 있어요. 키가 몇 cm 이상이면 놀이기구를 탈 수 있고, 점수가 몇 점 이상이면 합격하는 것처럼 조건을 코드로 표현해봅니다.",
    missions: [
      {
        id: "stage7-mission1",
        title: "조건에 따라 결과 바꾸기",
        rewardCoins: 320,
        rewardExp: 260,
        objective: "if와 else를 사용해서 조건에 따라 다른 결과를 출력할 수 있다.",
        story: "놀이기구를 탈 수 있는지 판정하는 프로그램을 만들어봅니다.",
        concept: 'if는 "만약 ~라면"이라는 뜻입니다.\nelse는 "그렇지 않다면"이라는 뜻입니다.',
        analogy: "if/else는 갈림길 표지판과 같습니다.\n조건을 만족하면 왼쪽 길, 만족하지 않으면 오른쪽 길로 갑니다.",
        code: 'height = int(input("키를 입력하세요: "))\n\nif height >= 140:\n    print("놀이기구를 탈 수 있어요!")\nelse:\n    print("아쉽지만 탈 수 없어요.")',
        explanation: [
          "height 변수에 키를 입력받습니다.",
          "if height >= 140: 은 키가 140 이상인지 검사합니다.",
          "조건이 참이면 '놀이기구를 탈 수 있어요!'가 출력됩니다.",
          "조건이 거짓이면 else 부분이 실행됩니다."
        ],
        practice: "키 기준을 130, 150 등으로 바꿔보세요.",
        challenge: '나이를 입력받고, 14살 이상이면 "중학생 이상입니다", 아니면 "아직 중학생이 아닐 수 있어요"를 출력해보세요.',
        quizzes: [
          {
            question: "조건을 검사할 때 사용하는 명령어는?",
            options: ["if", "print", "append"],
            answer: 0
          },
          {
            question: "if 조건이 거짓일 때 실행되는 부분은?",
            options: ["else", "input", "len"],
            answer: 0
          }
        ]
      },
      {
        id: "stage7-mission2",
        title: "점수 판정기 만들기",
        rewardCoins: 340,
        rewardExp: 280,
        objective: "점수를 입력받아 합격과 불합격을 판정할 수 있다.",
        story: "미션 시험 점수를 입력하면 합격인지 알려주는 프로그램을 만듭니다.",
        concept: "비교 연산자를 사용하면 두 값을 비교할 수 있습니다.\n>= 는 크거나 같다는 뜻입니다.",
        analogy: "점수 판정기는 기준 점수와 내 점수를 비교하는 심판과 같습니다.",
        code: 'score = int(input("점수: "))\n\nif score >= 60:\n    print("합격!")\nelse:\n    print("다시 도전!")',
        explanation: [
          "score 변수에 점수를 입력받습니다.",
          "if score >= 60: 은 점수가 60 이상인지 검사합니다.",
          "60 이상이면 '합격!'이 출력됩니다.",
          "60 미만이면 '다시 도전!'이 출력됩니다."
        ],
        practice: "합격 기준을 70점이나 80점으로 바꿔보세요.",
        challenge: '90점 이상이면 "최고예요!", 60점 이상이면 "합격!", 아니면 "다시 도전!"을 출력해보세요.\n단, elif는 심화 기능으로 사용해도 됩니다.',
        quizzes: [
          {
            question: "score >= 60은 어떤 뜻인가요?",
            options: ["score가 60보다 크거나 같다", "score가 60보다 작다", "score가 60과 다르다"],
            answer: 0
          },
          {
            question: "조건에 따라 다른 결과를 만들 때 사용하는 문법은?",
            options: ["if/else", "append", "len"],
            answer: 0
          }
        ]
      }
    ]
  },
  {
    id: 8,
    title: "반복 미션 타워",
    topic: "반복문",
    icon: "🔁",
    unlockCoins: 2400,
    description: "반복문은 같은 일을 여러 번 하게 만드는 도구예요. 게임에서 계속 질문하기, 숫자 맞히기, 퀴즈 반복하기 같은 프로그램을 만들 수 있어요.",
    missions: [
      {
        id: "stage8-mission1",
        title: "같은 문장 여러 번 출력하기",
        rewardCoins: 340,
        rewardExp: 280,
        objective: "for 반복문을 사용해서 같은 명령을 여러 번 실행할 수 있다.",
        story: "응원 문장을 5번 출력하는 자동 응원 프로그램을 만들어봅니다.",
        concept: "for 반복문은 정해진 횟수만큼 코드를 반복합니다.\nrange(5)는 5번 반복한다는 뜻으로 볼 수 있습니다.",
        analogy: "for 반복문은 같은 일을 여러 번 해주는 자동 반복 버튼입니다.",
        code: 'for i in range(5):\n    print("파이썬 재미있다!")',
        explanation: [
          "for i in range(5): 는 아래 코드를 5번 반복합니다.",
          "range(5)는 0부터 4까지 5개의 숫자를 만듭니다.",
          "반복할 코드는 들여쓰기(스페이스 4칸)를 해야 합니다."
        ],
        practice: "반복 횟수를 3번, 10번으로 바꿔보세요.",
        challenge: "자신이 좋아하는 문장을 7번 출력하는 프로그램을 만들어보세요.",
        quizzes: [
          {
            question: "정해진 횟수만큼 반복할 때 사용할 수 있는 문법은?",
            options: ["for", "if", "input"],
            answer: 0
          },
          {
            question: "range(5)는 몇 번 반복하는 것으로 볼 수 있나요?",
            options: ["5번", "1번", "0번"],
            answer: 0
          }
        ]
      },
      {
        id: "stage8-mission2",
        title: "숫자 맞히기 게임 만들기",
        rewardCoins: 400,
        rewardExp: 350,
        objective: "while 반복문과 if문을 함께 사용해서 간단한 게임을 만들 수 있다.",
        story: "정답 숫자를 맞힐 때까지 계속 도전하는 숫자 맞히기 게임을 만듭니다.",
        concept: "while True는 계속 반복하라는 뜻입니다.\nbreak는 반복을 멈추는 명령어입니다.",
        analogy: "while은 계속 돌아가는 게임 루프이고, break는 게임을 끝내는 종료 버튼입니다.",
        code: 'answer = 7\n\nwhile True:\n    guess = int(input("숫자를 입력하세요: "))\n\n    if guess == answer:\n        print("정답!")\n        break\n    else:\n        print("다시 도전!")',
        explanation: [
          "answer 변수에 정답 숫자 7을 저장합니다.",
          "while True: 는 아래 코드를 계속 반복합니다.",
          "if guess == answer: 은 입력한 숫자가 정답인지 확인합니다.",
          "정답이면 break로 반복을 멈춥니다."
        ],
        practice: "정답 숫자를 원하는 숫자로 바꿔보세요.",
        challenge: '정답보다 작은 수를 입력하면 "더 큰 수를 입력해보세요", 큰 수를 입력하면 "더 작은 수를 입력해보세요"라고 알려주는 게임으로 바꿔보세요.',
        quizzes: [
          {
            question: "반복을 멈추는 명령어는?",
            options: ["break", "print", "input"],
            answer: 0
          },
          {
            question: "while True는 어떤 뜻에 가까울까요?",
            options: ["계속 반복한다", "한 번만 실행한다", "무조건 오류가 난다"],
            answer: 0
          }
        ]
      }
    ]
  }
];
