import { AdSection, BannerItem } from '@/app/components/ad-section'
import { StatusSection } from '@/app/components/status-section'
import { CustomSurveySection } from '@/app/components/custom-survey-section'
import { UrgentCarouselSection } from '@/app/components/urgent-carousel-section'
import { SurveyPreviewSection } from '@/app/components/survey-preview-section'
import { WaitingSurveySection } from '@/app/components/waiting-survey-section'
import { NewestSurveySection } from '@/app/components/newest-survey-section'
import { BestRewardProductsSection } from '@/app/components/best-reward-products-section'
import { SurveyItem } from '@/types/survey'
import { ProductItem } from '@/types/product'

/** ===== 샘플 데이터 ===== **/
type UrgentItem = SurveyItem & {
  countdownUntil: string
  progress: { rate: number; current: number; target: number }
}

const banners: BannerItem[] = [
  {
    id: 'b1',
    image: '/images/thumbnails/Travel.png',
    alt: '신규 설문 오픈',
  },
  {
    id: 'b2',
    image: '/images/thumbnails/Healthcare.png',
    alt: '리워드샵 특가',
  },
  {
    id: 'b3',
    image: '/images/thumbnails/Pet.png',
    alt: '맞춤 설문 추천',
  },
]

const customSurveys: SurveyItem[] = [
  {
    id: 'c-1',
    title: '20대 여성을 위한 여행 계획 서비스 수요 조사',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'gifticon', value: 1, giftName: '커피' },
    duration: 3,
    tags: ['여자', '20대', '여행'],
  },
  {
    id: 'c-2',
    title: 'AI를 활용한 여행 계획 서비스 준비를 위한 설문 조사 ',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 700 },
    duration: 4,
    tags: ['20대', '여헹', '커머스'],
  },
  {
    id: 'c-3',
    title: 'MZ세대의 AI 의존도 연구를 위한 설문조사',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'point', value: 1, giftName: '커피' },
    duration: 3,
    tags: ['20대', '대학생', 'AI'],
  },
  {
    id: 'c-4',
    title: '생성형 AI가 우리 삶에 얼마나 많은 영향을 끼치는가에 대한 설문 조사',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'point', value: 650 },
    duration: 3,
    tags: ['20대', '대학생', 'AI'],
  },
]

const urgentList: UrgentItem[] = [
  {
    id: 'u-1',
    title: '신제품 사용성 평가',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'point', value: 1200 },
    duration: 4,
    tags: ['IT'],
    countdownUntil: '2025-08-27T23:59:59+09:00',
    progress: { rate: 72, current: 144, target: 200 },
  },
  {
    id: 'u-2',
    title: '모바일 UX 설문',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'point', value: 900 },
    duration: 3,
    tags: ['모바일'],
    countdownUntil: '2025-09-21T18:00:00+09:00',
    progress: { rate: 38, current: 76, target: 200 },
  },
  {
    id: 'u-3',
    title: '식음료 패키지 평가',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'point', value: 700 },
    duration: 3,
    tags: ['F&B'],
    countdownUntil: '2025-09-21T20:00:00+09:00',
    progress: { rate: 55, current: 110, target: 200 },
  },
  {
    id: 'u-4',
    title: '여행 앱 사용성',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'point', value: 800 },
    duration: 4,
    tags: ['여행'],
    countdownUntil: '2025-09-21T21:30:00+09:00',
    progress: { rate: 20, current: 40, target: 200 },
  },
  {
    id: 'u-5',
    title: '배달앱 결제 만족도',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'point', value: 600 },
    duration: 3,
    tags: ['배달'],
    countdownUntil: '2025-10-11T22:00:00+09:00',
    progress: { rate: 66, current: 132, target: 200 },
  },
  {
    id: 'u-6',
    title: '헬스케어 기기 인식',
    thumbnail: '/images/sample-1.png',
    reward: { type: 'point', value: 1100 },
    duration: 5,
    tags: ['건강'],
    countdownUntil: '2025-08-27T22:30:00+09:00',
    progress: { rate: 41, current: 82, target: 200 },
  },
  {
    id: 'u-7',
    title: '영화 OTT 이용행태',
    thumbnail: '/images/sample-2.png',
    reward: { type: 'point', value: 500 },
    duration: 3,
    tags: ['OTT'],
    countdownUntil: '2025-08-27T19:00:00+09:00',
    progress: { rate: 84, current: 168, target: 200 },
  },
  {
    id: 'u-8',
    title: '스마트워치 사용',
    thumbnail: '/images/sample-3.png',
    reward: { type: 'point', value: 700 },
    duration: 3,
    tags: ['디바이스'],
    countdownUntil: '2025-08-27T23:00:00+09:00',
    progress: { rate: 29, current: 58, target: 200 },
  },
  {
    id: 'u-9',
    title: '패션 쇼핑 채널',
    thumbnail: '/images/sample-1.png',
    reward: { type: 'point', value: 420 },
    duration: 3,
    tags: ['패션'],
    countdownUntil: '2025-08-27T21:00:00+09:00',
    progress: { rate: 47, current: 94, target: 200 },
  },
]

