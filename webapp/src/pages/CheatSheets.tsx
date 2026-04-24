import { HiOutlineBookOpen } from 'react-icons/hi'
import ArticleList from './ArticleList'
import ArticleDetail from './ArticleDetail'
import { useParams } from 'react-router-dom'

export function CheatSheetList () {
  return (
    <ArticleList
      category="cheat-sheets"
      title="Cheat Sheets"
      subtitle="Quick-reference cards · Print-friendly"
      icon={HiOutlineBookOpen}
      type="cheat-sheet"
      emptyText="No cheat sheets yet. Run the seed script to populate."
    />
  )
}

export function CheatSheetDetail () {
  return <ArticleDetail category="cheat-sheets" backPath="/cheat-sheets" backLabel="Cheat Sheets" />
}
