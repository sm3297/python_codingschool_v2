import { Link } from 'react-router-dom';
import { stages } from '../data/stages';

export default function LandingPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="landing-hero">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🐍</div>
          <h1>파이썬 플레이그라운드</h1>
          <p className="subtitle">
            처음 코딩을 배우는 친구들을 위한 파이썬 미션 사이트!<br />
            8개의 스테이지를 하나씩 클리어하면서<br />
            나만의 게임, 퀴즈, 캐릭터 프로그램을 만들어보세요.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn-hero-primary">
              시작하기
            </Link>
            <Link to="/login" className="btn-hero-secondary">
              로그인
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="features-grid">
          <div className="feature-card animate-slide-up">
            <div className="feature-icon">🎮</div>
            <h3>미션 클리어형 학습</h3>
            <p>미션을 완료하면 다음 단계가 열려요. 게임처럼 재미있게 파이썬을 배울 수 있어요.</p>
          </div>
          <div className="feature-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="feature-icon">💻</div>
            <h3>설치 없이 배우는 파이썬</h3>
            <p>별도 프로그램 설치 없이 웹에서 바로 코드를 실행해볼 수 있어요.</p>
          </div>
          <div className="feature-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="feature-icon">🏆</div>
            <h3>코인과 경험치 보상</h3>
            <p>미션을 완료할 때마다 플레이 코인과 코드 에너지를 획득해요!</p>
          </div>
        </div>

        {/* Stage Preview */}
        <h2 className="landing-stages-title">
          🗺️ <span>8개의 스테이지</span>를 클리어해보세요!
        </h2>
        <div className="stages-grid">
          {stages.map(stage => (
            <div key={stage.id} className="stage-card" style={{ cursor: 'default' }}>
              <div className="stage-card-header">
                <span className="stage-icon">{stage.icon}</span>
                <span className="stage-number">{stage.id}단계</span>
                <h3>{stage.title}</h3>
              </div>
              <div className="stage-card-body">
                <p className="stage-topic">{stage.topic}</p>
                <p style={{ fontSize: '0.85rem', color: '#546E7A', lineHeight: '1.6' }}>
                  {stage.description.slice(0, 60)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
