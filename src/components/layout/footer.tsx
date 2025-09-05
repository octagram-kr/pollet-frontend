import { LogoNoneIcon } from '../icons'

export function Footer() {
  return (
    <footer className="border-t border-stroke-subtler bg-bg-subtle pt-8 pb-12 text-center">
      <div className="mx-auto flex flex-col items-center gap-4">
        <nav aria-label="푸터 링크">
          <ul className="flex flex-wrap items-center gap-3">
            <li className="text-text-subtle text-body-5 font-body-5 leading-body-5 tracking-body-5">
              이용약관
            </li>
            <li className="text-stroke-subtle">|</li>
            <li className="text-text-subtle text-body-5 font-body-5 leading-body-5 tracking-body-5">
              개인정보보호정책
            </li>
            <li className="text-stroke-subtle">|</li>
            <li className="text-text-subtle text-body-5 font-body-5 leading-body-5 tracking-body-5">
              고객센터
            </li>
          </ul>
        </nav>
        <p className="text-label-8 font-label-8 leading-label-8 tracking-label-8 text-text-subtle">
          Copyright© Pollet All rights reserved.
          <br />
          상호명 (주)폴렛 | 대표 장우영 | 개인정보보호책임자 이승훈 |
          사업자등록번호 025-09-02153
          <br />
          주소 경기도 성남시 분당구 판교로 242 PDC A동 902호
        </p>
        <LogoNoneIcon className="text-fill-active" />
      </div>
    </footer>
  )
}
