import { HiOutlineLightBulb } from 'react-icons/hi'
import ArticleList from './ArticleList'
import ArticleDetail from './ArticleDetail'

export function FeynmanList () {
  return (
    <ArticleList
      category="feynman"
      title="Feynman Explanations"
      subtitle="Plain-language · Analogy-based learning"
      icon={HiOutlineLightBulb}
      type="feynman"
    />
  )
}

export function FeynmanDetail () {
  return <ArticleDetail category="feynman" backPath="/feynman" backLabel="Feynman Explanations" />
}
