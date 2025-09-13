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
    reward: { type: 'point', value: 300 },
    duration: 5,
    tags: ['여자', '20대', '여행'],
  },
  {
    id: 'c-2',
    title: 'AI를 활용한 여행 계획 서비스 준비를 위한 설문 조사 ',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 150 },
    duration: 4,
    tags: ['20대', '여행', '커머스'],
  },
  {
    id: 'c-3',
    title: 'MZ세대의 AI 의존도 연구를 위한 설문조사',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'gifticon', value: 1, giftName: '커피' },
    duration: 3,
    tags: ['20대', '대학생', 'AI'],
  },
  {
    id: 'c-4',
    title: '생성형 AI가 우리 삶에 얼마나 많은 영향을 끼치는가에 대한 설문 조사',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'point', value: 100 },
    duration: 1,
    tags: ['20대', '대학생', 'AI'],
  },
]

const urgentList: UrgentItem[] = [
  {
    id: 'u-1',
    title: '화장품 개발을 위한 자외선과 피부 반응에 대한 설문',
    thumbnail: '/images/thumbnails/Fashion.png',
    reward: { type: 'gifticon', value: 1, giftName: '커피' },
    duration: 5,
    tags: ['여자', '20대', '패션뷰티'],
    countdownUntil: '2025-09-17T23:59:59+09:00',
    progress: { rate: 56, current: 168, target: 300 },
  },
  {
    id: 'u-2',
    title:
      '디지털 콘텐츠 마케팅 특성이 소비자의 인지된 접근성과 구매 의도에 미치는 영향을 위한 설문조사',
    thumbnail: '/images/thumbnails/Entertainment.png',
    reward: { type: 'point', value: 500 },
    duration: 3,
    tags: ['여자', '20대', '대학생', '엔터테인먼트'],
    countdownUntil: '2025-09-21T18:00:00+09:00',
    progress: { rate: 70, current: 35, target: 50 },
  },
  {
    id: 'u-3',
    title: 'MZ세대의 AI 의존도 연구를 위한 설문조사',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'gifticon', value: 1, giftName: '커피' },
    duration: 3,
    tags: ['여자', '대학생', 'AI', '교육'],
    countdownUntil: '2025-09-21T20:00:00+09:00',
    progress: { rate: 86, current: 86, target: 100 },
  },
]

const previewList: (SurveyItem & { answers: string[] })[] = [
  {
    id: 'p-1',
    title: 'AI가 사람의 일을 대신할 수 있다고 생각하시나요?',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'point', value: 50 },
    duration: 1,
    answers: ['전혀 아니다', '조금 그렇다', '꽤 그렇다', '매우 그렇다'],
  },
  {
    id: 'p-2',
    title: 'SNS 광고를 보고 해당 광고 상품을 구매한 경험이 있나요?',
    thumbnail: '/images/thumbnails/Commerce.png',
    reward: { type: 'point', value: 500 },
    duration: 5,
    answers: ['없음', '가끔 구매함', '자주 구매함'],
  },
  {
    id: 'p-3',
    title: '최근 1년 내 모바일로 항공권 예매 경험이 있나요?',
    thumbnail: '/images/thumbnails/Travel.png',
    reward: { type: 'point', value: 200 },
    duration: 3,
    answers: ['없음', '1회', '2~3회', '4회 이상'],
  },
  {
    id: 'p-4',
    title: ' 최근 1년 내 필라테스를 해본 경험이 있나요?',
    thumbnail: '/images/thumbnails/Healthcare.png',
    reward: { type: 'gifticon', value: 1, giftName: '커피' },
    duration: 3,
    answers: ['없음', '있음'],
  },
]

const waitingSurveys: (SurveyItem & { answers: string[] })[] = [
  {
    id: 'w-1',
    title: '생성형 AI의 개인정보 활용에 대해 어떻게 생각하시나요?',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'gifticon', value: 1, giftName: '커피' },
    duration: 2,
    answers: ['아무 생각이 없음', '우려됨', '긍정적'],
  },
  {
    id: 'w-2',
    title: '응급실을 이용해본 적 있나요?',
    thumbnail: '/images/thumbnails/Healthcare.png',
    reward: { type: 'point', value: 500 },
    duration: 5,

    answers: ['없음', '있음'],
  },
  {
    id: 'w-3',
    title: '한 달 평균 독서량은 얼마나 되나요?',
    thumbnail: '/images/thumbnails/Education.png',
    reward: { type: 'point', value: 200 },
    duration: 3,

    answers: ['없음', '1~2권', '3~4권', '5권 이상'],
  },
  {
    id: 'w-4',
    title: '환경보호를 위한 활동에 참여한 적 있나요?',
    thumbnail: '/images/thumbnails/Lifestyle.png',
    reward: { type: 'point', value: 300 },
    duration: 5,

    answers: ['없음', '있음'],
  },
]

const newestSurveys: (SurveyItem & { answers: string[] })[] = [
  {
    id: 'n-1',
    title: '최근 6개월 내 이디야 매장을 이용한 적 있나요?',
    thumbnail: '/images/thumbnails/Food.png',
    reward: { type: 'gifticon', value: 1, giftName: '커피' },
    duration: 5,

    answers: ['없음', '있음'],
  },
  {
    id: 'n-2',
    title: '하루 평균 스마트폰 사용 시간은 몇 시간인가요?',
    thumbnail: '/images/thumbnails/Entertainment.png',
    reward: { type: 'gifticon', value: 1, giftName: '햄버거' },
    duration: 15,

    answers: ['2시간 미만', '2~4시간', '5~7시간', '8시간 이상'],
  },
  {
    id: 'n-3',
    title: '알리익스프레스를 이용해보신 경험이 있나요?',
    thumbnail: '/images/thumbnails/Commerce.png',
    reward: { type: 'gifticon', value: 1, giftName: '커피' },
    duration: 3,

    answers: ['없음', '있음'],
  },
  {
    id: 'n-4',
    title: 'LLM(챗지피티 등) 기반 심리 상담을 이용해본 적 있나요?',
    thumbnail: '/images/thumbnails/AI.png',
    reward: { type: 'point', value: 1000 },
    duration: 15,

    answers: ['없음', '있음'],
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
          nickname="과제울렁증극복하기"
          newResponseCount={35}
          newResponseSurveyTitle="인공지능 챗봇에 대한 의존도와 학습자기주도성의 관계 설문"
          weeklyPoints={5300}
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
