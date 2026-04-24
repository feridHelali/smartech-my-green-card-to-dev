import { HiOutlineShare } from 'react-icons/hi'
import ArticleList from './ArticleList'
import ArticleDetail from './ArticleDetail'

export function MindMapList () {
  return (
    <ArticleList
      category="mind-maps"
      title="Mind Maps"
      subtitle="Mermaid diagrams · Architecture visualizations"
      icon={HiOutlineShare}
      type="mind-map"
    />
  )
}

export function MindMapDetail () {
  return <ArticleDetail category="mind-maps" backPath="/mind-maps" backLabel="Mind Maps" />
}
