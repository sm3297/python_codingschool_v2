import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not-found animate-slide-up">
      <div className="nf-icon">🤔</div>
      <h1>페이지를 찾을 수 없어요</h1>
      <p>요청하신 페이지가 존재하지 않거나 이동되었어요.</p>
      <Link to="/" className="btn btn-primary">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