const previewList: (SurveyItem & { answers: string[] })[] = [
  {
    id: 'p-1',
    title: '커피 취향 설문',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 400 },
    duration: 2,
    tags: ['카페', '취향'],
    answers: ['아메리카노', '라떼', '모카', '기타'],
  },
  {
    id: 'p-2',
    title: '영화 관람 패턴',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 500 },
    duration: 3,
    tags: ['영화'],
    answers: ['주말', '평일', '랜덤', '거의 안 본다'],
  },
  {
    id: 'p-3',
    title: '헬스케어 앱 사용',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 600 },
    duration: 3,
    tags: ['건강'],
    answers: ['매일', '주 2~3회', '가끔', '사용 안 함'],
  },
  {
    id: 'p-4',
    title: '여행 예산대',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 700 },
    duration: 4,
    tags: ['여행'],
    answers: ['50만원 이하', '100만원', '150만원', '200만원 이상'],
  },
]

const waitingSurveys: (SurveyItem & { answers: string[] })[] = [
  {
    id: 'w-1',
    title: '커피 브랜드 선호도',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'gifticon', value: 1 },
    duration: 2,
    tags: ['카페'],
    answers: ['스타벅스', '투썸', '이디야', '기타'],
  },
  {
    id: 'w-2',
    title: '배달 앱 사용 빈도',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 350 },
    duration: 2,
    tags: ['배달'],
    answers: ['매일', '주 2~3회', '주 1회', '거의 안 함'],
  },
  {
    id: 'w-3',
    title: '패션 쇼핑 채널',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 420 },
    duration: 3,
    tags: ['패션'],
    answers: ['온라인', '오프라인', '둘 다'],
  },
  {
    id: 'w-4',
    title: '디지털 구독 서비스',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 500 },
    duration: 3,
    tags: ['구독'],
    answers: ['영상', '음악', '뉴스', '없음'],
  },
]

const newestSurveys: (SurveyItem & { answers: string[] })[] = [
  {
    id: 'n-1',
    title: '쇼핑 성향',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 300 },
    duration: 2,
    tags: ['쇼핑'],
    answers: ['온라인', '오프라인', '모두'],
  },
  {
    id: 'n-2',
    title: '여행 계획',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 800 },
    duration: 5,
    tags: ['여행'],
    answers: ['개별', '패키지', '둘 다'],
  },
  {
    id: 'n-3',
    title: '디저트 취향',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 250 },
    duration: 2,
    tags: ['디저트'],
    answers: ['케이크', '쿠키', '아이스크림', '기타'],
  },
  {
    id: 'n-4',
    title: '스마트워치 사용',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 700 },
    duration: 3,
    tags: ['디바이스'],
    answers: ['매일', '가끔', '안 씀'],
  },
]

const bestProducts: ProductItem[] = [
  {
    id: 'pr-1',
    brandname: '[컴포즈커피]',
    name: '아이스 아메리카노',
    image: '/images/rewards/ComposeIceAmericano.png',
    pricePoint: 1800,
  },
  {
    id: 'pr-2',
    brandname: '[스타벅스]',
    name: '아이스 아메리카노 T',
    image: '/images/rewards/StarbucksColdblew.png',
    pricePoint: 5000,
  },
  {
    id: 'pr-3',
    brandname: '[롯데리아]',
    name: '리아 불고기버거 세트',
    image: '/images/rewards/LotteriaBurgerSet.png',
    pricePoint: 7300,
  },
  {
    id: 'pr-4',
    brandname: '[BHC]',
    name: '후라이드+콜라 1.25L',
    image: '/images/rewards/ChickenSet.png',
    pricePoint: 21500,
  },
]

/** ===== 페이지 ===== **/
export default function Page() {
  return (
    <>
      <main className="mx-auto max-w-7xl mb-32 px-6 pt-8 space-y-10">
        {/* 광고 배너 캐러셀 */}
        <AdSection items={banners} />

        {/* 상태 요약 카드 */}
        <StatusSection
          nickname="dd"
          newResponseCount={7}
          newResponseSurveyTitle="신제품 사용성 평가"
          weeklyPoints={4320}
        />

        {/* 맞춤 설문조사 */}
        <CustomSurveySection items={customSurveys} />

        {/* 마감임박 섹션 */}
        <UrgentCarouselSection items={urgentList} />

        {/* 설문 프리뷰(선지 미리보기) */}
        <SurveyPreviewSection items={previewList} />

        {/* BEST! 리워드 추천 상품 */}
        <BestRewardProductsSection items={bestProducts} />

        {/* 응답자를 기다리고 있어요 */}
        <WaitingSurveySection items={waitingSurveys} />

        {/* 방금 올라온 따끈따끈한 설문조사 */}
        <NewestSurveySection items={newestSurveys} />
      </main>
    </>
  )
}
